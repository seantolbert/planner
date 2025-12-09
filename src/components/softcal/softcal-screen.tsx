"use client";

import { useEffect } from "react";

import { EventsWidget } from "./events-widget";
import { DashboardNotesWidget } from "./dashboard-notes-widget";
import { OrdersWidget } from "./orders-widget";
import { TasksWidget } from "./tasks-widget";
import { SummaryWidget } from "./summary-widget";

// Home screen dashboard
export function HomeScreen() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0b111a] to-[#0f1522] flex flex-col items-center px-2 text-white">
      <div className="flex w-full max-w-5xl flex-col gap-3">
        <SummaryWidget />
        <div className="grid grid-cols-1 gap-3">
          <TasksWidget />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <DashboardNotesWidget />
          <OrdersWidget />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <EventsWidget />
        </div>
      </div>
    </div>
  );
}
