-- ==========================================================
-- TripMate Database Migration: V2__seed_initial_data.sql
-- Target Database: Microsoft SQL Server (MSSQL)
-- Seed authentic data from the Stitch UI design
-- ==========================================================

-- 1. Seed Default Users
-- Default passwords:
-- 'password123' -> $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a
IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'alex@tripmate.com')
BEGIN
    INSERT INTO users (username, email, password_hash, full_name, avatar_url, role, created_at, updated_at)
    VALUES (
        'alex', 
        'alex@tripmate.com', 
        '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 
        'Alex Morgan', 
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBjgAdVGDCQLNyVKWYVFxqoDbMqTEwWnTQmPEFlHbdpLBlq2Ku21nfCQQwetE2bLdhp8e7GjEMs-vrQi6QGFm7yeg20WfQ9ohhHIi8EkhNdm6--n45mS8DtW4-lKtw1FmAs6i0PQ7zwHCO4OdJ0j9Vo-6IbYem8LRr9oZnZh9hGmx3ZQFdEqF6J9g6qIozJyJwj4Huzw8fgLMwit6pNiE6EpqVoLhrsFrbJEQfv59fFvXAm_Dvk9Bl-',
        'ROLE_USER', 
        GETDATE(), 
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@tripmate.com')
BEGIN
    INSERT INTO users (username, email, password_hash, full_name, avatar_url, role, created_at, updated_at)
    VALUES (
        'admin', 
        'admin@tripmate.com', 
        '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 
        'TripMate Admin', 
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYBAdN6l-Io2z2IE9ZTP40HoSLkJgHdP17qe9VxEI5mnjOmfzNthf5bjPk_n3zclWJOwTkENuJ2zLCH4xFhKvwfhg5gT84dvqQ1oj8NbQ-g3gqC9AJZf8ec1hlrdxmnJfDYploUAqOHCSnv7XpvgGODSBE4Prvz2sfPxrMXbMfHYTkk1x0hkekDE6Z-u7VuVzjA4bbKUZPvi9emLWCi7CHpwi6Y2IV-WztuNPKJ-7yYMgUP-2sVExB',
        'ROLE_ADMIN', 
        GETDATE(), 
        GETDATE()
    );
END;
GO

-- 2. Seed Destinations (from Stitch UI)
IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Kyoto, Japan')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Kyoto, Japan',
        'Japan',
        'Top for Culture & Food',
        'Zen garden sanctuaries, preserved geisha districts in Gion, and authentic bamboo forest excursions tuned for serene mornings.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAsSQUaH_oriuf_Fwv7VH3JbHvYXW3vRhPpyWemSfp4Y_73kge31Vzx3Szw2v7DNVLQLZ7I4VMnz1emB2xpj036BltdcPkcptto6Yt2WdaGvZ3lEAlWoZg8Q9E901pGk8TQNhHl_7FTuKiLW1xkExYR5MjVXxvYkbGKHaz8Ccx4ghO3BePaxNHgxl8CrIUG2aj4rbzk7bqIe8B4ehDUC34Wnb7p_GjXUuDz74vuEvQQhv4AbGFDZhYk',
        4.95,
        1420.00,
        'USD',
        'CULTURE',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Amalfi Coast, Italy')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Amalfi Coast, Italy',
        'Italy',
        'Romantic Coastal Escape',
        'Pastel cliffside villages, sun-drenched private boat rides to Capri, and world-class clifftop dining overlooking the Gulf of Salerno.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBdIhaKD_1dPxSRJdMzLnJ0EAqwgkWWJc4k93hH_srlq2audhmWBom7WGbIEl5mhSDwlNBmZMT9aFABrKBzPp77quRFN0XTSv6AhxLob9ttKvOWWXEHNEURByKErVfzTjmv7WPB6z1P8bmWf1QEDv_hdAh2vl3mnVD8efd3qDAcvfN3sb2Pk2VtQJ_xM0McAKAL-9TST7SpaTIdAWiFRHtwlzhRRxNUrV6M_ZRTNByy-x1fTY_yetAs',
        4.92,
        2100.00,
        'USD',
        'ROMANTIC',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Banff, Canada')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Banff, Canada',
        'Canada',
        'Best for Nature Lovers',
        'Glacial turquoise lakes, alpine gondola rides, wildlife viewing, and majestic lodge firesides in the heart of the Canadian Rockies.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQnIlkMqOQTH0whQ8P4I7DqJhvqJ8DrHpCR1GMmVlnGIIMw_QFUlPC2UmVJRYbyGc0oJIypi-s9W_VozRMtWirpo-Sdpg9vG2thzdBFy6tHNsDO9Ts-aOR-d9eMW9QvDaQg4oYSQXaxrKjxLJnQMqE69F-13aROu5NK14FDP5mW6ysdzsSOOxNoWeYH0er7G7Qi9AgetkHPk441YZm8iiKV27gW3o-Dt-CtXW2YudK8Jh4XVluYMIr',
        4.88,
        1350.00,
        'USD',
        'NATURE',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Santorini, Greece')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Santorini, Greece',
        'Greece',
        'Sunset & Aegean Views',
        'White-washed cave houses carved into volcanic cliffs, catamaran sunset cruises, and private infinity pool hideaways.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAvYZ3UX07PHWv6lSDjwLCsJks20HEdHoh1S4wfUmaPOTHjJcTj_aXPyqBm_Qi36pQoEtLvavPieyADZsurQdlBwXpBMsqAEQWmLbtoGxCQKDBM_MVOAJGMBQV9daUZGgilfY6dA2OhLmA-MkiOH2ZySJyp0P83OCqMOeOq2DDZuD_VmjbkIFGoAJrLOQHkL7iGQ5wlAL3HUcllXdFgPxMVCuZPW9VJkizpDobKvLdvsMNyVqwNqgaJ',
        4.96,
        1780.00,
        'USD',
        'ROMANTIC',
        0,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Bali, Indonesia')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Bali, Indonesia',
        'Indonesia',
        'Wellness & Surfing',
        'Lush jungle villas in Ubud, world-class wave breaks in Uluwatu, and restorative spiritual yoga retreats with private chefs.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDyb99OZQ5vXzy25XvdBHZmO9utoQAqknVMmDwrdDUUCpY2rfURm4dmr_PCSXG4GHYBDmu74X6TkIBFKTr08TN-J5P_60jjFH5ADIZdaWpa_RRPoWi8UjaUg03hUVicT7p3vqBzqZBD0JLGkZDjBEQzecMBVZ7H76kX3MBW5RoBmcOWRi9LEQNJ_5Se4sWpHXlQ0155IxeSdfKqHUxTosIyLpgql-W2VkfDOIU-vQdlakGAGvvt6ysE',
        4.89,
        940.00,
        'USD',
        'WELLNESS',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM destinations WHERE name = 'Reykjavik, Iceland')
