"use client";

import { useState } from "react";
import { Calendar, CheckSquare2, Package, StickyNote } from "lucide-react";

import { CalendarWidget } from "./calendar-widget";
import {
  placeholderCalendarEvents,
  placeholderNotes,
  placeholderOrders,
  placeholderOrderDetails,
} from "./data/placeholders";
import { EventForm } from "./event-form";
import { SoftcalDateSelector } from "./softcal-date-selector";
import { ListModal } from "./list-modal";
import { NoteForm } from "./note-form";
import { SoftcalBottomSheet } from "./softcal-bottom-sheet";
import { SoftcalTaskPanel } from "./softcal-task-panel";
import { TaskForm } from "./task-form";
import type { SoftcalTask } from "./softcal-types";
import type { PlaceholderNote, PlaceholderOrderDetail } from "./data/placeholders";
import type { CalendarEvent } from "./calendar-widget";
import { useSoftcalDates } from "./hooks/use-softcal-dates";
import { useSoftcalTasks } from "./hooks/use-softcal-tasks";
import { useEventForm } from "./hooks/use-event-form";
import { useNoteForm } from "./hooks/use-note-form";
import { useTaskForm } from "./hooks/use-task-form";

// High-level container that wires data hooks, tab state, and modal orchestration for Softcal.
export function SoftcalScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "Events" | "Notes" | "Orders" | "Tracking"
  >("Orders");

  const { state: noteState, actions: noteActions } = useNoteForm([
    "Inbox",
    "Work",
    "Personal",
  ]);

  const { state: taskState, actions: taskActions } = useTaskForm();

  const { state: eventState, actions: eventActions } = useEventForm();
  const colorHexMap: Record<string, string> = {
    blue: "#7cc5ff",
    orange: "#f7a700",
    green: "#99c66d",
    yellow: "#f9e900",
  };

  const { dayButtons, activeIndex, setActiveIndex, selectedDate } = useSoftcalDates();
  const [eventModalDate, setEventModalDate] = useState<Date>(selectedDate);

  const {
    topTasks,
    showAll,
    toggleShowAll,
    totalTasks,
    completedTasks,
    completionRatio,
    handleHoldStart,
    handleHoldEnd,
    consumeHoldCompleted,
    holdingId,
    taskColorStyles,
    cardRef,
    computedMaxHeight,
  } = useSoftcalTasks();

  // Quick actions feed the modal sheet for creating entries.
  const fabActions = [
    { label: "Event", Icon: Calendar },
    { label: "Note", Icon: StickyNote },
    { label: "Task", Icon: CheckSquare2 },
  ];

  const openModal = (label: string) => {
    setActiveModal(label);
    setFabOpen(false);
  };

  const closeModal = () => setActiveModal(null);
  const isModalOpen = Boolean(activeModal);

  const handleTaskSelect = (task: SoftcalTask) => {
    taskActions.setTitle(task.title);
    taskActions.setNotes("");
    taskActions.setFrequency(task.frequency);
    taskActions.setNoteRef("");
    taskActions.setOrderRef("");
    taskActions.setEventRef("");
    setActiveModal("Task");
    setFabOpen(false);
  };

  const handleNoteSelect = (note: PlaceholderNote) => {
    noteActions.setTitle(note.title);
    noteActions.setContent(note.content);
    setActiveModal("Note");
    setFabOpen(false);
  };

  const handleOrderSelect = (_order: PlaceholderOrderDetail) => {
    // Placeholder: in future, populate order modal. For now, do nothing.
  };

  const selectedDayEvents = placeholderCalendarEvents.filter(
    (event) =>
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );
  const selectedDayOrders =
    placeholderOrders.find(
      (order) =>
        order.date.getFullYear() === selectedDate.getFullYear() &&
        order.date.getMonth() === selectedDate.getMonth() &&
        order.date.getDate() === selectedDate.getDate()
    )?.count ?? 0;
  const eventModalEvents = placeholderCalendarEvents.filter(
    (event) =>
      event.date.getFullYear() === eventModalDate.getFullYear() &&
      event.date.getMonth() === eventModalDate.getMonth() &&
      event.date.getDate() === eventModalDate.getDate()
  );
  const eventModalDateLabel = eventModalDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const toDateTimeLocal = (date: Date, time?: string) => {
    const iso = new Date(date);
    if (time) {
      const [h = "0", m = "0"] = time.split(":");
      iso.setHours(Number(h), Number(m), 0, 0);
    }
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${iso.getFullYear()}-${pad(iso.getMonth() + 1)}-${pad(
      iso.getDate()
    )}T${pad(iso.getHours())}:${pad(iso.getMinutes())}`;
  };

  const handleDayEventSelect = (event: CalendarEvent) => {
    eventActions.setTitle(event.title);
    eventActions.setStart(toDateTimeLocal(event.date, event.startTime));
    eventActions.setEnd(toDateTimeLocal(event.date, event.endTime));
    eventActions.setNotes(event.notes ?? "");
    eventActions.setAllDay(false);
    eventActions.setColor(colorHexMap[event.color ?? ""] ?? "#7cc5ff");
    eventActions.setLink("");
    setActiveModal("Event");
  };

  // Build modal body dynamically; the bottom sheet reads this single entry point.
  let modalContent: JSX.Element | null = null;

  if (activeModal === "Note") {
    modalContent = (
      <NoteForm
        title={noteState.title}
        content={noteState.content}
        list={noteState.list}
        listOptions={noteState.listOptions}
        onChangeTitle={noteActions.setTitle}
        onChangeContent={noteActions.setContent}
        onChangeList={noteActions.setList}
        onOpenListModal={noteActions.openListModal}
      />
    );
  } else if (activeModal === "Task") {
    modalContent = (
      <TaskForm
        title={taskState.title}
        notes={taskState.notes}
        frequency={taskState.frequency}
        noteRef={taskState.noteRef}
        orderRef={taskState.orderRef}
        eventRef={taskState.eventRef}
        onChangeTitle={taskActions.setTitle}
        onChangeNotes={taskActions.setNotes}
        onChangeFrequency={taskActions.setFrequency}
        onChangeNoteRef={taskActions.setNoteRef}
        onChangeOrderRef={taskActions.setOrderRef}
        onChangeEventRef={taskActions.setEventRef}
      />
    );
  } else if (activeModal === "Event") {
    modalContent = (
      <EventForm
        title={eventState.title}
        start={eventState.start}
        end={eventState.end}
        notes={eventState.notes}
        allDay={eventState.allDay}
        color={eventState.color}
        link={eventState.link}
        onChangeTitle={eventActions.setTitle}
        onChangeStart={eventActions.setStart}
        onChangeEnd={eventActions.setEnd}
        onChangeNotes={eventActions.setNotes}
        onToggleAllDay={eventActions.setAllDay}
        onChangeColor={eventActions.setColor}
        onChangeLink={eventActions.setLink}
      />
    );
  } else if (activeModal === "Day Events") {
    modalContent = (
      <div className="space-y-3">
        <div className="text-sm font-semibold text-white/80">
          {eventModalDateLabel}
        </div>
        {eventModalEvents.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            No events today
          </div>
        ) : (
          <div className="space-y-2">
            {eventModalEvents.map((event, idx) => (
              <button
                key={`${event.title}-${idx}`}
                type="button"
                onClick={() => handleDayEventSelect(event)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white hover:bg-white/10 transition"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor:
                      colorHexMap[event.color ?? ""] ?? "#7cc5ff",
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-white/70">
                    {event.startTime ?? "—"} - {event.endTime ?? "—"}
                  </span>
                  {event.notes ? (
                    <span className="text-white/60 text-xs">{event.notes}</span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b flex flex-col items-center px-4 text-white">
      <div className="w-full max-w-5xl mb-4">
        <div className="flex w-full items-center justify-between gap-2">
          {[
            { key: "Orders", Icon: Package },
            { key: "Notes", Icon: StickyNote },
            { key: "Events", Icon: Calendar },
            { key: "Tracking", Icon: CheckSquare2 },
          ].map(({ key, Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`flex items-center justify-center rounded-full p-3 text-sm font-semibold transition border ${
                  isActive
                    ? "border-[#7cc5ff] bg-[#7cc5ff]/10 text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                    : "border-white/10 bg-[#141c2a] text-white/70 hover:text-white"
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "Notes" ? (
        <div className="grid grid-cols-2 gap-4 w-full max-w-5xl mx-auto">
          {placeholderNotes.slice(0, 6).map((note, idx) => (
            <div
              key={`${note.title}-${idx}`}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 cursor-pointer hover:bg-white/10 transition"
              onClick={() => handleNoteSelect(note)}
            >
              <div className="text-white font-semibold">{note.title}</div>
              <div className="text-white/70 text-sm">{note.content}</div>
              {note.link ? (
                <div className="text-[#7cc5ff] text-sm mt-1">{note.link}</div>
              ) : null}
              <div className="mt-2 text-[11px] text-white/50">
                Created: {note.createdAt} • Updated: {note.updatedAt}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === "Orders" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full max-w-5xl mx-auto">
          {placeholderOrderDetails.map((order, idx) => (
            <div
              key={`${order.orderNumber}-${idx}`}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80"
            >
              <div className="text-white font-semibold">{order.title}</div>
              <div className="text-white/70 text-sm">Order #: {order.orderNumber}</div>
              <div className="text-white/70 text-sm">Purchased: {order.purchaseDate}</div>
              <div className="text-white/70 text-sm">Ship by: {order.shipByDate}</div>
              {order.notes ? (
                <div className="text-white/60 text-sm mt-1">{order.notes}</div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === "Tracking" ? (
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
          Tracking tab content coming soon.
        </div>
      ) : null}

      <SoftcalBottomSheet
        open={isModalOpen}
        title={activeModal}
        onClose={closeModal}
      >
        {modalContent ?? (
          <div>
            This is placeholder content for the{" "}
            {activeModal?.toLowerCase() ?? "selected"} modal.
          </div>
        )}
      </SoftcalBottomSheet>

      <ListModal
        open={noteState.showListModal}
        newListName={noteState.newListName}
        onChangeNewList={noteActions.setNewListName}
        onSave={noteActions.handleAddList}
        onClose={noteActions.closeListModal}
      />
    </div>
  );
}
