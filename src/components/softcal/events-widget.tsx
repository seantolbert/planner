"use client";

import { Calendar } from "lucide-react";

import { placeholderCalendarEvents } from "./data/placeholders";
import type { CalendarEvent } from "./calendar-widget";

function parseEventDateTime(event: CalendarEvent) {
  const base = new Date(event.date);
  if (event.startTime) {
    const [h = "0", m = "0"] = event.startTime.split(":");
    base.setHours(Number(h), Number(m), 0, 0);
  }
  return base;
}

// Events widget: left shows today, right shows upcoming soonest two.
export function EventsWidget() {
  const today = new Date();
  const todayEvents = placeholderCalendarEvents.filter(
    (ev) =>
      ev.date.getFullYear() === today.getFullYear() &&
      ev.date.getMonth() === today.getMonth() &&
      ev.date.getDate() === today.getDate()
  );

  const upcoming = [...placeholderCalendarEvents]
    .sort(
      (a, b) =>
        parseEventDateTime(a).getTime() - parseEventDateTime(b).getTime()
    )
    .slice(0, 2);

  const monthLabel = today.toLocaleString("en-US", { month: "short" });
  const dayNum = today.getDate();
  const weekday = today.toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="group relative flex overflow-hidden rounded-3xl border border-[#7cc5ff]/70 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#7cc5ff]/25 to-[#4a9be0]/10"
        aria-hidden
      />
      <div className="relative flex w-full flex-col-2 gap-3 md:flex-row">
        <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#7cc5ff] to-[#4a9be0] p-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide opacity-80">
                Today
              </div>
              <div className="text-3xl font-bold leading-tight">
                {monthLabel}
              </div>
              <div className="text-5xl font-black leading-none">{dayNum}</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/90">
            {weekday} • {todayEvents.length} event
            {todayEvents.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-evenly rounded-2xl p-1 text-white/90">
          <div className="text-sm font-semibold text-white">Upcoming</div>
          <div className="space-y-2">
            {upcoming.map((event, idx) => {
              const start = event.startTime ?? "";
              const end = event.endTime ?? "";
              return (
                <div
                  key={`${event.title}-${idx}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-xs">
                      {event.title}
                    </span>
                    <span className="text-xs text-white/70">
                      {start} {start && end ? "–" : ""} {end}
                    </span>
                  </div>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        event.color === "orange"
                          ? "#f7a700"
                          : event.color === "green"
                          ? "#99c66d"
                          : event.color === "yellow"
                          ? "#f9e900"
                          : "#7cc5ff",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