BEGIN
    INSERT INTO destinations (name, country, tagline, description, image_url, rating, avg_budget_per_person, currency, category, is_trending, created_at)
    VALUES (
        'Reykjavik, Iceland',
        'Iceland',
        'Glaciers & Aurora',
        'Geothermal hot spring lagoons, luminous blue glacier ice caves, and 4x4 overland aurora expeditions across the Golden Circle.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA9cOf18uHaHJuUDKKj_7GNl2kFZr41j4-SG06lahh83-QrelYANEQJ2Tjvxcgw8_2IY-DJT5gZFr39xKzD3tRx67NWpLTJXquLDgTzit01j5hjVNcK-400eobWQD12a73DZcNwLQQTVschqVnd83rIXtpozKnanUSqNmdCuuvAOuQLGzeky-UkS0XWPNXtlemKpd1wSMck14gRe-rx5Av0nFKKNMzLqMwqOg6Tx_sBumkjXPW5A8rk',
        4.97,
        2250.00,
        'USD',
        'ADVENTURE',
        1,
        GETDATE()
    );
END;
GO

-- 3. Seed Curated Itineraries & Highlights
IF NOT EXISTS (SELECT 1 FROM trips WHERE title = '7 Days in Hidden Kyoto & Osaka')
BEGIN
    INSERT INTO trips (user_id, title, destination, duration_days, duration_nights, category, tag, total_cost, currency, pace, travelers_count, status, is_curated, collaborators_meta, created_at, updated_at)
    VALUES (
        NULL,
        '7 Days in Hidden Kyoto & Osaka',
        'Kyoto, Japan',
        7,
        6,
        'COUPLES',
        'Updated 2h ago',
        1850.00,
        'USD',
        'MODERATE',
        2,
        'CONFIRMED',
        1,
        'AK,MR,+42',
        GETDATE(),
        GETDATE()
    );
    DECLARE @Trip1Id BIGINT = SCOPE_IDENTITY();

    INSERT INTO trip_highlights (trip_id, day_range, title, description, order_index, created_at)
    VALUES 
        (@Trip1Id, 'Day 1-3', 'Arashiyama Groves & Gion Teahouses', 'Morning bamboo grove walks and historic Gion traditional dining', 1, GETDATE()),
        (@Trip1Id, 'Day 4', 'Shinkansen Bullet Train to Osaka', 'High-speed rail journey with scenic views of Mt. Fuji route', 2, GETDATE()),
        (@Trip1Id, 'Day 5-7', 'Dotonbori culinary crawl & Castle', 'Neon night street food exploration and historical imperial castle', 3, GETDATE());
