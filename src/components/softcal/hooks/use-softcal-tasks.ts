import { useEffect, useMemo, useRef, useState } from "react";

import { placeholderTasks } from "../data/tasks";
import type { SoftcalTask, TaskFrequency } from "../softcal-types";

const fallbackCollapsedHeight = 340;
const fallbackExpandedHeight = 900;

const defaultTaskColorStyles: Record<TaskFrequency | string, string> = {
  daily: "border-red-400/30 bg-red-500/10 text-red-50",
  weekly: "border-green-400/30 bg-green-500/10 text-green-50",
  monthly: "border-purple-400/30 bg-purple-500/10 text-purple-50",
  "one-off": "border-white/10 bg-white/5 text-white/80",
};

type BaseTask = { title: string; frequency: TaskFrequency };

export function useSoftcalTasks(initialTasks: BaseTask[] = placeholderTasks) {
  const [tasks, setTasks] = useState<SoftcalTask[]>(() =>
    initialTasks.map((task, index) => ({
      id: `task-${index}`,
      title: task.title,
      frequency: task.frequency,
      done: false,
    }))
  );

  const [showAll, setShowAll] = useState(false);
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdCompletedId = useRef<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  const topTasks = useMemo(
    () => (showAll ? tasks : tasks.slice(0, 3)),
    [showAll, tasks]
  );

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );

  const totalTasks = tasks.length;
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );
  const completionRatio = totalTasks ? completedTasks / totalTasks : 0;

  const handleHoldStart = (id: string) => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
    holdCompletedId.current = null;
    setHoldingId(id);
    holdTimeout.current = setTimeout(() => {
      toggleTask(id);
      holdTimeout.current = null;
      setHoldingId(null);
      holdCompletedId.current = id;
    }, 1000);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    setHoldingId(null);
  };

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const height = node.scrollHeight;
    if (showAll) {
      setExpandedHeight(height);
    } else {
      setCollapsedHeight(height);
    }
  }, [showAll, tasks.length, completedTasks]);

  const computedMaxHeight = showAll
    ? expandedHeight ?? collapsedHeight ?? fallbackExpandedHeight
    : collapsedHeight ?? expandedHeight ?? fallbackCollapsedHeight;

  return {
    tasks,
    topTasks,
    showAll,
    toggleShowAll: () => setShowAll((prev) => !prev),
    totalTasks,
    completedTasks,
    completionRatio,
    handleHoldStart,
    handleHoldEnd,
    consumeHoldCompleted: (id: string) => {
      if (holdCompletedId.current === id) {
        holdCompletedId.current = null;
        return true;
      }
      return false;
    },
    holdingId,
    taskColorStyles: defaultTaskColorStyles,
    cardRef,
    computedMaxHeight,
  };
}
