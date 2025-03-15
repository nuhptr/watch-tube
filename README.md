# Watchtube

A project to watch videos like YouTube.

## Create Project

`bunx create-next-app@latest [name-app]`

## Adding Shadcn

Shadcn build under @radix-ui. So all packages are under @radix-ui and @hookform/resolvers.

`bunx --bun shadcn@latest init`
`bunx shadcn@latest add --all` - Add all components from Shadcn

for detailed packages, check [npm-package-1](./image-learn/npm-package-1.png) & [npm-package-2](./image-learn/npm-package-2.png)

## Authentication using Clerk

Open [Clerk](https://clerk.com/) and create a new project. Then, copy the `API KEY` and paste it to `.env.local` file.

Install `bun add @clerk/nextjs`

## Drizzle ORM

Install these package

`bun add drizzle-orm @neondatabase/serverless dotenv
bun add -D drizzle-kit tsx`

Setup Connection Environment to Neon Database

`NEON_DATABASE_URL=`

Connect Drizzle ORM to the database

```ts
import { drizzle } from "drizzle-orm/neon-http"

const db = drizzle(process.env.DATABASE_URL)
```

Create a table (for example, users)

```db
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => emailIndex: uniqueIndex("email_idx").on(table.email))
```

Setup Drizzle config on drizzle.config.ts

```ts
import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: { url: process.env.NEON_DATABASE_URL! },
})
```

Applying changes to database

`bunx drizzle-kit push`

For generate migration using `bunx drizzle-kit generate` and apply migration using `bunx drizzle-kit migrate`

## Concurrently run multiple commands

run multiple commands at the same time

`bun add concurrently`

## Clerk webhook

install svix use `bun add svix`

## Trpc

RPC is short for "Remote Procedure Call". It is a way of calling functions on one computer (the server) from another computer (the client). With traditional HTTP/REST APIs, you call a URL and get a response. With RPC, you call a function and get a response.

-   `bun add @trpc/server@next`
-   `@trpc/client@next`
-   `@trpc/react-query@next`
-   `@tanstack/react-query@latest`
-   `zod client-only server-only`

For error handling `bun add react-error-boundary` which is a library for handling errors in React applications.

Enable transformer with `bun add superjson` to serialize(mengubah) and deserialize(mengembalikan) data.

## Upstash Redis (for local database and rate limiting)

Using redis for caching and session.

install `bun add @upstash/redis @upstash/ratelimit`
