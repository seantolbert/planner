import { X } from "lucide-react";

interface ListModalProps {
  open: boolean;
  newListName: string;
  onChangeNewList: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export function ListModal({
  open,
  newListName,
  onChangeNewList,
  onSave,
  onClose,
}: ListModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-[#0f1724] text-white shadow-[0_18px_44px_rgba(0,0,0,0.45)] border border-white/10 p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-base font-semibold">Create new list</div>
          <button
            type="button"
            aria-label="Close list modal"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            value={newListName}
            onChange={(event) => onChangeNewList(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
            placeholder="List name"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg bg-gradient-to-r from-[#7cc5ff] to-[#4a9be0] px-4 py-2 text-sm font-semibold text-[#0b111a] shadow-[0_10px_24px_rgba(0,0,0,0.3)] hover:brightness-110 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
