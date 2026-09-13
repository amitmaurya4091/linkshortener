import { auth } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CreateLinkDialog } from "@/components/create-link/create-link-dialog";
import { LinkActions } from "@/components/link-actions/link-actions";
import { getLinksByUserId } from "@/data/links";

export default async function DashboardPage() {
    const { userId } = await auth.protect();
    const userLinks = await getLinksByUserId(userId);

    return (
        <main className="min-h-full bg-[#101110] text-[#f4f1e9]">
            <header className="flex items-center justify-end gap-2 border-b border-[#343d34] px-6 py-4 lg:px-10">
                <UserButton showName userProfileMode="modal" />
                <SignOutButton redirectUrl="/">
                    <Button variant="ghost" className="text-[#a4aaa0] hover:bg-[#1b211c] hover:text-[#f4f1e9]">
                        Sign out
                    </Button>
                </SignOutButton>
            </header>

            <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
                <div className="flex flex-col gap-6 border-b border-[#343d34] pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9f36a]">Link library</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your links</h1>
                        <p className="mt-4 max-w-2xl text-[#a4aaa0]">
                            Every short link you have created, in one place.
                        </p>
                    </div>
                    <CreateLinkDialog />
                </div>

                {userLinks.length > 0 ? (
                    <ul className="divide-y divide-[#343d34]">
                        {userLinks.map((link) => (
                            <li key={link.id} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <a
                                        href={`/l/${link.shortCode}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block truncate text-lg font-medium text-[#d9f36a] underline-offset-4 hover:underline"
                                    >
                                        /{link.shortCode}
                                    </a>
                                    <p className="mt-1 truncate text-sm text-[#a4aaa0]">{link.url}</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 sm:justify-end">
                                    <time className="shrink-0 text-xs text-[#7c857a]" dateTime={link.createdAt.toISOString()}>
                                        {link.createdAt.toLocaleDateString()}
                                    </time>
                                    <LinkActions id={link.id} url={link.url} shortCode={link.shortCode} />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-12 text-[#a4aaa0]">You have not created any links yet.</p>
                )}
            </section>
        </main>
    );
}
