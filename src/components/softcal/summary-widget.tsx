"use client";

import { LayoutDashboard } from "lucide-react";

// Simple full-width summary widget to anchor the dashboard.
export function SummaryWidget() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#7cc5ff]/70 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#7cc5ff]/20 via-[#4a9be0]/15 to-[#0f1522]/40"
        aria-hidden
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-white">
          <div className="text-sm font-semibold text-white/80">Dashboard</div>
          <div className="text-2xl font-bold">Today at a glance</div>
          <div className="text text-white/80 line-clamp-6">
            Quick overview of tasks, orders, events, and notes. and neat lines
            and there are a ot of stuff theres \evebn a fourth line coming up
            here whats that, gtheres a fifth line like what the heck can there
            be a 7th thats kinda cool?
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-inner">
          <LayoutDashboard size={22} strokeWidth={2.25} />
        </div>
      </div>
    </div>
  );
}
