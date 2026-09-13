import {
  ArrowUpRight,
  BarChart3,
  Check,
  Globe2,
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
    <main className="relative min-h-full flex-1 overflow-hidden bg-[#101110] text-[#f4f1e9]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_4%,rgba(220,244,111,0.14),transparent_24rem),radial-gradient(circle_at_10%_42%,rgba(53,88,72,0.23),transparent_30rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d9f36a]/40" />
      <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#d9f36a] text-[#101110]">
            <Link2 className="size-4" />
          </span>
          shortline
        </div>
        <div className="hidden items-center gap-8 text-sm text-[#a4aaa0] md:flex">
          <a className="transition-colors hover:text-[#f4f1e9]" href="#features">Features</a>
          <a className="transition-colors hover:text-[#f4f1e9]" href="#how-it-works">How it works</a>
        </div>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-[#a4aaa0] hover:bg-[#1b211c] hover:text-[#f4f1e9]">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-[#d9f36a] text-[#101110] hover:bg-[#e7fa91]">
                Sign up <ArrowUpRight />
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </nav>

      <section className="relative mx-auto w-full max-w-5xl px-6 pb-24 pt-16 text-center lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d9f36a]/25 bg-[#d9f36a]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9f36a]">
            <Sparkles className="size-3.5" /> Link management, simplified
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
            Short links with a <span className="text-[#d9f36a]">longer</span> story.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#a4aaa0]">
            Create memorable links, keep your campaigns organized, and understand what gets clicked. Shortline makes every destination easier to share.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" className="h-11 bg-[#d9f36a] px-5 text-[#101110] hover:bg-[#e7fa91]">
                  Create your first link <ArrowUpRight />
                </Button>
              </SignUpButton>
            </Show>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7c857a]">
            <span className="flex items-center gap-2"><Check className="size-4 text-[#d9f36a]" /> Free to get started</span>
            <span className="flex items-center gap-2"><Check className="size-4 text-[#d9f36a]" /> No credit card</span>
          </div>
        </div>
      </section>

      <section id="features" className="relative border-y border-[#343d34] bg-[#151a16]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9f36a]">Everything in one place</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">A better home for every link.</h2></div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[#343d34] bg-[#343d34] md:grid-cols-3">
            <div className="bg-[#151a16] p-7"><ShieldCheck className="size-6 text-[#d9f36a]" /><h3 className="mt-12 text-lg font-semibold">Reliable by default</h3><p className="mt-3 text-sm leading-6 text-[#a4aaa0]">Fast, dependable redirects that take people exactly where they need to go.</p></div>
            <div className="bg-[#151a16] p-7"><BarChart3 className="size-6 text-[#d9f36a]" /><h3 className="mt-12 text-lg font-semibold">Insights that matter</h3><p className="mt-3 text-sm leading-6 text-[#a4aaa0]">See which links get attention, so your next share is an informed one.</p></div>
            <div className="bg-[#151a16] p-7"><Globe2 className="size-6 text-[#d9f36a]" /><h3 className="mt-12 text-lg font-semibold">Your brand, your way</h3><p className="mt-3 text-sm leading-6 text-[#a4aaa0]">Create short, recognizable URLs that look good wherever you share them.</p></div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9f36a]">Three simple moves</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">From long URL to link worth sharing.</h2></div><div className="grid gap-8 sm:grid-cols-3"><div className="border-t border-[#343d34] pt-5"><span className="text-sm text-[#d9f36a]">01</span><h3 className="mt-10 font-semibold">Paste</h3><p className="mt-2 text-sm leading-6 text-[#a4aaa0]">Drop in any destination URL.</p></div><div className="border-t border-[#343d34] pt-5"><span className="text-sm text-[#d9f36a]">02</span><h3 className="mt-10 font-semibold">Personalize</h3><p className="mt-2 text-sm leading-6 text-[#a4aaa0]">Give it a name people remember.</p></div><div className="border-t border-[#343d34] pt-5"><span className="text-sm text-[#d9f36a]">03</span><h3 className="mt-10 font-semibold">Understand</h3><p className="mt-2 text-sm leading-6 text-[#a4aaa0]">Learn what resonates and repeat.</p></div></div></div>
      </section>

      <section className="relative mx-6 mb-6 overflow-hidden rounded-2xl bg-[#d9f36a] px-6 py-14 text-[#101110] sm:px-12 lg:mx-auto lg:max-w-7xl lg:py-16"><div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Make your next link count</p><h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">Start building your link library.</h2></div><Show when="signed-out"><SignUpButton mode="modal"><Button size="lg" className="h-11 shrink-0 bg-[#101110] px-5 text-[#f4f1e9] hover:bg-[#273027]">Get started free <ArrowUpRight /></Button></SignUpButton></Show></div></section>
    </main>
  );
}
