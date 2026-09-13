# Authentication

Use Clerk for all authentication in this application. Do not add or use any other authentication method.

- Protect `/dashboard`; only authenticated users may access it.
- Redirect authenticated users who visit `/` to `/dashboard`.
- Always launch Clerk sign-in and sign-up as modals.
- Preserve Clerk as the single source of truth for authentication state and route access.
