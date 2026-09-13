# Shortline Agent Instructions

## Table of contents

- [Project overview](#project-overview)
- [Required workflow](#required-workflow)

## Project overview

Shortline is a link-shortening web application. Its intended product flow is to let authenticated users create and manage memorable short links, redirect visitors safely to destination URLs, and eventually inspect link performance. The repository is currently an early scaffold: the public home page, Clerk authentication entry points, middleware matcher, and server-side Drizzle client exist, while link creation, the dashboard, redirects, analytics, mutations, and the database schema are still unimplemented.

The application uses the Next.js 16 App Router with React and strict TypeScript. Clerk provides authentication, Drizzle ORM connects to Neon Postgres, and Tailwind CSS 4, shadcn conventions, Base UI primitives, and Lucide icons provide the interface layer. Treat `app/` as the route and server-component boundary, `components/` as reusable UI, `lib/` as shared domain-agnostic utilities.

## Required workflow

- Inspect the nearby implementation and existing component patterns before introducing a new abstraction.
- Preserve the Next.js App Router, TypeScript strictness, Clerk authentication, Drizzle ORM, Neon Postgres, Tailwind CSS, and shadcn conventions already used here.
- Prefer small, composable changes over broad rewrites. Do not change generated files, dependencies, or configuration unless the task requires it.
- Keep secrets in environment variables. Never expose `DATABASE_URL`, Clerk secrets, or other credentials to client components or committed files.
- Report any checks that could not run and any unrelated pre-existing issue separately from the work completed.
- Treat the current empty database schema and incomplete link workflow as known project state, not as permission to invent unrelated features.
