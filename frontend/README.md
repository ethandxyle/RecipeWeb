# Culinary Catastrophe frontend

React, TypeScript, Material UI, and Vite provide the recipe website.

Use Node.js 22 or newer and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the URL Vite prints (normally http://localhost:5173). Start the Spring Boot backend on port 8080 in a separate terminal; see the [project setup instructions](../README.md). Vite proxies `/api` requests to the backend, so use the Vite URL for the website.

Browse recipes anonymously, or register and log in to share a recipe. Login uses a server session cookie. The client fetches a CSRF token before each mutation, including registration, login, and logout.

```sh
npm run lint
npm run build
```

The production bundle is written to `build/`. A production web server must serve that directory, forward `/api` to Spring Boot, and serve `index.html` for client routes such as `/recipes`.
