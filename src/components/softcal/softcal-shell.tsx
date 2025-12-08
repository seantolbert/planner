"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { Calendar, CheckSquare2, StickyNote } from "lucide-react";

import { softcalNavItems } from "./softcal-nav";
import { SoftcalSideNav } from "./softcal-side-nav";

type SoftcalShellProps = {
  children: ReactNode;
};

// Shared shell that keeps the side nav mounted across Softcal pages so the indicator can animate smoothly.
export function SoftcalShell({ children }: SoftcalShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [fabOpen, setFabOpen] = useState(false);
  const defaultFabActions = [
    { label: "Event", Icon: Calendar },
    { label: "Note", Icon: StickyNote },
    { label: "Task", Icon: CheckSquare2 },
  ];

  const activeNav =
    softcalNavItems.find((item) => item.href === pathname)?.label ??
    softcalNavItems[0].label;

  const handleSelectNav = (label: string) => {
    const target = softcalNavItems.find((item) => item.label === label);
    if (!target) return;
    if (target.href === pathname) return;
    router.push(target.href);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0b111a] to-[#0f1522] px-4 pr-28 lg:pr-32 text-white">
      <SoftcalSideNav
        navItems={softcalNavItems}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        fabActions={defaultFabActions}
        fabOpen={fabOpen}
        onToggleFab={() => setFabOpen((prev) => !prev)}
        onFabAction={() => {}}
      />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-10">
        {children}
      </main>
    </div>
  );
}
