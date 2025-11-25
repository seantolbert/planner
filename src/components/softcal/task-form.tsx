interface TaskFormProps {
  title: string;
  notes: string;
  frequency: string;
  noteRef: string;
  orderRef: string;
  eventRef: string;
  onChangeTitle: (value: string) => void;
  onChangeNotes: (value: string) => void;
  onChangeFrequency: (value: string) => void;
  onChangeNoteRef: (value: string) => void;
  onChangeOrderRef: (value: string) => void;
  onChangeEventRef: (value: string) => void;
}

export function TaskForm({
  title,
  notes,
  frequency,
  noteRef,
  orderRef,
  eventRef,
  onChangeTitle,
  onChangeNotes,
  onChangeFrequency,
  onChangeNoteRef,
  onChangeOrderRef,
  onChangeEventRef,
}: TaskFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(event) => onChangeTitle(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
          placeholder="Name this task"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(event) => onChangeNotes(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none min-h-[120px]"
          placeholder="Add any details..."
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Frequency
        </label>
        <select
          value={frequency}
          onChange={(event) => onChangeFrequency(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white focus:border-[#7cc5ff] focus:outline-none"
        >
          <option value="one-off">One off</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Note reference (optional)
        </label>
        <input
          type="text"
          value={noteRef}
          onChange={(event) => onChangeNoteRef(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
          placeholder="Link or note id"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Order reference (optional)
        </label>
        <input
          type="text"
          value={orderRef}
          onChange={(event) => onChangeOrderRef(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
          placeholder="Order id"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Event reference (optional)
        </label>
        <input
          type="text"
          value={eventRef}
          onChange={(event) => onChangeEventRef(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
          placeholder="Event id or name"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#7cc5ff] to-[#4a9be0] px-4 py-2 text-sm font-semibold text-[#0b111a] shadow-[0_10px_24px_rgba(0,0,0,0.3)] hover:brightness-110 transition"
        >
          Save task
        </button>
      </div>
    </form>
  );
}
