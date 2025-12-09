"use client";

import { NotesWidget } from "@/components/softcal/notes-widget";

export default function NotesPage() {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      <NotesWidget />
    </div>
  );
}
