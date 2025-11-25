import type { ReactNode } from "react";
import { X } from "lucide-react";

interface SoftcalBottomSheetProps {
  open: boolean;
  title?: string | null;
  onClose: () => void;
  children: ReactNode;
}

export function SoftcalBottomSheet({
  open,
  title,
  onClose,
  children,
}: SoftcalBottomSheetProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-[#0f1724] text-white shadow-[0_-16px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out min-h-[90vh]"
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-lg font-semibold">{title ?? ""}</div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 pb-8 text-sm text-white/70">{children}</div>
      </div>
    </div>
  );
}
