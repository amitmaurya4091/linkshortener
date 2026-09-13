"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const createLinkSchema = z.object({
    url: z.string().trim().url("Enter a valid destination URL."),
    shortCode: z
        .string()
        .trim()
        .min(3, "Use at least 3 characters.")
        .max(32, "Use 32 characters or fewer.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Use only letters, numbers, hyphens, or underscores.")
        .optional()
        .or(z.literal("")),
});

export type CreateLinkInput = {
    url: string;
    shortCode: string;
};

export async function createLinkAction(input: CreateLinkInput) {
    const result = createLinkSchema.safeParse(input);

    if (!result.success) {
        return { error: result.error.issues[0]?.message ?? "Check the link details and try again." };
    }

    const { userId } = await auth();

    if (!userId) {
        return { error: "You must be signed in to create a link." };
    }

    try {
        const link = await createLink({
            userId,
            url: result.data.url,
            shortCode: result.data.shortCode || undefined,
        });

        return { success: true as const, shortCode: link.shortCode };
    } catch {
        return {
            error: "That short code is already in use. Choose another one and try again.",
        };
    }
}