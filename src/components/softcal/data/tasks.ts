import type { TaskFrequency } from "../softcal-types";

type PlaceholderTask = { title: string; frequency: TaskFrequency };

export const placeholderTasks: PlaceholderTask[] = [
  { title: "Review design handoff for mobile app", frequency: "weekly" },
  { title: "Prepare slides for weekly sync", frequency: "weekly" },
  { title: "Draft email copy for campaign", frequency: "daily" },
  { title: "Outline blog post on UI patterns", frequency: "weekly" },
  { title: "Refine onboarding checklist", frequency: "monthly" },
  { title: "Update component library docs", frequency: "monthly" },
  { title: "Schedule usability sessions", frequency: "weekly" },
  { title: "Compile analytics snapshot", frequency: "daily" },
  { title: "Groom backlog with PM", frequency: "weekly" },
  { title: "Plan content calendar for Q3", frequency: "one-off" },
];
