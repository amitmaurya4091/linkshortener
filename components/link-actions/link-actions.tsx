"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteLinkAction, updateLinkAction } from "./actions";

type LinkActionsProps = {
    id: number;
    url: string;
    shortCode: string;
};

export function LinkActions({ id, url, shortCode }: LinkActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editedUrl, setEditedUrl] = useState(url);
    const [editedShortCode, setEditedShortCode] = useState(shortCode);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        startTransition(async () => {
            const result = await updateLinkAction({ id, url: editedUrl, shortCode: editedShortCode });

            if ("error" in result) {
                setError(result.error ?? "Check the link details and try again.");
                return;
            }

            setEditOpen(false);
            window.location.reload();
        });
    }

    function handleDelete() {
        setError(null);

        startTransition(async () => {
            const result = await deleteLinkAction(id);

            if ("error" in result) {
                setError(result.error ?? "The link could not be deleted.");
                return;
            }

            setDeleteOpen(false);
            window.location.reload();
        });
    }

    return (
        <div className="flex shrink-0 items-center gap-1">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger
                    render={
                        <Button variant="ghost" size="icon-sm" aria-label={`Edit /${shortCode}`} title="Edit link">
                            <Pencil />
                        </Button>
                    }
                />
                <DialogContent className="border-[#343d34] bg-[#171c17] text-[#f4f1e9] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit short link</DialogTitle>
                        <DialogDescription className="text-[#a4aaa0]">
                            Update where this link goes or change its short code.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleEditSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor={`url-${id}`} className="text-[#f4f1e9]">Destination URL</Label>
                            <Input
                                id={`url-${id}`}
                                type="url"
                                value={editedUrl}
                                onChange={(event) => setEditedUrl(event.target.value)}
                                required
                                className="border-[#343d34] bg-[#101110] text-[#f4f1e9] placeholder:text-[#7c857a]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`short-code-${id}`} className="text-[#f4f1e9]">Short code</Label>
                            <Input
                                id={`short-code-${id}`}
                                value={editedShortCode}
                                onChange={(event) => setEditedShortCode(event.target.value)}
                                maxLength={32}
                                required
                                className="border-[#343d34] bg-[#101110] text-[#f4f1e9]"
                            />
                        </div>

                        {error ? <p className="text-sm text-red-300" role="alert">{error}</p> : null}

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setEditOpen(false)} disabled={isPending}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="bg-[#d9f36a] text-[#101110] hover:bg-[#c9e45b]">
                                {isPending ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger
                    render={
                        <Button variant="ghost" size="icon-sm" aria-label={`Delete /${shortCode}`} title="Delete link" className="text-red-300 hover:bg-red-950/40 hover:text-red-200">
                            <Trash2 />
                        </Button>
                    }
                />
                <DialogContent className="border-[#343d34] bg-[#171c17] text-[#f4f1e9] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete /{shortCode}?</DialogTitle>
                        <DialogDescription className="text-[#a4aaa0]">
                            This will permanently remove the short link. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {error ? <p className="text-sm text-red-300" role="alert">{error}</p> : null}
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setDeleteOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>
                            {isPending ? "Deleting..." : "Delete link"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}