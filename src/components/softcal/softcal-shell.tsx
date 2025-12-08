"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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
  const [scrollState, setScrollState] = useState({ top: 0, height: 48 });
  const [scrollVisible, setScrollVisible] = useState(true);
  const hideScrollTimeout = useRef<number | null>(null);
  const defaultFabActions = [
    { label: "Event", Icon: Calendar },
    { label: "Note", Icon: StickyNote },
    { label: "Task", Icon: CheckSquare2 },
  ];

  useEffect(() => {
    const updateScroll = () => {
      const trackPadding = 12;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const trackHeight = Math.max(0, window.innerHeight - trackPadding * 2);
      const thumbHeight = Math.max(
        40,
        (doc.clientHeight / doc.scrollHeight) * trackHeight
      );
      const top =
        scrollable > 0
          ? trackPadding +
            (doc.scrollTop / scrollable) * (trackHeight - thumbHeight)
          : trackPadding;
      setScrollState({ top, height: thumbHeight });
      setScrollVisible(true);
      if (hideScrollTimeout.current) {
        window.clearTimeout(hideScrollTimeout.current);
      }
      hideScrollTimeout.current = window.setTimeout(() => {
        setScrollVisible(false);
      }, 900);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (hideScrollTimeout.current) {
        window.clearTimeout(hideScrollTimeout.current);
      }
    };
  }, []);

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
    <div
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0b111a] to-[#0f1522] px-4 pr-12
     lg:pr-32 text-white"
    >
      <style jsx global>{`
        /* Hide native scrollbar and keep layout stable. */
        body {
          scrollbar-width: none;
          scrollbar-color: transparent transparent;
          margin-right: 0 !important;
          -webkit-overflow-scrolling: touch;
        }
        body::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          display: none;
          background: transparent;
        }
        html {
          scrollbar-width: none;
          scrollbar-color: transparent transparent;
        }
        html::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          display: none;
          background: transparent;
        }
      `}</style>
      <div className="pointer-events-none fixed left-2 top-0 z-30 flex h-full w-2 items-start justify-center py-3 transition-opacity duration-300" style={{ opacity: scrollVisible ? 1 : 0 }}>
        <div className="relative h-full w-full rounded-full bg-white/5">
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-[#7cc5ff]"
            style={{
              height: `${scrollState.height}px`,
              transform: `translateY(${scrollState.top}px)`,
            }}
          />
        </div>
      </div>
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
