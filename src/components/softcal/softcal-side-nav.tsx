// Client-side nav rail with animated pill indicator and optional quick actions.
import { useLayoutEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

type NavItem = { label: string; Icon: LucideIcon };
type FabAction = { label: string; Icon: LucideIcon };

type SoftcalSideNavProps = {
  navItems: NavItem[];
  activeNav: string;
  onSelectNav: (label: string) => void;
  fabActions: FabAction[];
  fabOpen: boolean;
  onToggleFab: () => void;
  onFabAction: (label: string) => void;
  showFab?: boolean;
};

// Dedicated side rail that keeps the main screen lean; handles nav icons and the protruding quick-add control.
export function SoftcalSideNav({
  navItems,
  activeNav,
  onSelectNav,
  fabActions,
  fabOpen,
  onToggleFab,
  onFabAction,
  showFab = true,
}: SoftcalSideNavProps) {
  // Indicator size stays larger than the icon so the pill has breathing room.
  const INDICATOR_H = 48; // taller than the icon to create a padded pill
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorReady, setIndicatorReady] = useState(false);
  const [activeLabel, setActiveLabel] = useState(activeNav);

  useLayoutEffect(() => {
    // Sync the locally tracked label so the pill can animate immediately on click.
    setActiveLabel(activeNav);
    const updateIndicator = () => {
      const idx = navItems.findIndex((item) => item.label === activeNav);
      const btn = buttonRefs.current[idx];
      const container = containerRef.current;
      if (!btn || !container) return;
      const containerTop = container.getBoundingClientRect().top;
      const btnRect = btn.getBoundingClientRect();
      const top =
        btnRect.top - containerTop + btnRect.height / 2 - INDICATOR_H / 2;
      setIndicatorTop(top);
      setIndicatorReady(true);
    };

    // Initial measure and a follow-up after paint to catch late layout shifts (fonts/icons).
    updateIndicator();
    const rafId = requestAnimationFrame(updateIndicator);

    // Watch for container/button resize to keep alignment in sync.
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateIndicator())
        : null;
    if (resizeObserver) {
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      buttonRefs.current.forEach((btn) => btn && resizeObserver.observe(btn));
    }

    window.addEventListener("resize", updateIndicator);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateIndicator);
      resizeObserver?.disconnect();
    };
  }, [activeNav, navItems]);

  return (
    <>
      <div className="fixed right-0 top-0 bottom-0 z-40 flex w-12 flex-col items-center gap-3 bg-[#454646] py-6 shadow-[0_10px_28px_rgba(13,34,79,0.12)]">
        {/* Icon-only nav keeps the rail compact while tracking an active state. */}
        <div
          ref={containerRef}
          className="relative flex w-full flex-1 flex-col items-center justify-center gap-3"
        >
          {indicatorReady ? (
            <div
              className="pointer-events-none absolute left-0 top-0 w-full bg-[#0b111a] will-change-transform transition-transform duration-350 ease-[cubic-bezier(0.25,0.8,0.35,1)] overflow-visible"
              style={{
                height: INDICATOR_H,
                transform: `translateY(${indicatorTop}px)`,
              }}
              aria-hidden
            />
          ) : null}
          {/* Nav buttons feed measurements for the pill; click updates local state then informs parent. */}
          {navItems.map(({ label, Icon }, idx) => {
            const isActive = activeNav === label;
            return (
              <button
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                key={label}
                type="button"
                aria-label={label}
                onClick={() => {
                  setActiveLabel(label);
                  onSelectNav(label);
                }}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl text-[#7cc5ff] transition ${
                  activeLabel === label ? "text-[#7cc5ff]" : "hover:text-[#7cc5ff]"
                }`}
              >
                <Icon size={25} strokeWidth={1.75} />
              </button>
            );
          })}
        </div>

        {showFab ? (
          <div className="relative mt-auto w-full">
            <div className="absolute bottom-5 left-0 -translate-x-1/2">
              <div className="relative h-16 w-48">
                {/* Row of quick actions that slide left when fabOpen toggles. */}
                {fabActions.map((action, index) => {
                  const offset = (index + 1) * 64;
                  const Icon = action.Icon;
                  return (
                    <button
                      key={action.label}
                      type="button"
                      aria-label={action.label}
                      className="absolute top-1/2 left-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-[#c2d1ed] bg-gradient-to-br from-[#e3edff] to-[#d2e1fb] text-[#0b1a2f] shadow-[0_12px_30px_rgba(13,34,79,0.16)] ring-2 ring-[#7cb5ff]/60 transition-all duration-200 ease-out hover:scale-[1.05] hover:ring-[#5fa1ff]/80"
                      style={{
                        transform: `translate(${fabOpen ? `calc(-50% - ${offset}px)` : "-50%"}, -50%)`,
                        opacity: fabOpen ? 1 : 0,
                        pointerEvents: fabOpen ? "auto" : "none",
                      }}
                      onClick={() => onFabAction(action.label)}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle quick actions"
              onClick={onToggleFab}
              className={`absolute bottom-5 left-0 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#7cc5ff] to-[#4a9be0] text-[#0b111a] shadow-[0_14px_32px_rgba(13,34,79,0.2)] border border-[#afcaf3] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ${
                fabOpen ? "rotate-45" : "rotate-0"
              }`}
            >
              <Plus size={24} strokeWidth={3} />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
