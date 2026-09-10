package com.yourorg.appname.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Configuration
@Profile("postgres")
@ConditionalOnClass(HikariDataSource.class)
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${spring.datasource.url:}")
    private String defaultUrl;

    @Value("${spring.datasource.username:}")
    private String defaultUsername;

    @Value("${spring.datasource.password:}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            databaseUrl = System.getProperty("DATABASE_URL");
        }

        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            log.info("Detected DATABASE_URL environment variable. Adapting for PostgreSQL JDBC connection...");
            return createDataSourceFromUrl(databaseUrl.trim());
        }

        log.info("DATABASE_URL not set. Falling back to default spring.datasource.* properties: {}", defaultUrl);
        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(defaultUrl)
                .username(defaultUsername)
                .password(defaultPassword)
                .type(HikariDataSource.class)
                .build();
    }

    private DataSource createDataSourceFromUrl(String databaseUrl) {
        try {
            // If already formatted as JDBC URL, use directly
            if (databaseUrl.startsWith("jdbc:")) {
                HikariDataSource ds = new HikariDataSource();
                ds.setDriverClassName("org.postgresql.Driver");
                ds.setJdbcUrl(databaseUrl);
                return ds;
            }

            // Normalize postgres:// to postgresql:// for URI parsing
            String normalizedUrl = databaseUrl;
            if (normalizedUrl.startsWith("postgres://")) {
                normalizedUrl = "postgresql://" + normalizedUrl.substring("postgres://".length());
            }

            URI uri = new URI(normalizedUrl);
            String host = uri.getHost();
            int port = (uri.getPort() == -1) ? 5432 : uri.getPort();
            String path = uri.getPath(); // includes leading '/'
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

            log.info("Parsed DATABASE_URL successfully: jdbc:postgresql://{}:{}{}", host, port, path);

            HikariDataSource dataSource = new HikariDataSource();
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setJdbcUrl(jdbcUrl.toString());
            if (username != null) {
                dataSource.setUsername(username);
            }
            if (password != null) {
                dataSource.setPassword(password);
            }

            // Cloud connection pool optimizations
            dataSource.setMaximumPoolSize(5);
            dataSource.setMinimumIdle(2);
            dataSource.setIdleTimeout(30000);
            dataSource.setConnectionTimeout(20000);
            dataSource.setMaxLifetime(1800000);

            return dataSource;
        } catch (Exception e) {
            log.error("Failed to parse DATABASE_URL: {}. Falling back to default datasource configuration.", e.getMessage());
            throw new IllegalStateException("Failed to configure PostgreSQL DataSource from DATABASE_URL", e);
        }
    }
}
