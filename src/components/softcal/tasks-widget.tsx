"use client";

import { CheckSquare2 } from "lucide-react";

import { useSoftcalTasks } from "./hooks/use-softcal-tasks";

export function TasksWidget() {
  const { topTasks } = useSoftcalTasks();
  const tasks = topTasks.slice(0, 5);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#7cc5ff]/70 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#7cc5ff]/20 to-[#4a9be0]/10"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-white/80">Tasks</div>
        </div>
      </div>
      <div className="relative mt-3 space-y-2">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            No tasks available.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.title}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-white"
            >
              <span className="font-semibold line-clamp-1">{task.title}</span>
              <span className="text-xs text-white/70">
                {task.frequency ?? ""}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
