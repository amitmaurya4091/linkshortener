# Shortline Agent Instructions

## Table of contents

- [Project overview](#project-overview)
- [Authentication](docs/authentication.md)
- [UI components](docs/ui-components.md)
- [Required workflow](#required-workflow)

Use the documents in `docs/` for the project-specific source of truth for implementation decisions.
IMPORTANT: BEFORE GENERATING ANY CODE, you MUST read the relevant individual instruction file(s) in the `/docs` directory that apply to the task or area being changed. This is required and non-negotiable. Do not write code before checking the relevant docs.

## Project overview

Shortline is a link-shortening web application. Its intended product flow is to let authenticated users create and manage memorable short links, redirect visitors safely to destination URLs, and eventually inspect link performance. The repository is currently an early scaffold: the public home page, Clerk authentication entry points, middleware matcher, and server-side Drizzle client exist, while link creation, the dashboard, redirects, analytics, mutations, and the database schema are still unimplemented.

The application uses the Next.js 16 App Router with React and strict TypeScript. Clerk provides authentication, Drizzle ORM connects to Neon Postgres, and Tailwind CSS 4, shadcn conventions, Base UI primitives, and Lucide icons provide the interface layer. Treat `app/` as the route and server-component boundary, `components/` as reusable UI, `lib/` as shared domain-agnostic utilities, and `docs/` as the detailed project-specific source of truth.

Use the documents in [`docs/`](docs/) as the project-specific source of truth for implementation decisions. Read the document that matches the files or behavior being changed before editing, including [`docs/authentication.md`](docs/authentication.md) for authentication and route-access behavior. Keep changes focused on the requested behavior. These documents describe the current repository and its intended direction; do not assume unfinished features already exist.

## Required workflow

- Before generating any code, read the relevant individual instruction file(s) in [`docs/`](docs/) for the exact area or behavior being changed. This is a required prerequisite and must happen before implementing anything.
- Inspect the nearby implementation and existing component patterns before introducing a new abstraction.
- Preserve the Next.js App Router, TypeScript strictness, Clerk authentication, Drizzle ORM, Neon Postgres, Tailwind CSS, and shadcn conventions already used here.
- Prefer small, composable changes over broad rewrites. Do not change generated files, dependencies, or configuration unless the task requires it.
- Keep secrets in environment variables. Never expose `DATABASE_URL`, Clerk secrets, or other credentials to client components or committed files.
- Run the narrowest relevant validation first, then run the full checks described in [`docs/validation.md`](docs/validation.md) when the change affects shared or user-facing behavior.
- Report any checks that could not run and any unrelated pre-existing issue separately from the work completed.
- Treat the current empty database schema and incomplete link workflow as known project state, not as permission to invent unrelated features.
