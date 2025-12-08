import { Calendar, CheckSquare2, LayoutDashboard, Package, StickyNote } from "lucide-react";

export const softcalNavItems = [
  { label: "Overview", Icon: LayoutDashboard, href: "/softcal" },
  { label: "Calendar", Icon: Calendar, href: "/softcal/calendar" },
  { label: "Tasks", Icon: CheckSquare2, href: "/softcal/tasks" },
  { label: "Notes", Icon: StickyNote, href: "/softcal/notes" },
  { label: "Orders", Icon: Package, href: "/softcal/orders" },
];
