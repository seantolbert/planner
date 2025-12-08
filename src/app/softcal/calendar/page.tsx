"use client";

import { useState } from "react";

import { CalendarWidget } from "@/components/softcal/calendar-widget";
import { placeholderCalendarEvents } from "@/components/softcal/data/placeholders";

export default function CalendarPage() {
  const [selected, setSelected] = useState<Date | null>(null);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4 text-white">
      <div>
        <h1 className="text-3xl font-semibold">Events</h1>
        <p className="mt-1 text-sm text-white/70">
          Browse your events and pick a day to inspect.
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <CalendarWidget
          events={placeholderCalendarEvents}
          onDaySelect={(date) => setSelected(date)}
        />
      </div>
      {selected ? (
        <div className="text-sm text-white/70">
          Selected: {selected.toDateString()}
        </div>
      ) : null}
    </div>
  );
}
