## 📋 Table of Contents

- [What is Weather Query?](#-what-is-weather-query-visit-here)
- [Patterns in the Implementation of Auth.js](#%EF%B8%8F-patterns-in-the-implementation-of-authjs)
- [Project Structure](#-project-structure)
- [Using the App](#-using-the-app)
- [Platforms](#-platforms)
- [Technologies Used](#-technologies-used)

## 👀 What is Weather Query? [Visit here](https://nextjs-demo-red-tau.vercel.app/auth/signin)

Weather Query is a web application designed to display current and future weather information.

Users need to register with an email and password to access the content. Once they have an account, they simply need to login.

The app includes a city search feature that allows users to easily find cities by name. By default, the location is set to Málaga, as this project is intended for testing purposes only and does not obtain the user's current location.

The application also includes cards, charts, and tables that visually represent the weather information.

## 🏗️ Patterns in the Implementation of Auth.js

**Singleton:** Ensures a single instance of authentication configuration, maintaining consistent session management and avoiding redundant setups. Also used to maintain a single instance of DB connection.

**Strategy:** Allows flexible and interchangeable authentication methods (ex, credentials), making it easy to switch or add new methods without altering the core logic.

Note: The beta version of NextAuth called Auth.js was used due to the freedom of choice and ease of implementation.

## 📂 Project Structure

Linters like ESLint and Prettier have been implemented.

Although it was not a requirement, implementing linters like ESLint and Prettier is essential. They ensure code quality and consistency, identifying errors and style issues in real-time.

```text
weather-query/
├── .vscode/
├── cypress/             <- unit tests
├── prisma/              <- db connection
├── public
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── libs/            <- includes utils for the app
│   ├── types/
│   └── localData.json   <- use it on dev mode to not exceed api
│   └── middleware.ts
├── tests/ <- e2e tests
├── package.json
└── README.md
└── ...
```

## 🎮 Using the App

Clone the project:

```
git clone https://github.com/gonzalosalmeron/nextjs-demo.git
```

Install dependencies:

```
npm i
```

Duplicate the .env.example file and fill it with your data.

Predefined commands:

```
- npm run dev            <- start the development server
- npm run build          <- compile the project
- npm run start          <- start the server with the build data
- npm run lint           <- run the linter with the predefined config
- npm run cypress:open   <- open Cypress visually
- npm run test:e2e       <- open Playwright visually
```

## 📱 Platforms

No specific platform was specified. This app is developed only for desktop browsers.

## 🤖 Technologies Used

<a href="https://nextjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/archive/8/8e/20230404233502%21Nextjs-logo.svg" width="120" height="100" style="object-fit: contain">
</a>
<a href="https://react.dev/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" width="100" height="100" style="object-fit: cover">
</a>
<a href="https://tailwindcss.com/">
    <img src="https://www.solucionex.com/sites/default/files/posts/imagen/tailwindcss-1633184775.jpeg" width="200" height="100" style="object-fit: cover">
</a>
<a href="https://www.cypress.io/">
    <img src="https://www.cypress.io/_astro/navbar-brand.D87396b0.svg" width="140" height="100" style="object-fit: contain">
</a>
<a href="https://playwright.dev/">
    <img src="https://playwright.dev/img/playwright-logo.svg" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://www.prisma.io/">
    <img src="https://prismalens.vercel.app/header/logo-white.svg" width="140" height="100" style="object-fit: contain">
</a>
<a href="https://zod.dev/">
    <img src="https://zod.dev/logo.svg" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://authjs.dev/">
    <img src="https://authjs.dev/img/etc/logo-sm.webp" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://supabase.com/">
    <img src="https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.b36ebb5f.png&w=256&q=75" width="200" height="90" style="object-fit: contain">
</a>
