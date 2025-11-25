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
import { EventForm } from "./event-form";
import { SoftcalDateSelector } from "./softcal-date-selector";
import { ListModal } from "./list-modal";
import { NoteForm } from "./note-form";
import { SoftcalBottomSheet } from "./softcal-bottom-sheet";
import { SoftcalTaskPanel } from "./softcal-task-panel";
import { TaskForm } from "./task-form";
import type { SoftcalTask } from "./softcal-types";
import { useSoftcalDates } from "./hooks/use-softcal-dates";
import { useSoftcalTasks } from "./hooks/use-softcal-tasks";
import { useEventForm } from "./hooks/use-event-form";
import { useNoteForm } from "./hooks/use-note-form";
import { useTaskForm } from "./hooks/use-task-form";

export function SoftcalScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Events" | "Notes" | "Orders">(
    "Orders"
  );

  const { state: noteState, actions: noteActions } = useNoteForm([
    "Inbox",
    "Work",
    "Personal",
  ]);

  const { state: taskState, actions: taskActions } = useTaskForm();

  const { state: eventState, actions: eventActions } = useEventForm();

  const {
    dayButtons,
    activeIndex,
    setActiveIndex,
    monthLabel,
    headerTitle,
    highlight,
    containerRef,
    buttonRefs,
  } = useSoftcalDates();

  const {
    topTasks,
    showAll,
    toggleShowAll,
    totalTasks,
    completedTasks,
    completionRatio,
    handleHoldStart,
    handleHoldEnd,
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
        holdingId={holdingId}
        taskColorStyles={taskColorStyles}
        cardRef={cardRef}
        computedMaxHeight={computedMaxHeight}
        isFirstDay={activeIndex === 0}
        isLastDay={activeIndex === dayButtons.length - 1}
      />

      <div className="w-full max-w-5xl mb-4">
        <div className="flex w-full items-center justify-between gap-2">
          {[
            { label: "Orders", Icon: Package },
            { label: "Notes", Icon: StickyNote },
            { label: "Events", Icon: Calendar },
          ].map(({ label, Icon }) => {
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(label as typeof activeTab)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition border ${
                  isActive
                    ? "border-[#7cc5ff] bg-[#7cc5ff]/10 text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                    : "border-white/10 bg-[#141c2a] text-white/70 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "Events" ? (
        <>
          <div className="w-full max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <CalendarWidget events={[]} />
            </div>
          </div>
        </>
      ) : null}

      {activeTab === "Notes" ? (
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
          Notes tab content coming soon.
        </div>
      ) : null}

      {activeTab === "Orders" ? (
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
          Orders tab content coming soon.
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
