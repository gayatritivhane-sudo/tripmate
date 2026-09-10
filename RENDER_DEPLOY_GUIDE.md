# TripMate Cloud Deployment Guide (Render)

This guide provides complete, step-by-step instructions to deploy the **TripMate AI Travel Planner** (Spring Boot 3 + PostgreSQL + React 18 / Vite) to [Render](https://render.com).

---

## Architecture Overview

```
                      +-----------------------------+
                      |       Client Browser        |
                      +--------------+--------------+
                                     |
               +---------------------+---------------------+
               | (Static HTML/JS/CSS)                      | (REST API /api/*)
               v                                           v
    +-----------------------+                   +-----------------------+
    |   tripmate-frontend   |                   |   tripmate-backend    |
    |  Render Static Site   |                   |  Render Web Service   |
    | (https://...render.com)|                   | (Docker / Java 17)    |
    +-----------------------+                   +-----------+-----------+
                                                            |
                                                            | (JDBC via DATABASE_URL)
                                                            v
                                                +-----------------------+
                                                |      tripmate-db      |
                                                |   Render PostgreSQL   |
                                                +-----------------------+
```

---

## Method A: Automated Deployment via Render Blueprint (Recommended)

Render Blueprints automatically spin up the database, backend web service, and frontend static site together using the included [`render.yaml`](./render.yaml).

### Steps:
1. Push your changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Configure production cloud deployment for Render"
   git push origin main
   ```
2. Log in to [dashboard.render.com](https://dashboard.render.com/).
3. Click **New +** in the top navigation and select **Blueprint**.
4. Connect your GitHub account and select the repository (`tripmate`).
5. Render will detect [`render.yaml`](./render.yaml) and display the blueprint resources:
   - **PostgreSQL Database**: `tripmate-db` (Free tier)
   - **Backend Web Service**: `tripmate-backend` (Docker, Java 17)
   - **Frontend Static Site**: `tripmate-frontend` (Static, React 18)
6. Click **Apply**. Render will orchestrate the entire deployment in sequence:
   - Create and provision PostgreSQL.
   - Build the backend Docker image and inject `DATABASE_URL`.
   - Build the frontend and inject the backend URL into `VITE_API_BASE_URL`.

---

## Method B: Manual Dashboard Deployment

If you prefer configuring services individually through the Render Dashboard:

### Step 1: Create PostgreSQL Database
1. Go to Render Dashboard -> **New +** -> **PostgreSQL**.
2. Set the following:
   - **Name**: `tripmate-db`
   - **Database**: `tripmate`
   - **User**: `tripmate_user`
   - **Region**: Choose the region closest to you (e.g., `Oregon (US West)` or `Frankfurt (EU)`)
   - **Plan**: `Free`
3. Click **Create Database**.
4. Once provisioned, copy the **Internal Database URL** (e.g. `postgres://tripmate_user:...@dpg-xxx:5432/tripmate`).

### Step 2: Create Backend Web Service
1. In the Dashboard, click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `tripmate-backend`
   - **Region**: Match the database region.
   - **Language / Environment**: `Docker`
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Docker Context**: `./backend`
   - **Instance Type**: `Free`
4. Add the following **Environment Variables**:
   | Key | Value | Notes |
   |---|---|---|
   | `PORT` | `8080` | Render port binding |
   | `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL configuration |
   | `DATABASE_URL` | *(Paste Internal Database URL from Step 1)* | Automatically parsed by `DatabaseConfig.java` |
   | `CORS_ALLOWED_ORIGINS` | `https://tripmate-frontend.onrender.com` | Update with your frontend Render URL |
   | `JWT_SECRET` | *(64-character secret key)* | Generates session tokens |
5. Click **Create Web Service**.

### Step 3: Create Frontend Static Site
1. In the Dashboard, click **New +** -> **Static Site**.
2. Connect your GitHub repository.
3. Configure the static site:
   - **Name**: `tripmate-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. In the **Redirects / Rewrites** section, click **Add Rule**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   *(This ensures client-side React Router navigation works without 404s when users refresh the page).*
5. Add the following **Environment Variable**:
   | Key | Value | Notes |
   |---|---|---|
   | `VITE_API_BASE_URL` | `https://tripmate-backend.onrender.com` | Your backend URL from Step 2 |
6. Click **Create Static Site**.

---

## Environment Variables Reference

### Backend (`tripmate-backend`)
| Variable | Required | Default / Example | Purpose |
|---|---|---|---|
| `PORT` | Yes | `8080` | Port on which the Spring Boot embedded container listens. |
| `SPRING_PROFILES_ACTIVE` | Yes | `postgres` | Selects PostgreSQL profile and Hibernate DDL updates. |
| `DATABASE_URL` | Yes | `postgresql://user:pass@host:5432/tripmate` | Render database connection string. Converted to JDBC by `DatabaseConfig`. |
| `CORS_ALLOWED_ORIGINS` | Optional | `https://*.onrender.com` | Custom allowed web origins separated by comma. |
| `JWT_SECRET` | Yes | `404E6352...` | Secret key used for signing and verifying JWT authentication tokens. |

### Frontend (`tripmate-frontend`)
| Variable | Required | Default / Example | Purpose |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | `https://tripmate-backend.onrender.com` | Full URL of the backend service. Automatically appends `/api` if omitted. |

---

## Troubleshooting & Verification

### 1. Free Tier Cold Starts
- Render's free tier spins down backend services after 15 minutes of inactivity.
- The first request after spin-down may take 30-50 seconds to boot the JVM container. Subsequent requests will be fast and responsive.

### 2. CORS Errors
- If browser shows `Access to XMLHttpRequest has been blocked by CORS policy`, verify that `CORS_ALLOWED_ORIGINS` on the backend includes the exact frontend URL (e.g. `https://tripmate-frontend.onrender.com`).
- Note that `https://*.onrender.com` is enabled by default in `CorsConfig.java`.

### 3. Database Schema
- In the `postgres` profile, Hibernate's `ddl-auto=update` is enabled, automatically generating all necessary tables (`users`, `destinations`, `trips`, `reviews`, `trip_highlights`, `newsletter_subscribers`) when the Spring Boot application boots for the first time.
