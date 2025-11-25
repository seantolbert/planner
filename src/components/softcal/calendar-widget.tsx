"use client";

import { useMemo, useState } from "react";

import "./calendar-widget.css";

type CalendarEvent = {
  title: string;
  date: Date;
  color?: "blue" | "orange" | "green" | "yellow";
  calendar?: string;
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfGrid(monthStart: Date) {
  const dayOfWeek = monthStart.getDay(); // 0 = Sunday
  const start = new Date(monthStart);
  start.setDate(monthStart.getDate() - dayOfWeek);
  return start;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + amount);
  return next;
}

export function CalendarWidget({ events = [] }: { events?: CalendarEvent[] }) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [animDirection, setAnimDirection] = useState<"next" | "prev" | null>(
    null
  );

  const monthStart = startOfMonth(currentMonth);
  const gridStart = startOfGrid(monthStart);

  const days = useMemo(() => {
    return Array.from({ length: 42 }, (_, index) => {
      const date = addDays(gridStart, index);
      return {
        date,
        isCurrentMonth: date.getMonth() === monthStart.getMonth(),
        isToday: isSameDay(date, today),
        events: events.filter((ev) => isSameDay(ev.date, date)),
      };
    });
  }, [events, gridStart, monthStart, today]);

  const weeks = useMemo(() => {
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  }, [days]);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedEvents = useMemo(
    () => events.filter((ev) => isSameDay(ev.date, selectedDay)),
    [events, selectedDay]
  );

  return (
    <div className="calendar-shell">
      <div className="calendar-root">
        <div className="calendar-header">
          <h1>{monthLabel}</h1>
          <div
            className="calendar-right"
            onClick={() => {
              setAnimDirection("next");
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
              );
            }}
          />
          <div
            className="calendar-left"
            onClick={() => {
              setAnimDirection("prev");
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
              );
            }}
          />
        </div>

        <div
          className={`month ${
            animDirection ? `in ${animDirection}` : "new"
          }`.trim()}
        >
          {weeks.map((week, weekIdx) => (
            <div className="week" key={`week-${weekIdx}`}>
              {week.map((day) => {
                const dayName = day.date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNumber = day.date
                  .getDate()
                  .toString()
                  .padStart(2, "0");
                return (
                  <div
                    key={day.date.toISOString()}
                    className={`day ${!day.isCurrentMonth ? "other" : ""} ${
                      day.isToday ? "today" : ""
                    }`}
                    onClick={() => {
                      setSelectedDay(day.date);
                    }}
                  >
                    <div className="day-name">{dayName}</div>
                    <div className="day-number">{dayNumber}</div>
                    <div className="day-events">
                      {day.events.map((ev, idx) => (
                        <span
                          key={`${day.date.toISOString()}-${idx}`}
                          className={ev.color ?? "blue"}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="details in">
          <div className="arrow" />
          <div className="events in">
            {selectedEvents.length === 0 ? (
              <div className="event empty">
                <span>No Events</span>
              </div>
            ) : (
              selectedEvents.map((ev, idx) => (
                <div className="event" key={`${ev.title}-${idx}`}>
                  <div className={`event-category ${ev.color ?? "blue"}`} />
                  <span>{ev.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
