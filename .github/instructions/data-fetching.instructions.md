---
description: Read this file to understand how to fetch data from the API and use it in your application.
---
# Data Fetching Instructions
This document provides guidelines on how to fetch data from the API and utilize it effectively in your application. Follow these instructions to ensure consistent and efficient data handling.

## 1. Use Server Components for Data Fetching
When fetching data, prefer using server components to handle the data retrieval. This approach allows you to fetch data on the server side, reducing the amount of data sent to the client and improving performance.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data folder to fetch data. These functions are designed to handle API requests and responses efficiently. Avoid making direct API calls in your components.

All helper function in the /data folder should use Drizzle ORM for database interactions. This ensures that your data fetching logic is consistent and maintainable.