END;
GO

IF NOT EXISTS (SELECT 1 FROM trips WHERE title = '10 Days Amalfi Coast Panoramic Drive')
BEGIN
    INSERT INTO trips (user_id, title, destination, duration_days, duration_nights, category, tag, total_cost, currency, pace, travelers_count, status, is_curated, collaborators_meta, created_at, updated_at)
    VALUES (
        NULL,
        '10 Days Amalfi Coast Panoramic Drive',
        'Amalfi Coast, Italy',
        10,
        9,
        'COUPLES',
        'Featured',
        3420.00,
        'USD',
        'RELAXED',
        2,
        'CONFIRMED',
        1,
        'DL,ST,+88',
        GETDATE(),
        GETDATE()
    );
    DECLARE @Trip2Id BIGINT = SCOPE_IDENTITY();

    INSERT INTO trip_highlights (trip_id, day_range, title, description, order_index, created_at)
    VALUES 
        (@Trip2Id, 'Day 1-4', 'Sorrento, Positano clifftop dinner', 'Arrival in Sorrento and clifftop dinner in Positano overlooking the sea', 1, GETDATE()),
        (@Trip2Id, 'Day 5-7', 'Private boat charter around Capri', 'Blue Grotto exploration and scenic swimming along the limestone cliffs', 2, GETDATE()),
        (@Trip2Id, 'Day 8-10', 'Villa Rufolo gardens in Ravello', 'Classical concerts and cliffhanging botanical gardens', 3, GETDATE());
END;
GO

IF NOT EXISTS (SELECT 1 FROM trips WHERE title = '5 Days Iceland Aurora & Glaciers')
BEGIN
    INSERT INTO trips (user_id, title, destination, duration_days, duration_nights, category, tag, total_cost, currency, pace, travelers_count, status, is_curated, collaborators_meta, created_at, updated_at)
    VALUES (
        NULL,
        '5 Days Iceland Aurora & Glaciers',
        'Reykjavik, Iceland',
        5,
        4,
        'ADVENTURE',
        'High Demand',
        2180.00,
        'USD',
        'FAST',
        1,
        'CONFIRMED',
        1,
        'JP,SL,+19',
        GETDATE(),
        GETDATE()
    );
    DECLARE @Trip3Id BIGINT = SCOPE_IDENTITY();

    INSERT INTO trip_highlights (trip_id, day_range, title, description, order_index, created_at)
    VALUES 
        (@Trip3Id, 'Day 1-2', 'Blue Lagoon & Golden Circle', 'Geothermal relaxation and roaring Gullfoss waterfall expedition', 1, GETDATE()),
        (@Trip3Id, 'Day 3', 'Vatnajokull super-jeep glacier cave', 'Subterranean luminous blue ice cave exploration with expert glaciologists', 2, GETDATE()),
        (@Trip3Id, 'Day 4-5', 'Black sand beaches & Aurora hunt', 'Reynisfjara basalt columns and midnight Northern Lights safari', 3, GETDATE());
