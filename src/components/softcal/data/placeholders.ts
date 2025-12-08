import type { CalendarEvent } from "../calendar-widget";

export interface PlaceholderOrder {
  date: Date;
  count: number;
}

export interface PlaceholderOrderDetail {
  title: string;
  purchaseDate: string;
  shipByDate: string;
  orderNumber: string;
  notes?: string;
}

export interface PlaceholderNote {
  title: string;
  content: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export const placeholderCalendarEvents: CalendarEvent[] = [
  {
    title: "Product roadmap sync",
    date: new Date(2025, 10, 3),
    color: "blue",
    startTime: "09:00",
    endTime: "10:00",
    notes: "Finalize Q1 priorities",
  },
  {
    title: "Team offsite kickoff",
    date: new Date(2025, 10, 5),
    color: "orange",
    startTime: "11:00",
    endTime: "12:00",
    notes: "Prep agenda and travel",
  },
  {
    title: "Design review",
    date: new Date(2025, 10, 8),
    color: "green",
    startTime: "14:00",
    endTime: "15:00",
    notes: "UI polish for launch",
  },
  {
    title: "Customer demo",
    date: new Date(2025, 10, 10),
    color: "yellow",
    startTime: "10:30",
    endTime: "11:15",
    notes: "Show new dashboard",
  },
  {
    title: "Content planning",
    date: new Date(2025, 10, 12),
    color: "blue",
    startTime: "13:00",
    endTime: "14:00",
    notes: "Blog + email calendar",
  },
  {
    title: "Sprint retro",
    date: new Date(2025, 10, 15),
    color: "orange",
    startTime: "16:00",
    endTime: "17:00",
    notes: "Wins + improvements",
  },
  {
    title: "Budget check-in",
    date: new Date(2025, 10, 18),
    color: "green",
    startTime: "09:30",
    endTime: "10:15",
    notes: "Capex review",
  },
  {
    title: "Hiring panel",
    date: new Date(2025, 10, 21),
    color: "yellow",
    startTime: "15:00",
    endTime: "16:30",
    notes: "Frontend candidate",
  },
  {
    title: "Partner sync",
    date: new Date(2025, 10, 25),
    color: "blue",
    startTime: "11:30",
    endTime: "12:15",
    notes: "API alignment",
  },
  {
    title: "Release launch",
    date: new Date(2025, 10, 28),
    color: "orange",
    startTime: "08:00",
    endTime: "09:00",
    notes: "Go/no-go + rollout",
  },
];

export const placeholderOrders: PlaceholderOrder[] = [
  { date: new Date(2025, 10, 3), count: 12 },
  { date: new Date(2025, 10, 5), count: 4 },
  { date: new Date(2025, 10, 8), count: 9 },
  { date: new Date(2025, 10, 10), count: 6 },
  { date: new Date(2025, 10, 12), count: 3 },
  { date: new Date(2025, 10, 15), count: 11 },
  { date: new Date(2025, 10, 18), count: 7 },
  { date: new Date(2025, 10, 21), count: 5 },
  { date: new Date(2025, 10, 25), count: 8 },
  { date: new Date(2025, 10, 28), count: 10 },
];

export const placeholderOrderDetails: PlaceholderOrderDetail[] = [
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-01",
    shipByDate: "2025-11-08",
    orderNumber: "CB-10231",
    notes: "Please add juice groove and soft feet.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-02",
    shipByDate: "2025-11-09",
    orderNumber: "CB-10232",
    notes: "Gift wrap requested.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-03",
    shipByDate: "2025-11-11",
    orderNumber: "CB-10233",
    notes: "Engrave initials J&M on the bottom right.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-04",
    shipByDate: "2025-11-12",
    orderNumber: "CB-10234",
    notes: "Prefers darker walnut center strip.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-05",
    shipByDate: "2025-11-13",
    orderNumber: "CB-10235",
    notes: "No handle cutouts; add rubber feet.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-06",
    shipByDate: "2025-11-14",
    orderNumber: "CB-10236",
    notes: "Match Berner Studio profile-2 edge.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-07",
    shipByDate: "2025-11-15",
    orderNumber: "CB-10237",
    notes: "Include care card; no engraving.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-08",
    shipByDate: "2025-11-16",
    orderNumber: "CB-10238",
    notes: "Rush order if possible.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-09",
    shipByDate: "2025-11-17",
    orderNumber: "CB-10239",
    notes: "Roundover edge, maple-heavy pattern.",
  },
  {
    title: "Custom Cutting Board",
    purchaseDate: "2025-11-10",
    shipByDate: "2025-11-18",
    orderNumber: "CB-10240",
    notes: "Ship to office address; contact before delivery.",
  },
];

export const placeholderNotes: PlaceholderNote[] = [
  {
    title: "Meeting recap",
    content: "Summarize action items from weekly sync.",
    createdAt: "2025-11-01T09:00:00Z",
    updatedAt: "2025-11-02T10:00:00Z",
  },
  {
    title: "Design ideas",
    content: "Draft hero layout concepts for landing page.",
    createdAt: "2025-11-02T09:00:00Z",
    updatedAt: "2025-11-02T11:30:00Z",
  },
  {
    title: "User interview",
    content: "Notes from call with beta user.",
    createdAt: "2025-11-03T08:30:00Z",
    updatedAt: "2025-11-03T09:45:00Z",
  },
  {
    title: "Copy tweaks",
    content: "Polish onboarding microcopy.",
    createdAt: "2025-11-04T10:00:00Z",
    updatedAt: "2025-11-04T12:15:00Z",
  },
  {
    title: "Bug triage",
    content: "List of top issues to verify.",
    createdAt: "2025-11-05T07:45:00Z",
    updatedAt: "2025-11-05T08:30:00Z",
  },
  {
    title: "Release checklist",
    content: "Pre-launch steps for upcoming release.",
    createdAt: "2025-11-06T09:15:00Z",
    updatedAt: "2025-11-06T10:00:00Z",
  },
  {
    title: "Partner notes",
    content: "Talking points for partner sync.",
    createdAt: "2025-11-07T11:00:00Z",
    updatedAt: "2025-11-07T11:40:00Z",
  },
  {
    title: "Content backlog",
    content: "Topics for November blog posts.",
    createdAt: "2025-11-08T14:00:00Z",
    updatedAt: "2025-11-08T15:00:00Z",
  },
  {
    title: "Research links",
    content: "Useful references for dashboard UX.",
    createdAt: "2025-11-09T13:30:00Z",
    updatedAt: "2025-11-09T14:10:00Z",
  },
  {
    title: "Retro highlights",
    content: "What went well and improve items.",
    createdAt: "2025-11-10T16:00:00Z",
    updatedAt: "2025-11-10T16:30:00Z",
  },
];
