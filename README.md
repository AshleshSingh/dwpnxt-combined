
# DWPNxt — Combined (Backend from Git, Frontend from V0)

## What you get
- **Backend (Python FastAPI)**: wraps DWPNxt analytics from your Git repo into REST endpoints (`/api/analyze`, `/api/export/xlsx`, `/api/export/pdf`).
- **Frontend (Next.js / V0 UI)**: the V0 interface now calls the Python backend via a Next.js API route proxy.

## Local Dev (no Docker)
### 1) Start Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Start Frontend
```bash
cd ../frontend
cp .env.local.example .env.local
# in .env.local set BACKEND_URL and BLOB_READ_WRITE_TOKEN
npm install   # or pnpm i / yarn
npm run dev
```

Visit http://localhost:3000

## With Docker
Install Docker and the Docker Compose plugin before running the command below.

```bash
docker compose up --build
```

## Endpoints
- `POST /api/analyze` — form-data with `file`: CSV of tickets. Returns JSON (summary, trends, categories). Example:

  ```bash
  curl -F "file=@tickets.csv" http://localhost:3000/api/analyze
  ```
- `POST /api/export/xlsx` — same input, returns Excel workbook.
- `POST /api/export/pdf` — same input, returns a one-pager PDF summary.

## Notes
- Driver classification uses `analytics/rules.yaml`. Edit to tune your taxonomy.
- If your CSV uses a different text/date schema, adjust inference in `backend/main.py`.
- The Next.js API route at `frontend/app/api/analyze/route.ts` proxies to the Python backend using `BACKEND_URL`.


---

## Run on GitHub (CI/CD & Codespaces)

### 1) Push this folder to a new GitHub repo
- Create a repo, then push the contents of `dwpnxt-combined/` as the root.

### 2) GitHub Actions: Build & Push Docker Images to GHCR
- The workflow at `.github/workflows/docker-ci.yml` builds the **backend** and **frontend** images on each push and pushes to GitHub Container Registry (GHCR).
- Make sure **Actions permissions** in your repo **Settings → Actions → General** allow `Read and write` workflow permissions.

Images will appear as:
- `ghcr.io/<your-org-or-user>/dwpnxt-backend:latest`
- `ghcr.io/<your-org-or-user>/dwpnxt-frontend:latest`

### 3) GitHub Codespaces (one-click dev)
- Open the repo in **Codespaces** → it uses `.devcontainer/devcontainer.json` and the root `docker-compose.yml`.
- Run `docker compose up` inside Codespaces to launch both services.
- Preview ports **3000** (frontend) and **8000** (backend).

### 4) Deploy
  - **Frontend**: Connect repo to **Vercel** (recommended for Next.js). Set `BACKEND_URL` and `BLOB_READ_WRITE_TOKEN` in Vercel Project → Settings → Environment Variables.
- **Backend**: Deploy your GHCR image to **Render**, **Fly.io**, **Azure App Service**, **AWS App Runner**, or **GCP Cloud Run**. Expose port 8000.

Tip: If you prefer GitHub-only hosting for the UI, GitHub Pages won’t run Next.js server features; use **Vercel** for best results.
