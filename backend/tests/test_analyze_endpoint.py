import sys
from pathlib import Path
from fastapi.testclient import TestClient

# Add backend root to path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from main import app

SAMPLE_CSV = """short_description,description,created,aht_min,sla_breached_bool
Password reset needed,,2024-01-05,5,False
Check status on request,,2024-01-15,6,False
Access provisioning required,,2024-02-20,7,True
"""

def test_analyze_endpoint_returns_expected_structure():
    client = TestClient(app)
    response = client.post(
        "/api/analyze",
        files={"file": ("test.csv", SAMPLE_CSV, "text/csv")},
    )
    assert response.status_code == 200
    data = response.json()

    # Verify top-level keys
    assert "summary" in data
    assert "trends" in data
    assert "categories" in data

    # Check summary structure
    summary = data["summary"]
    assert summary["totalTickets"] == 3
    assert isinstance(summary.get("keyThemes"), list)

    # Check trends list with two months
    trends = data["trends"]
    assert isinstance(trends, list)
    assert len(trends) == 2
    for item in trends:
        assert {"month", "tickets"} <= item.keys()

    # Check categories list for three drivers
    categories = data["categories"]
    assert isinstance(categories, list)
    assert len(categories) == 3
    for item in categories:
        assert {"Driver", "Tickets", "Median_AHT", "SLA_Breach_%"} <= item.keys()
