"use client";

import { NotebookText } from "lucide-react";

import { placeholderNotes } from "./data/placeholders";

export function DashboardNotesWidget() {
  const latest = [...placeholderNotes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 1);
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#7cc5ff]/70 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#7cc5ff]/20 to-[#4a9be0]/10"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-white/80">Notes</div>
        </div>
      </div>
      <div className="relative mt-3 space-y-2">
        {latest.map((note) => (
          <div key={note.title} className="rounded-2xl text-white">
            <div className="font-semibold">{note.title}</div>
            <div className="text-xs text-white/80 line-clamp-3">
              {note.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
