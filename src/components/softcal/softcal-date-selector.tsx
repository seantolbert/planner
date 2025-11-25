import type { MutableRefObject, RefObject } from "react";

import type { DayButton } from "./softcal-types";

interface SoftcalDateSelectorProps {
  monthLabel: string;
  dayButtons: DayButton[];
  activeIndex: number;
  onSelect: (index: number) => void;
  highlight: {
    left: number;
    width: number;
    height: number;
  };
  containerRef: RefObject<HTMLDivElement>;
  buttonRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
}

export function SoftcalDateSelector({
  monthLabel,
  dayButtons,
  activeIndex,
  onSelect,
  highlight,
  containerRef,
  buttonRefs,
}: SoftcalDateSelectorProps) {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#7cc5ff] mb-2">
        {monthLabel}
      </div>
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-between gap-0.5 text-sm font-semibold text-white"
      >
        <span
          className="pointer-events-none absolute rounded-t-2xl rounded-b-none bg-[#172333] transition-all duration-200"
          style={{
            transform: `translateX(${highlight.left}px)`,
            width: highlight.width || 0,
            height: (highlight.height || 0) + 10,
          }}
          aria-hidden
        />
        {dayButtons.map((label, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={label.key ?? label.label}
              ref={(node) => {
                buttonRefs.current[idx] = node;
              }}
              type="button"
              onClick={() => onSelect(idx)}
              className={`relative z-[1] flex flex-col items-center gap-[2px] rounded-full px-3 py-1.5 text-sm transition ${
                isActive ? "text-white" : "text-white/50"
              }`}
            >
              <span>{label.label}</span>
              {label.weekday ? (
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#7cc5ff]/90">
                  {label.weekday}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
