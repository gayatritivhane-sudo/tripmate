# TripMate AI Travel Planner

A full-stack, enterprise-grade travel planning application built around the Stitch AI Travel Planner UI.

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Axios
- **Backend**: Spring Boot 3.3.x, Java 17, Spring Security + JWT, Spring Data JPA
- **Database**: Microsoft SQL Server (MSSQL) with Flyway migrations

---

## Project Structure

```
tripmate-app/
├── frontend/                     # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Button, Card, Input, Badge, Modal, Spinner
│   │   │   └── layout/           # Navbar, Footer, AppLayout
│   │   ├── pages/
│   │   │   ├── Home/             # Full Stitch-designed landing page & AI console
│   │   │   ├── Explore/          # Destination search, category filter, detail modal
│   │   │   ├── PlanTrip/         # AI itinerary planner form & builder
│   │   │   ├── MyTrips/          # User trips dashboard (active, upcoming, pass sync)
│   │   │   ├── Auth/             # Login & Register with pre-seeded demo accounts
│   │   │   ├── About/            # Platform philosophy & stats
│   │   │   └── NotFound/         # 404 Route
│   │   ├── routes/               # AppRoutes.jsx, ProtectedRoute.jsx
│   │   ├── services/             # apiClient.js (Axios + JWT interceptor), authService, tripService, etc.
│   │   ├── context/              # AuthContext.jsx
│   │   ├── hooks/                # useAuth, useDestinations, useTrips
│   │   ├── utils/                # formatters.js
│   │   └── constants/            # apiEndpoints.js, theme.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                      # Spring Boot 3.x Backend
│   ├── src/main/java/com/yourorg/appname/
│   │   ├── config/               # SecurityConfig, CorsConfig
│   │   ├── controller/           # AuthController, DestinationController, TripController, ReviewController, NewsletterController
│   │   ├── dto/
│   │   │   ├── request/          # Request DTOs
│   │   │   └── response/         # Response DTOs
│   │   ├── entity/               # User, Destination, Trip, TripHighlight, Review, NewsletterSubscriber
│   │   ├── exception/            # GlobalExceptionHandler, ResourceNotFoundException, etc.
│   │   ├── mapper/               # Entity to DTO mappers
│   │   ├── repository/           # Spring Data JPA repositories
│   │   ├── security/             # JwtUtil, JwtAuthFilter, CustomUserDetailsService
│   │   └── service/              # Service interfaces & ServiceImpl implementations
│   ├── src/main/resources/
│   │   ├── application.properties# MSSQL datasource, Flyway, JWT configuration
│   │   └── db/migration/         # Classpath Flyway migration scripts
│   └── pom.xml
├── database/
│   └── migrations/               # Version-controlled T-SQL Flyway scripts
│       ├── V1__init_schema.sql   # Tables, constraints, and indexes
│       └── V2__seed_initial_data.sql # Authentic Stitch seed data (destinations, itineraries, reviews, users)
└── README.md
```

---

## 1. Prerequisites

Make sure the following tools are installed on your machine:
- **Node.js**: v18+ (tested on v24) and **npm**
- **Java JDK**: 17 or higher
- **Apache Maven**: 3.8+
- **Microsoft SQL Server**: Local instance, Docker container, or Azure SQL

---

## 2. Database Setup (MSSQL)

### Step 1: Create Database
Open SQL Server Management Studio (SSMS), Azure Data Studio, or `sqlcmd`, and execute:

```sql
CREATE DATABASE tripmate_db;
GO
```

### Step 2: Configure `application.properties`
Open `backend/src/main/resources/application.properties` and verify or adjust the datasource settings to match your local SQL Server instance:

```properties
# Microsoft SQL Server JDBC Connection
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=tripmate_db;encrypt=true;trustServerCertificate=true;
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.datasource.username=sa
spring.datasource.password=YourStrong!Passw0rd

# Flyway Migrations (Schema is version-controlled)
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# JWT Secret & Expiration
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
jwt.expiration=86400000
```

> **Note on Windows Authentication / Integrated Security**:
> If you are using Windows Authentication instead of SQL Server Authentication (`sa`), configure the URL as:
> `spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=tripmate_db;integratedSecurity=true;encrypt=true;trustServerCertificate=true;`

### Step 3: Flyway Schema Migrations
The migrations run automatically when starting the Spring Boot backend. They will execute:
- `V1__init_schema.sql`: Creates `users`, `destinations`, `trips`, `trip_highlights`, `reviews`, and `newsletter_subscribers` tables.
- `V2__seed_initial_data.sql`: Populates the 6 Stitch destinations (Kyoto, Amalfi, Banff, Santorini, Bali, Reykjavik), curated trip blueprints, customer reviews, and default demo user accounts.

---

## 3. Running the Backend

In a terminal:

```bash
cd backend
mvn clean spring-boot:run
```

The backend server starts on port `8080`:
- Base API: `http://localhost:8080/api`
- Health/Status: `http://localhost:8080/api/destinations`

---

## 4. Running the Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at:
**`http://localhost:5173`**

Vite's development proxy automatically forwards requests matching `/api/*` to `http://localhost:8080`.

---

## 5. Pre-Seeded Demo Accounts

The database comes pre-seeded with two accounts for immediate testing:

| Role | Username / Email | Password |
|---|---|---|
| **Regular Traveler** | `alex` or `alex@tripmate.com` | `password123` |
| **Administrator** | `admin` or `admin@tripmate.com` | `password123` |

*(On the `/login` page, you can also use the **Quick Fill Demo Accounts** buttons for instant one-click login).*

---

## 6. REST API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user account
- `POST /api/auth/login` - Authenticate and receive JWT token
- `GET /api/auth/me` - Retrieve current user profile (Bearer token required)

### Destinations (`/api/destinations`)
- `GET /api/destinations` - List destinations (optional filters: `?category=CULTURE&search=Kyoto`)
- `GET /api/destinations/trending` - List trending destinations
- `GET /api/destinations/{id}` - Get destination details
- `POST /api/destinations` - Create destination (Admin only)
- `PUT /api/destinations/{id}` - Update destination (Admin only)
- `DELETE /api/destinations/{id}` - Delete destination (Admin only)

### Trips & Itineraries (`/api/trips`)
- `GET /api/trips/curated` - List curated blueprints (optional filter: `?category=COUPLES`)
- `GET /api/trips/my-trips` - List authenticated user's trips (Bearer token required)
- `GET /api/trips/{id}` - Get trip details with day highlights
- `POST /api/trips` - Create new trip with custom day milestones
- `PUT /api/trips/{id}` - Update trip itinerary
- `DELETE /api/trips/{id}` - Delete trip

### Reviews & Community (`/api/reviews`)
- `GET /api/reviews` - Get explorer testimonials

### Newsletter (`/api/newsletter`)
- `POST /api/newsletter/subscribe` - Subscribe email to newsletter
