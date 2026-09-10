package com.yourorg.appname.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Configuration
@ConditionalOnClass(HikariDataSource.class)
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${spring.datasource.url:}")
    private String defaultUrl;

    @Value("${spring.datasource.username:}")
    private String defaultUsername;

    @Value("${spring.datasource.password:}")
    private String defaultPassword;

    @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}")
    private String defaultDriver;

    @Bean
    @Primary
    public DataSource dataSource() {
        // 1. Check case-insensitive environment variables and system properties for full database URLs
        String databaseUrl = resolveDatabaseUrl();

        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            log.info("Connecting to cloud database via resolved database URL...");
            return createDataSourceFromUrl(databaseUrl.trim());
        }

        // 2. Check individual host/port/user/password variables
        DataSource individualDs = createDataSourceFromIndividualEnv();
        if (individualDs != null) {
            return individualDs;
        }

        // 3. If defaultUrl is explicitly provided and points to a non-localhost host
        if (defaultUrl != null && !defaultUrl.trim().isEmpty() && !defaultUrl.contains("localhost") && !defaultUrl.contains("127.0.0.1")) {
            log.info("Using configured external datasource URL: {}", defaultUrl);
            return createHikariDataSource(defaultDriver, defaultUrl, defaultUsername, defaultPassword);
        }

        // 4. Cloud Fallback: If on Render/cloud (PORT or RENDER set) or localhost is specified without local DB running
        boolean isCloudContainer = System.getenv("RENDER") != null 
                || System.getenv("PORT") != null 
                || System.getenv("KUBERNETES_SERVICE_HOST") != null;

        if (isCloudContainer || defaultUrl == null || defaultUrl.contains("localhost")) {
            log.warn("\n================================================================================" +
                     "\n⚠️  [RENDER CLOUD DEPLOYMENT NOTICE]" +
                     "\nNo DATABASE_URL environment variable was detected in this environment." +
                     "\nFalling back to in-memory H2 database (PostgreSQL mode) to keep service healthy." +
                     "\n" +
                     "\nTo connect your persistent Render PostgreSQL database:" +
                     "\n  1. Go to your Render Dashboard -> tripmate-backend Web Service." +
                     "\n  2. Navigate to the 'Environment' tab." +
                     "\n  3. Add environment variable: Key = DATABASE_URL" +
                     "\n  4. Value = Your PostgreSQL Internal Database URL (from tripmate-db page)" +
                     "\n================================================================================\n");

            return createH2FallbackDataSource();
        }

        return createHikariDataSource(defaultDriver, defaultUrl, defaultUsername, defaultPassword);
    }

    /**
     * Resolves database URL across various common naming patterns regardless of case.
     */
    private String resolveDatabaseUrl() {
        String[] candidateKeys = {
                "DATABASE_URL",
                "SPRING_DATASOURCE_URL",
                "POSTGRES_URL",
                "POSTGRESQL_URL",
                "DB_URL",
                "INTERNAL_DATABASE_URL",
                "RENDER_DATABASE_URL"
        };

        // Check system properties first
        for (String key : candidateKeys) {
            String prop = System.getProperty(key);
            if (prop != null && !prop.trim().isEmpty()) {
                log.info("Found database connection property in System properties: {}", key);
                return prop;
            }
        }

        // Check environment variables (case-insensitive)
        Map<String, String> env = System.getenv();
        for (Map.Entry<String, String> entry : env.entrySet()) {
            String normalizedKey = entry.getKey().toUpperCase().replace("-", "_").replace(".", "_");
            for (String candidate : candidateKeys) {
                if (normalizedKey.equals(candidate) && entry.getValue() != null && !entry.getValue().trim().isEmpty()) {
                    log.info("Found database connection variable in Environment: {}", entry.getKey());
                    return entry.getValue();
                }
            }
        }

        return null;
    }

    /**
     * Checks if separate host, port, database, user, and password variables were provided.
     */
    private DataSource createDataSourceFromIndividualEnv() {
        String host = getEnvAny("DB_HOST", "DATABASE_HOST", "POSTGRES_HOST", "PGHOST");
        if (host == null || host.trim().isEmpty()) {
            return null;
        }

        String port = getEnvAny("DB_PORT", "DATABASE_PORT", "PGPORT");
        if (port == null || port.trim().isEmpty()) {
            port = "5432";
        }

        String dbName = getEnvAny("DB_NAME", "DATABASE_NAME", "PGDATABASE");
        if (dbName == null || dbName.trim().isEmpty()) {
            dbName = "tripmate";
        }

        String username = getEnvAny("DB_USER", "DB_USERNAME", "DATABASE_USERNAME", "PGUSER");
        String password = getEnvAny("DB_PASSWORD", "DATABASE_PASSWORD", "PGPASSWORD");

        String jdbcUrl = "jdbc:postgresql://" + host.trim() + ":" + port.trim() + "/" + dbName.trim();
        log.info("Constructed PostgreSQL JDBC URL from individual environment variables: {}", jdbcUrl);

        return createHikariDataSource("org.postgresql.Driver", jdbcUrl, username, password);
    }

    private String getEnvAny(String... keys) {
        for (String k : keys) {
            String val = System.getenv(k);
            if (val != null && !val.trim().isEmpty()) {
                return val.trim();
            }
        }
        return null;
    }

    private DataSource createDataSourceFromUrl(String databaseUrl) {
        try {
            if (databaseUrl.startsWith("jdbc:")) {
                log.info("Using standard JDBC URL format directly.");
                return createHikariDataSource("org.postgresql.Driver", databaseUrl, defaultUsername, defaultPassword);
            }

            String normalizedUrl = databaseUrl;
            if (normalizedUrl.startsWith("postgres://")) {
                normalizedUrl = "postgresql://" + normalizedUrl.substring("postgres://".length());
            }

            URI uri = new URI(normalizedUrl);
            String host = uri.getHost();
            int port = (uri.getPort() == -1) ? 5432 : uri.getPort();
            String path = uri.getPath();
            String query = uri.getQuery();

            String username = null;
            String password = null;

            String userInfo = uri.getUserInfo();
            if (userInfo != null && !userInfo.isEmpty()) {
                String[] parts = userInfo.split(":", 2);
                username = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
                if (parts.length > 1) {
                    password = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                }
            }

            StringBuilder jdbcUrl = new StringBuilder();
            jdbcUrl.append("jdbc:postgresql://").append(host).append(":").append(port).append(path);
            if (query != null && !query.isEmpty()) {
                jdbcUrl.append("?").append(query);
            }

            log.info("Configured PostgreSQL connection to host: {}, port: {}, path: {}", host, port, path);
            return createHikariDataSource("org.postgresql.Driver", jdbcUrl.toString(), username, password);
        } catch (Exception e) {
            log.error("Failed to parse database URL: {}. Falling back to H2.", e.getMessage());
            return createH2FallbackDataSource();
        }
    }

    private DataSource createHikariDataSource(String driver, String url, String username, String password) {
        HikariDataSource ds = new HikariDataSource();
        ds.setDriverClassName(driver);
        ds.setJdbcUrl(url);
        if (username != null && !username.isEmpty()) {
            ds.setUsername(username);
        }
        if (password != null && !password.isEmpty()) {
            ds.setPassword(password);
        }
        ds.setMaximumPoolSize(5);
        ds.setMinimumIdle(2);
        ds.setIdleTimeout(30000);
        ds.setConnectionTimeout(20000);
        ds.setMaxLifetime(1800000);
        return ds;
    }

    private DataSource createH2FallbackDataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setDriverClassName("org.h2.Driver");
        ds.setJdbcUrl("jdbc:h2:mem:tripmatedb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH");
        ds.setUsername("sa");
        ds.setPassword("");
        ds.setMaximumPoolSize(5);
        return ds;
    }

    /**
     * Safe Flyway strategy: Skips migrations if schema is managed by Hibernate.
     */
    @Bean
    public FlywayMigrationStrategy flywayMigrationStrategy() {
        return flyway -> {
            log.info("Flyway migration skipped: database schema is managed via Hibernate ddl-auto.");
        };
    }
}
