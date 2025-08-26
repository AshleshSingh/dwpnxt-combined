
import io, os, json
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
import pandas as pd
from analytics import xlsx_export, taxonomy, views_store, mapping, prefs, report
from analytics.tcd import load_rules, apply_rules, estimate_aht_minutes

app = FastAPI(title="DWPNxt Backend", version="0.1.0")

# CORS (allow local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _load_df_from_csv(file_bytes: bytes) -> pd.DataFrame:
    text = file_bytes.decode("utf-8", errors="ignore")
    try:
        # Try comma, else semicolon
        df = pd.read_csv(io.StringIO(text))
    except Exception:
        df = pd.read_csv(io.StringIO(text), sep=";")
    # Normalize column names
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
    return df

def _infer_date_column(df: pd.DataFrame):
    for c in ["created", "opened", "created_at", "submitted", "date", "opened_at"]:
        if c in df.columns:
            return c
    return None

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    raw = await file.read()
    df = _load_df_from_csv(raw)

    # Apply driver rules
    rules_path = os.path.join(os.path.dirname(__file__), "analytics", "rules.yaml")
    rules = load_rules(rules_path)
    df2, by_driver = apply_rules(df, rules)

    # KPIs per driver
    kpi = report.driver_kpis(df2).reset_index().rename(columns={"index":"Driver"})
    # Basic trends by month if available
    date_col = _infer_date_column(df2)
    trends = []
    if date_col:
        s = pd.to_datetime(df2[date_col], errors="coerce").dt.to_period("M").astype(str)
        trend_df = s.value_counts().sort_index().reset_index()
        trend_df.columns = ["month","tickets"]
        trends = trend_df.to_dict(orient="records")

    # Compose summary in the shape the frontend expects
    total_tickets = int(len(df2))
    keyThemes = by_driver.head(5)["driver"].astype(str).tolist()
    priorityActions = [f"Create self-serve for {d}" for d in keyThemes[:3]]
    categories = kpi[["Driver","Tickets","Median_AHT","SLA_Breach_%"]].to_dict(orient="records")

    out = {
        "summary": {
            "overallSentiment": "Not computed (backend heuristic placeholder)",
            "totalTickets": total_tickets,
            "avgResolutionTime": float(kpi["Median_AHT"].median()) if not kpi.empty else 0.0,
            "slaBreaches": int((df2.get("sla_breached_bool", pd.Series(dtype=bool)).fillna(False)).sum()),
            "keyThemes": keyThemes,
            "priorityActions": priorityActions
        },
        "trends": trends,
        "categories": categories
    }
    return JSONResponse(out)

@app.post("/api/export/xlsx")
async def export_xlsx(file: UploadFile = File(...)):
    raw = await file.read()
    df = _load_df_from_csv(raw)
    xlsx_bytes = xlsx_export.build_processed_workbook(df)
    return StreamingResponse(io.BytesIO(xlsx_bytes), media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                             headers={"Content-Disposition": "attachment; filename=dwpnxt_analysis.xlsx"})

@app.post("/api/export/pdf")
async def export_pdf(file: UploadFile = File(...)):
    raw = await file.read()
    df = _load_df_from_csv(raw)
    # Reuse KPI and aht estimation
    kpi = report.driver_kpis(df).reset_index().rename(columns={"index":"Driver"})
    aht = estimate_aht_minutes(df)
    # Generate dummy ROI to satisfy function inputs if needed
    top = kpi.sort_values("Tickets", ascending=False).head(10)
    roi_df = pd.DataFrame({
        "Driver": top["Driver"],
        "Tickets": top["Tickets"],
        "AHT_min": aht,
        "Annualized_Savings_$": (top["Tickets"] * aht * 60 * 1.0)  # placeholder
    })
    pdf_bytes = report.build_pdf(kpi, top, pd.DataFrame(), roi_df)
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=dwpnxt_summary.pdf"})
