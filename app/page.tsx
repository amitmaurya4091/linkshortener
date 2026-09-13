import {
  ArrowUpRight,
  BarChart3,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Show,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full bg-accent opacity-70 blur-3xl" />
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Link2 className="size-4" />
          </span>
          shortline
        </div>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>
                Get started <ArrowUpRight />
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </nav>

      <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20 pt-12 lg:px-10 lg:pt-20">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="size-3.5" /> Your links, refined
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl">
            Make every link feel like it belongs.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            Turn long, forgettable URLs into short links that are easy to share, easy to remember, and ready to measure.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" className="h-11 px-5">
                  Create your first link <ArrowUpRight />
                </Button>
              </SignUpButton>
            </Show>
          </div>
        </div>

        <div className="mt-24 grid max-w-3xl gap-6 border-t border-border pt-6 sm:grid-cols-3">
          <div>
            <ShieldCheck className="mb-3 size-5 text-primary" />
            <h2 className="font-semibold">Trust built in</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Reliable redirects with a clean, safe destination.</p>
          </div>
          <div>
            <BarChart3 className="mb-3 size-5 text-primary" />
            <h2 className="font-semibold">Know what lands</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">See which links are earning attention.</p>
          </div>
          <div>
            <Link2 className="mb-3 size-5 text-primary" />
            <h2 className="font-semibold">One tidy home</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Keep your important links close at hand.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
