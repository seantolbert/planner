"use client";

import {
  placeholderCalendarEvents,
  placeholderOrders,
} from "@/components/softcal/data/placeholders";
import { SoftcalDateSelector } from "@/components/softcal/softcal-date-selector";
import { SoftcalTaskPanel } from "@/components/softcal/softcal-task-panel";
import { useSoftcalDates } from "@/components/softcal/hooks/use-softcal-dates";
import { useSoftcalTasks } from "@/components/softcal/hooks/use-softcal-tasks";

export default function TasksPage() {
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

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-4 text-white">
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
        onSelectTask={() => {}}
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
        onRightButtonClick={() => {}}
      />
    </div>
  );
}
