"use client";

import { EventsWidget } from "./events-widget";
import { DashboardNotesWidget } from "./dashboard-notes-widget";
import { OrdersWidget } from "./orders-widget";
import { TasksWidget } from "./tasks-widget";

// Home screen dashboard
export function HomeScreen() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0b111a] to-[#0f1522] flex flex-col items-center px-4 text-white">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-4">
          <TasksWidget />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          <DashboardNotesWidget />
          <OrdersWidget />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <EventsWidget />
        </div>
      </div>
    </div>
  );
}
