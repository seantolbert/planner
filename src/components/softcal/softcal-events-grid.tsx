import { EventCard } from "./event-card";
import type { SoftcalEvent } from "./softcal-types";

interface SoftcalEventsGridProps {
  events: SoftcalEvent[];
}

export function SoftcalEventsGrid({ events }: SoftcalEventsGridProps) {
  return (
    <div className="grid w-full max-w-5xl grid-cols-2 gap-3">
      {events.map((event) => (
        <EventCard key={event.title} {...event} />
      ))}
    </div>
  );
}
