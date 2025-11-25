"use client";

import { useState } from "react";
import {
  Calendar,
  CheckSquare2,
  Package,
  Plus,
  StickyNote,
} from "lucide-react";

import { CalendarWidget } from "./calendar-widget";
import {
  placeholderCalendarEvents,
  placeholderNotes,
  placeholderOrders,
} from "./data/placeholders";
import { EventForm } from "./event-form";
import { SoftcalDateSelector } from "./softcal-date-selector";
import { ListModal } from "./list-modal";
import { NoteForm } from "./note-form";
import { SoftcalBottomSheet } from "./softcal-bottom-sheet";
import { SoftcalTaskPanel } from "./softcal-task-panel";
import { TaskForm } from "./task-form";
import type { SoftcalTask } from "./softcal-types";
import type { PlaceholderNote } from "./data/placeholders";
import type { CalendarEvent } from "./calendar-widget";
import { useSoftcalDates } from "./hooks/use-softcal-dates";
import { useSoftcalTasks } from "./hooks/use-softcal-tasks";
import { useEventForm } from "./hooks/use-event-form";
import { useNoteForm } from "./hooks/use-note-form";
import { useTaskForm } from "./hooks/use-task-form";

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

  const {
    dayButtons,
    activeIndex,
    setActiveIndex,
    monthLabel,
    headerTitle,
    selectedDate,
    highlight,
    containerRef,
    buttonRefs,
  } = useSoftcalDates();
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
    noteActions.setLink(note.link ?? "");
    setActiveModal("Note");
    setFabOpen(false);
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

  let modalContent: JSX.Element | null = null;

  if (activeModal === "Note") {
    modalContent = (
      <NoteForm
        title={noteState.title}
        content={noteState.content}
        link={noteState.link}
        list={noteState.list}
        listOptions={noteState.listOptions}
        onChangeTitle={noteActions.setTitle}
        onChangeContent={noteActions.setContent}
        onChangeLink={noteActions.setLink}
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
      <SoftcalDateSelector
        monthLabel={monthLabel}
        dayButtons={dayButtons}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        highlight={highlight}
        containerRef={containerRef}
        buttonRefs={buttonRefs}
      />

      <SoftcalTaskPanel
        headerTitle={headerTitle}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        completionRatio={completionRatio}
        topTasks={topTasks}
        showAll={showAll}
        onToggleShowAll={toggleShowAll}
        onHoldStart={handleHoldStart}
        onHoldEnd={handleHoldEnd}
        onSelectTask={handleTaskSelect}
        shouldIgnoreClick={(id) => consumeHoldCompleted(id)}
        holdingId={holdingId}
        taskColorStyles={taskColorStyles}
        cardRef={cardRef}
        computedMaxHeight={computedMaxHeight}
        isFirstDay={activeIndex === 0}
        isLastDay={activeIndex === dayButtons.length - 1}
        rightButtonLabel={
          selectedDayEvents.length
            ? `${selectedDayEvents.length} event${
                selectedDayEvents.length === 1 ? "" : "s"
              }`
            : "No events today"
        }
        rightBottomLabel={`${selectedDayOrders} order${
          selectedDayOrders === 1 ? "" : "s"
        }`}
        onRightButtonClick={() => {
          setEventModalDate(selectedDate);
          setActiveModal("Day Events");
        }}
      />

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

      {activeTab === "Events" ? (
        <>
          <div className="w-full max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <CalendarWidget
                events={placeholderCalendarEvents}
                onDaySelect={(date) => {
                  setEventModalDate(date);
                  setActiveModal("Day Events");
                  // sync the date selector with calendar tap
                  const matchIndex = dayButtons.findIndex(
                    (d) =>
                      d.date.getFullYear() === date.getFullYear() &&
                      d.date.getMonth() === date.getMonth() &&
                      d.date.getDate() === date.getDate()
                  );
                  if (matchIndex >= 0) {
                    setActiveIndex(matchIndex);
                  }
                }}
              />
            </div>
          </div>
        </>
      ) : null}

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
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
          Orders tab content coming soon.
        </div>
      ) : null}

      {activeTab === "Tracking" ? (
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
          Tracking tab content coming soon.
        </div>
      ) : null}

      <div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">
        <div className="relative w-14">
          {fabActions.map((action, index) => {
            const offset = (index + 1) * 60;
            const Icon = action.Icon;
            return (
              <button
                key={action.label}
                type="button"
                aria-label={action.label}
                className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#182235] border border-white/30 text-white shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out hover:scale-[1.03]"
                style={{
                  bottom: fabOpen ? `${offset}px` : "0px",
                  opacity: fabOpen ? 1 : 0,
                  pointerEvents: fabOpen ? "auto" : "none",
                }}
                onClick={() => openModal(action.label)}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle quick actions"
          onClick={() => setFabOpen((prev) => !prev)}
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7cc5ff] to-[#4a9be0] text-[#0b111a] shadow-[0_14px_38px_rgba(0,0,0,0.35)] border border-white/40 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ${
            fabOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

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
