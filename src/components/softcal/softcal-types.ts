import type { LucideIcon } from "lucide-react";

export type TaskFrequency = "daily" | "weekly" | "monthly" | "one-off";

export interface SoftcalTask {
  id: string;
  title: string;
  frequency: TaskFrequency;
  done: boolean;
}

export interface SoftcalEvent {
  dateLabel: string;
  title: string;
  description?: string;
  bgClass: string;
  textClass?: string;
  Icon: LucideIcon;
}

export interface DayButton {
  label: string;
  weekday?: string;
  key: string;
  date: Date;
}
