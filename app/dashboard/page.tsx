import { auth } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    await auth.protect();

    return (
        <>
            <header className="flex items-center justify-end gap-2 border-b px-6 py-4">
                <UserButton showName userProfileMode="modal" />
                <SignOutButton redirectUrl="/">
                    <Button variant="ghost">Sign out</Button>
                </SignOutButton>
            </header>
            <h1>Dashboard</h1>
        </>
    );
}
