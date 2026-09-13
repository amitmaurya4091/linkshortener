import { randomBytes } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/app/db";
import { links } from "@/app/db/schema";

export async function getLinksByUserId(userId: string) {
    return db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
    const [link] = await db
        .select()
        .from(links)
        .where(eq(links.shortCode, shortCode))
        .limit(1);

    return link;
}

function generateShortCode() {
    return randomBytes(6).toString("base64url").slice(0, 8);
}

export async function createLink({
    userId,
    url,
    shortCode,
}: {
    userId: string;
    url: string;
    shortCode?: string;
}) {
    const code = shortCode ?? generateShortCode();

    const [link] = await db
        .insert(links)
        .values({ userId, url, shortCode: code })
        .returning();

    return link;
}

export async function updateLink({
    id,
    userId,
    url,
    shortCode,
}: {
    id: number;
    userId: string;
    url: string;
    shortCode: string;
}) {
    const [link] = await db
        .update(links)
        .set({ url, shortCode, updatedAt: new Date() })
        .where(and(eq(links.id, id), eq(links.userId, userId)))
        .returning();

    return link;
}

export async function deleteLink({ id, userId }: { id: number; userId: string }) {
    const [link] = await db
        .delete(links)
        .where(and(eq(links.id, id), eq(links.userId, userId)))
        .returning({ id: links.id });

    return link;
}