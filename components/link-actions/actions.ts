"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { deleteLink, updateLink } from "@/data/links";

const linkIdSchema = z.number().int().positive();
const updateLinkSchema = z.object({
    id: linkIdSchema,
    url: z.string().trim().url("Enter a valid destination URL."),
    shortCode: z
        .string()
        .trim()
        .min(3, "Use at least 3 characters.")
        .max(32, "Use 32 characters or fewer.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Use only letters, numbers, hyphens, or underscores."),
});

export type UpdateLinkInput = {
    id: number;
    url: string;
    shortCode: string;
};

export async function updateLinkAction(input: UpdateLinkInput) {
    const result = updateLinkSchema.safeParse(input);

    if (!result.success) {
        return { error: result.error.issues[0]?.message ?? "Check the link details and try again." };
    }

    const { userId } = await auth();

    if (!userId) {
        return { error: "You must be signed in to edit a link." };
    }

    try {
        const link = await updateLink({ ...result.data, userId });

        if (!link) {
            return { error: "That link could not be found." };
        }

        return { success: true as const };
    } catch {
        return { error: "That short code is already in use. Choose another one and try again." };
    }
}

export async function deleteLinkAction(id: number) {
    const result = linkIdSchema.safeParse(id);

    if (!result.success) {
        return { error: "That link could not be found." };
    }

    const { userId } = await auth();

    if (!userId) {
        return { error: "You must be signed in to delete a link." };
    }

    try {
        const link = await deleteLink({ id: result.data, userId });

        if (!link) {
            return { error: "That link could not be found." };
        }

        return { success: true as const };
    } catch {
        return { error: "The link could not be deleted. Please try again." };
    }
}