FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app

# Pre-download dependencies for caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy all source files (overridden by bind mount during development)
COPY . .

# Expose your Spring Boot port
EXPOSE 8080

# Start Spring Boot in development mode (with Spring Boot DevTools enabled)
CMD ["mvn", "spring-boot:run"]
