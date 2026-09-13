---
description: Guidelines for data mutations, server actions, validation, authentication, and database access.
---
# Server Actions

- Perform all data mutations through server actions.
- Call server actions only from client components.
- Name server action files `actions.ts` and colocate them with the component that calls them.
- Give every value passed to a server action an appropriate TypeScript type. Do not use the `FormData` type.
- Validate all server action input with Zod before processing it.
- Server actions must not throw errors. Return an object with either an `error` or `success` property instead.
- Check that a user is authenticated before any database operation. Stop immediately when no user is logged in.
- Put all database operations in helper functions under `/data` that wrap Drizzle queries. Server actions must not contain direct Drizzle queries.