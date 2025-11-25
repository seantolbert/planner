import type { RefObject } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import type { SoftcalTask, TaskFrequency } from "./softcal-types";

interface SoftcalTaskPanelProps {
  headerTitle: string;
  totalTasks: number;
  completedTasks: number;
  completionRatio: number;
  topTasks: SoftcalTask[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onHoldStart: (id: string) => void;
  onHoldEnd: () => void;
  holdingId: string | null;
  taskColorStyles: Record<TaskFrequency | string, string>;
  cardRef: RefObject<HTMLDivElement>;
  computedMaxHeight: number | null;
  isFirstDay: boolean;
  isLastDay: boolean;
}

export function SoftcalTaskPanel({
  headerTitle,
  totalTasks,
  completedTasks,
  completionRatio,
  topTasks,
  showAll,
  onToggleShowAll,
  onHoldStart,
  onHoldEnd,
  holdingId,
  taskColorStyles,
  cardRef,
  computedMaxHeight,
  isFirstDay,
  isLastDay,
}: SoftcalTaskPanelProps) {
  return (
    <div
      ref={cardRef}
      className={`w-full max-w-5xl rounded-[28px] bg-[#172333] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.32)] overflow-hidden transition-[max-height,border-radius] duration-400 ease-in-out flex flex-col ${
        showAll ? "mb-6" : "mb-5"
      }`}
      style={{
        maxHeight: computedMaxHeight ? `${computedMaxHeight}px` : undefined,
        borderTopLeftRadius: isFirstDay ? "0px" : "28px",
        borderTopRightRadius: isLastDay ? "0px" : "28px",
      }}
    >
      <div className="flex items-end justify-between text-white">
        <div className="text-4xl font-bold leading-tight text-white">
          {headerTitle}
        </div>

        <div className="w-32 text-right">
          <div className="flex items-center justify-between text-xs font-semibold text-white/70">
            <span>Tasks</span>
            <span>
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
            <div
              className="h-full rounded-full bg-[#7cc5ff]"
              style={{ width: `${Math.round(completionRatio * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {topTasks.map((task) => (
          <button
            key={task.id}
            onMouseDown={() => onHoldStart(task.id)}
            onMouseUp={onHoldEnd}
            onMouseLeave={onHoldEnd}
            onTouchStart={() => onHoldStart(task.id)}
            onTouchEnd={onHoldEnd}
            onTouchCancel={onHoldEnd}
            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition border ${
              taskColorStyles[task.frequency] ??
              "border-white/10 bg-white/5 text-white/80"
            } ${
              holdingId === task.id
                ? "border border-[#f6c56e] transition-[border-color] duration-1000"
                : "transition-[border-color] duration-200"
            }`}
            type="button"
          >
            <div className="flex flex-col items-start gap-1 text-left">
              <span>{task.title}</span>
            </div>
            {task.done ? (
              <CheckCircle2 size={16} className="text-[#7cc5ff]" />
            ) : (
              <Circle size={16} className="text-white/40" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 flex w-full justify-center">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          onClick={onToggleShowAll}
        >
          {showAll ? "Close" : "Show All"}
        </button>
      </div>
    </div>
  );
}
