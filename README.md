---
# Starker Kit with TurboRepo, Cloudflare Pages, Tailwind CSS, ShadCN UI and Drizzle ORM 

This is a monorepo setup with [Turborepo](https://turborepo.dev/) and [Cloudflare Pages](https://pages.cloudflare.com/) for deploying NextJS applications. It also includes a shared `tailwindcss` configuration and a shared `eslint` configuration.

## Installation

1. To get this project files locally on your machine, you can clone this repository by running the following command on your terminal or command line:

    ```sh
    git clone https://github.com/Saurav-Pant/Starter-Kit.git
    ```

2. Install all the dependency packages found in the `package.json` files across the monorepo apps by running `npm install` from the project root directory.
3. To start the development servers of all the applications in your monorepo in parallel, simply run `npm run dev`.

## Apps & Packages

### apps/docs
A sample documentation [Next.js](https://nextjs.org/docs) app.

### apps/web
NextJS on Cloudflare Pages setup with Drizzle ORM and Cloudflare D1.

#### Setting up Cloudflare D1 with Drizzle ORM

1. To create a database on D1, run:
    ```sh
    npx wrangler d1 create <dbName>
    ```
2. Add the necessary configuration to the `wrangler.toml` file which you get while running above command.

3. To initialize the DB:
    - Locally:
      ```sh
      npx wrangler d1 execute <dbName> --file=src/db/seed.sql --local
      ```
    - Remotely:
      ```sh
      npx wrangler d1 execute <dbName> --file=src/db/seed.sql --remote
      ```

4. Run:
    ```sh
    npm run cf-typegen
    ```

5. In `drizzle.config.ts`, update with your DB Name and URL, then run:
    ```sh
    npx drizzle-kit introspect
    ```

6. To Deploy on Cloudflare Pages:
      ```sh
      npm run deploy
      ```

### packages/config
Shared `tailwindcss` and `eslint` configurations.

### packages/tsconfig
`tsconfig.json`s which can be used by extending them throughout the monorepo.

### packages/ui
Shared UI components with ShadCN implementation.
---


