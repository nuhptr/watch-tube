# Watchtube - 1:10:00an videonya

A project to watch videos like YouTube.

## Create Project

`bunx create-next-app@latest [name-app]`

## Adding Shadcn

Shadcn build under @radix-ui. So all packages are under @radix-ui and @hookform/resolvers.

`bunx --bun shadcn@latest init`
`bunx shadcn@latest add --all` - Add all components from Shadcn

for detailed packages, check [npm-package-1](./npm-package-1.png) & [npm-package-2](./npm-package-2.png)

## Authentication using Clerk

Open [Clerk](https://clerk.com/) and create a new project. Then, copy the `API KEY` and paste it to `.env.local` file.

Install `bun add @clerk/nextjs`
