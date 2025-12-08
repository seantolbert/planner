"use client";

import { NotebookText } from "lucide-react";

import { placeholderNotes } from "./data/placeholders";

// Standalone Notes widget showing latest notes and recently edited lists.
export function NotesWidget() {
  const latestNotes = [...placeholderNotes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const recentLists = latestNotes.slice(0, 3).map((note) => ({
    name: note.title,
    updated: new Date(note.updatedAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
  }));

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#7cc5ff]/70 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 opacity-70 bg-gradient-to-br from-[#7cc5ff] to-[#4a9be0]"
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-white/80">Notes</div>
          <div className="text-lg font-semibold text-white drop-shadow-sm">
            Last 5 updates
          </div>
          <div className="text-sm text-white/80">
            Quick glance at your freshest notes.
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-inner">
          <NotebookText size={22} strokeWidth={2.25} />
        </div>
      </div>

      <div className="relative mt-4 flex gap-3 overflow-x-auto pb-1 pr-1">
        {latestNotes.map((note) => (
          <div
            key={note.title}
            className="min-w-[180px] rounded-3xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm"
          >
            <div className="text-sm font-semibold text-white line-clamp-1">
              {note.title}
            </div>
            <div className="mt-1 text-xs text-white/80 line-clamp-2">
              {note.content}
            </div>
            {note.link ? (
              <div className="mt-2 text-xs text-[#dff1ff] line-clamp-1">
                {note.link}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/10 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Recently Edited Lists
        </div>
        <div className="mt-2 space-y-2">
          {recentLists.map((list) => (
            <div
              key={list.name}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm text-white/90"
            >
              <span className="font-semibold line-clamp-1">{list.name}</span>
              <span className="text-xs text-white/70">{list.updated}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
