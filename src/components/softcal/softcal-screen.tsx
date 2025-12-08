"use client";

import { NotesWidget } from "./notes-widget";
import { EventsWidget } from "./events-widget";

// Home screen dashboard
export function HomeScreen() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0b111a] to-[#0f1522] flex flex-col items-center px-4 text-white">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NotesWidget />
          <EventsWidget />
        </div>
      </div>
    </div>
  );
}