END;
GO

-- 4. Seed Reviews (from Stitch UI)
IF NOT EXISTS (SELECT 1 FROM reviews WHERE author_name = 'Elena Rostova')
BEGIN
    INSERT INTO reviews (author_name, author_role, author_avatar_url, rating, comment, is_verified, created_at)
    VALUES (
        'Elena Rostova',
        'Family of 4 Traveler',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7pOQ5cHxEoYzCCaEJJstC5R2mjvhMYLmE9wlf5WtQ9gylGT1IwKtenQx_mQQZTMIZ_JBo0hneNLhbIA1yaccIBOQ4NMwvfBhoIMqEiF5PLGNqIEGXbBM7KYJLi0G82SJ4r-eK6UFB7A103cIR4hfKlfagu8Ryv1h2axFheIMrbCGDpacCzAr2vJlDlFpi-Ph9DBahtNXEP6Fi3EJ6zRG4F6BARiiP_tcp157eui56Y7OHKZJbraNu',
        5,
        'TripMate completely transformed how our family visited Japan. We didn’t waste hours arguing over schedules—the AI grouped attractions geographically so our kids never melted down from walking fatigue.',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM reviews WHERE author_name = 'Marcus Lindqvist')
BEGIN
    INSERT INTO reviews (author_name, author_role, author_avatar_url, rating, comment, is_verified, created_at)
    VALUES (
        'Marcus Lindqvist',
        'Solo Backpacker & Photographer',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4kdOmoO7RDubg38UGDj5-e_gSoGUNCCGkRcEa0ghtLr0Na2b8KGPqPvjKJ015WiWpiFoeCRy1PpYJLifcfNEfSucalw0qGL4A6B2QPtKoLb67e_9k3lrodL_Eh4M3FHvnTENbnvokS0yCQHd7y4i581Cfqc9-u2Cq3bfKpmUdnyCJlZm9OOo_PpvD3WSi3eVyqu8Q119-SH4gb3P7GUBU5ranea3T10eeiuEJIlKKDwpu61Ku-J8I',
        5,
        'The dynamic flight price alerts saved me over $380 on my flight from Frankfurt to Reykjavik. The offline cache was an absolute lifesaver while trekking glaciers with zero signal.',
        1,
        GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM reviews WHERE author_name = 'Chloe Deveraux')
BEGIN
    INSERT INTO reviews (author_name, author_role, author_avatar_url, rating, comment, is_verified, created_at)
    VALUES (
        'Chloe Deveraux',
        'Digital Nomad & Strategist',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBpw0tdpif1pj-K10gILEs2EGHKKO68k1c0iDfkSjZ_jcfjoDJGX5nuSvwMYMyer_BtgVSlFQ-40yI9t1S9MFTjkn8hGK-B52WYUnzo-jYG6Yl406sbHZdpGub5C00LvmwlDBC79-hWWc-hWujI0tjitMhvTpNQYjcqlkNEjzU4wuhPjPNci_5GpuAUtQR4jSjTMptwtcaciEZ5lgc-VBrkIyjrl8FoRUZZs9y6M50r4CEXz2kJ5qud',
        5,
        'As a digital nomad moving cities every three weeks, TripMate is my default secret weapon. The local neighborhood café curation with verified high-speed Wi-Fi speeds is incredible.',
        1,
        GETDATE()
    );
END;
GO
