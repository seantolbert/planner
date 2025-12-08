import type { ReactNode } from "react";
import { SoftcalShell } from "@/components/softcal/softcal-shell";

export default function SoftcalLayout({ children }: { children: ReactNode }) {
  return <SoftcalShell>{children}</SoftcalShell>;
}
