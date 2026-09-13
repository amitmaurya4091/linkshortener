"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
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
import { createLinkAction } from "./actions";

export function CreateLinkDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const input = {
            url: String(formData.get("url") ?? ""),
            shortCode: String(formData.get("shortCode") ?? ""),
        };

        setError(null);
        startTransition(async () => {
            const result = await createLinkAction(input);

            if ("error" in result) {
                setError(result.error ?? "Check the link details and try again.");
                return;
            }

            form.reset();
            setOpen(false);
            router.refresh();
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-[#d9f36a] text-[#101110] hover:bg-[#c9e45b]" />}>
                <Plus />
                Create link
            </DialogTrigger>
            <DialogContent className="border-[#343d34] bg-[#171c17] text-[#f4f1e9] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a short link</DialogTitle>
                    <DialogDescription className="text-[#a4aaa0]">
                        Give a long URL a memorable home on Shortline.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="url" className="text-[#f4f1e9]">Destination URL</Label>
                        <Input
                            id="url"
                            name="url"
                            type="url"
                            placeholder="https://example.com/article"
                            required
                            autoFocus
                            className="border-[#343d34] bg-[#101110] text-[#f4f1e9] placeholder:text-[#7c857a]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shortCode" className="text-[#f4f1e9]">
                            Custom short code <span className="font-normal text-[#7c857a]">(optional)</span>
                        </Label>
                        <div className="flex items-center rounded-lg border border-[#343d34] bg-[#101110] focus-within:ring-3 focus-within:ring-[#d9f36a]/30">
                            <span className="pl-3 text-sm text-[#7c857a]">shortline/</span>
                            <Input
                                id="shortCode"
                                name="shortCode"
                                placeholder="my-link"
                                maxLength={32}
                                className="border-0 bg-transparent focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    {error ? <p className="text-sm text-red-300" role="alert">{error}</p> : null}

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="bg-[#d9f36a] text-[#101110] hover:bg-[#c9e45b]">
                            {isPending ? "Creating..." : "Create link"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}