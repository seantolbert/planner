"use client";

import { Package } from "lucide-react";

export function OrdersWidget() {
  const pending = 7;
  const inProgress = 3;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#f7a700]/70 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f7a700]/20 to-[#f28f41]/10"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-white/80">Orders</div>
        </div>
      </div>
      <div className="relative mt-3 grid grid-col gap-2 text-white">
        <div className="flex justify-between items-center rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
          <div className="text-xs uppercase text-white/70">Pending</div>
          <div className="text-2xl font-bold">{pending}</div>
        </div>
        <div className="flex justify-between items-center rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
          <div className="text-xs uppercase text-white/70">Working</div>
          <div className="text-2xl font-bold">{inProgress}</div>
        </div>
      </div>
    </div>
  );
}
