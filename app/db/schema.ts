import { index, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const links = pgTable(
    "links",
    {
        id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
        shortCode: text("short_code").notNull(),
        userId: text("user_id").notNull(),
        url: text("url").notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
    },
    (table) => ({
        shortCodeUnique: uniqueIndex("links_short_code_unique").on(table.shortCode),
        userIdIndex: index("links_user_id_idx").on(table.userId),
    }),
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
