-- ==========================================================
-- TripMate Database Migration: V1__init_schema.sql
-- Target Database: Microsoft SQL Server (MSSQL)
-- ==========================================================

-- 1. Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) NOT NULL,
        username NVARCHAR(50) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        password_hash NVARCHAR(255) NOT NULL,
        full_name NVARCHAR(100) NOT NULL,
        avatar_url NVARCHAR(500) NULL,
        role NVARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_users PRIMARY KEY (id),
        CONSTRAINT uq_users_username UNIQUE (username),
        CONSTRAINT uq_users_email UNIQUE (email)
    );
    CREATE INDEX idx_users_email ON users(email);
END;
GO

-- 2. Destinations Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='destinations' AND xtype='U')
BEGIN
    CREATE TABLE destinations (
        id BIGINT IDENTITY(1,1) NOT NULL,
        name NVARCHAR(150) NOT NULL,
        country NVARCHAR(100) NOT NULL,
        tagline NVARCHAR(255) NULL,
        description NVARCHAR(MAX) NOT NULL,
        image_url NVARCHAR(1000) NOT NULL,
        rating DECIMAL(3,2) NOT NULL DEFAULT 5.00,
        avg_budget_per_person DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        currency NVARCHAR(10) NOT NULL DEFAULT 'USD',
        category NVARCHAR(50) NOT NULL DEFAULT 'CULTURE',
        is_trending BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_destinations PRIMARY KEY (id)
    );
    CREATE INDEX idx_destinations_category ON destinations(category);
    CREATE INDEX idx_destinations_trending ON destinations(is_trending);
END;
GO

-- 3. Trips Table (Both Curated Blueprints and User Trips)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='trips' AND xtype='U')
BEGIN
    CREATE TABLE trips (
        id BIGINT IDENTITY(1,1) NOT NULL,
        user_id BIGINT NULL,
        title NVARCHAR(200) NOT NULL,
        destination NVARCHAR(150) NOT NULL,
        duration_days INT NOT NULL DEFAULT 1,
        duration_nights INT NOT NULL DEFAULT 0,
        category NVARCHAR(50) NOT NULL DEFAULT 'ALL',
        tag NVARCHAR(50) NULL,
        total_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        currency NVARCHAR(10) NOT NULL DEFAULT 'USD',
        pace NVARCHAR(50) NOT NULL DEFAULT 'MODERATE',
        travelers_count INT NOT NULL DEFAULT 1,
        status NVARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
        start_date DATE NULL,
        end_date DATE NULL,
        is_curated BIT NOT NULL DEFAULT 0,
        collaborators_meta NVARCHAR(255) NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_trips PRIMARY KEY (id),
        CONSTRAINT fk_trips_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
    CREATE INDEX idx_trips_user_id ON trips(user_id);
    CREATE INDEX idx_trips_is_curated ON trips(is_curated);
    CREATE INDEX idx_trips_category ON trips(category);
END;
GO

-- 4. Trip Highlights Table (Day-by-day key milestones)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='trip_highlights' AND xtype='U')
BEGIN
    CREATE TABLE trip_highlights (
        id BIGINT IDENTITY(1,1) NOT NULL,
        trip_id BIGINT NOT NULL,
        day_range NVARCHAR(50) NOT NULL,
        title NVARCHAR(255) NOT NULL,
        description NVARCHAR(500) NULL,
        order_index INT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_trip_highlights PRIMARY KEY (id),
        CONSTRAINT fk_trip_highlights_trips FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
    );
    CREATE INDEX idx_trip_highlights_trip_id ON trip_highlights(trip_id);
END;
GO

-- 5. Testimonial Reviews Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='reviews' AND xtype='U')
BEGIN
    CREATE TABLE reviews (
        id BIGINT IDENTITY(1,1) NOT NULL,
        author_name NVARCHAR(100) NOT NULL,
        author_role NVARCHAR(100) NOT NULL,
        author_avatar_url NVARCHAR(1000) NULL,
        rating INT NOT NULL DEFAULT 5,
        comment NVARCHAR(MAX) NOT NULL,
        is_verified BIT NOT NULL DEFAULT 1,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_reviews PRIMARY KEY (id)
    );
END;
GO

-- 6. Newsletter Subscribers Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='newsletter_subscribers' AND xtype='U')
BEGIN
    CREATE TABLE newsletter_subscribers (
        id BIGINT IDENTITY(1,1) NOT NULL,
        email NVARCHAR(150) NOT NULL,
        subscribed_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT pk_newsletter_subscribers PRIMARY KEY (id),
        CONSTRAINT uq_newsletter_subscribers_email UNIQUE (email)
    );
END;
GO
