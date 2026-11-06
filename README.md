# RecipeWeb

A recipe-sharing class project built with Spring Boot, React, TypeScript, and Material UI.

## Run locally

Install **JDK 17** and **Node.js 22 or newer** (with npm). Set `JAVA_HOME` to your JDK 17 installation if you have multiple Java versions. The Gradle wrapper is included; you do not need to install Gradle separately.

Start the backend from the project root:

```sh
./gradlew bootRun
```

In a second terminal, install and start the frontend:

```sh
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). Leave both terminals running. The frontend proxies `/api` requests to the backend on port 8080.

Create an account, log in, and submit a recipe. Everyone can browse recipes; submitting requires a login. Sessions survive page reloads, and logout ends the session. A new database starts empty.

By default, the backend creates an H2 database in `data/recipeweb.mv.db`. Accounts and recipes persist across restarts. Flyway creates the schema automatically and Hibernate checks it at startup. Docker is not required for this setup.

## Use PostgreSQL instead

With Docker and Docker Compose installed, start the optional database:

```sh
docker compose up -d --wait
./gradlew bootRun --args='--spring.profiles.active=postgres'
```

The Compose database listens on port 5438 and stores data in a named volume. `docker compose down` stops it while keeping data. The local development credentials are defined in `compose.yml`.

To connect to another PostgreSQL server, set `DATABASE_URL` (a JDBC URL), `DATABASE_USERNAME`, and `DATABASE_PASSWORD`, and activate the `postgres` profile. H2 and PostgreSQL keep separate data. The included migration targets a fresh database; back up any old class-project database before connecting it, and migrate an existing schema deliberately.

## Check changes

From the project root:

```sh
./gradlew test
```

Backend tests use an isolated in-memory database and do not require Docker. They cover registration, session login/logout, recipe persistence, validation, and ownership checks.

From the frontend directory:

```sh
npm run lint
npm run build
```

## Troubleshooting

- **Gradle fails with an unsupported class-file version or cannot find Java 17:** check `java -version` and `JAVA_HOME`. Run the included wrapper using JDK 17.
- **The page cannot reach the server:** start the backend and use the Vite URL above. Keep backend port 8080 free.
- **The database file is locked:** stop any other backend process using the same local database.
- **A login no longer works after restarting the backend:** log in again. Account and recipe records persist, but sessions are kept in memory.

## API

The frontend uses session cookies. Fetch `GET /api/auth/csrf` to obtain `{token, headerName}` and include that header on POST, PUT, and DELETE requests. Refresh the token after login or logout.

- `POST /api/auth/register` — create an account with `{username, password}`.
- `POST /api/auth/login` — start a session with `{username, password}`.
- `GET /api/auth/me` — retrieve the signed-in user.
- `POST /api/auth/logout` — end the session.
- `GET /api/recipes` — browse recipes.
- `POST /api/recipes` — submit a recipe while signed in.
- `PUT /api/recipes/{id}` and `DELETE /api/recipes/{id}` — change your own recipe.
