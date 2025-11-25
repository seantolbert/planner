import { Cake, Cat, List, Play } from "lucide-react";

import type { SoftcalEvent } from "../softcal-types";

export const softcalEvents: SoftcalEvent[] = [
  {
    dateLabel: "June 15",
    title: "Tommy's birthday",
    description: " ",
    bgClass: "bg-[#2a1d2c]",
    textClass: "text-[#f3aac8]",
    Icon: Cake,
  },
  {
    dateLabel: "June 13",
    title: "Veterinary",
    description: " ",
    bgClass: "bg-[#1f2c23]",
    textClass: "text-[#8bd49c]",
    Icon: Cat,
  },
  {
    dateLabel: "June 17",
    title: "Meetings with manager",
    description: " ",
    bgClass: "bg-[#1c2634]",
    textClass: "text-[#88b4ff]",
    Icon: List,
  },
  {
    dateLabel: "June 16",
    title: "Watch course...",
    description: " ",
    bgClass: "bg-[#2d241c]",
    textClass: "text-[#f0b877]",
    Icon: Play,
  },
];
