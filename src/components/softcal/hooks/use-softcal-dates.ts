import { useEffect, useMemo, useRef, useState } from "react";

import type { DayButton } from "../softcal-types";

interface HighlightState {
  left: number;
  width: number;
  height: number;
}

export function useSoftcalDates() {
  const today = useMemo(() => new Date(), []);

  const nextDays = useMemo<DayButton[]>(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index + 1);
        return {
          label: date.getDate().toString(),
          weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
          key: date.toISOString().slice(0, 10),
          date,
        };
      }),
    [today]
  );

  const dayButtons = useMemo<DayButton[]>(
    () => [
      {
        label: today.getDate().toString(),
        weekday: today.toLocaleDateString("en-US", { weekday: "short" }),
        key: "today",
        date: today,
      },
      ...nextDays,
    ],
    [nextDays, today]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [highlight, setHighlight] = useState<HighlightState>({
    left: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const computeHighlight = () => {
      const container = containerRef.current;
      const activeButton = buttonRefs.current[activeIndex];
      if (!container || !activeButton) return;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setHighlight({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    };

    computeHighlight();
    window.addEventListener("resize", computeHighlight);
    return () => window.removeEventListener("resize", computeHighlight);
  }, [activeIndex, dayButtons.length]);

  const selectedDate = dayButtons[activeIndex]?.date ?? today;

  const monthLabel = useMemo(
    () =>
      today.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
    [today]
  );

  const headerTitle = useMemo(
    () =>
      activeIndex === 0
        ? "Today"
        : selectedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
    [activeIndex, selectedDate]
  );

  const headerSubtitle = useMemo(
    () =>
      selectedDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      }),
    [selectedDate]
  );

  return {
    dayButtons,
    activeIndex,
    setActiveIndex,
    monthLabel,
    headerTitle,
    headerSubtitle,
    highlight,
    containerRef,
    buttonRefs,
    selectedDate,
  };
}
