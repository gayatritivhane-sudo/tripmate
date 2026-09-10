# Stage 1: Build JAR using Maven and Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source code and build production artifact
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Minimal, secure non-root runtime container
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create a dedicated non-root system user and group
RUN groupadd -r appgroup && useradd -r -g appgroup -s /bin/false appuser

# Copy executable jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose default port
EXPOSE 8080

# Environment and JVM container optimization for cloud environments
ENV SPRING_PROFILES_ACTIVE=postgres
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
