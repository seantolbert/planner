interface EventFormProps {
  title: string;
  start: string;
  end: string;
  notes: string;
  allDay: boolean;
  color: string;
  link: string;
  onChangeTitle: (value: string) => void;
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
  onChangeNotes: (value: string) => void;
  onToggleAllDay: (value: boolean) => void;
  onChangeColor: (value: string) => void;
  onChangeLink: (value: string) => void;
}

export function EventForm({
  title,
  start,
  end,
  notes,
  allDay,
  color,
  link,
  onChangeTitle,
  onChangeStart,
  onChangeEnd,
  onChangeNotes,
  onToggleAllDay,
  onChangeColor,
  onChangeLink,
}: EventFormProps) {
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
          placeholder="Event name"
        />
      </div>
      {!allDay ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Start at
            </label>
            <input
              type="datetime-local"
              value={start}
              onChange={(event) => onChangeStart(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              End at
            </label>
            <input
              type="datetime-local"
              value={end}
              onChange={(event) => onChangeEnd(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
            />
          </div>
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={allDay}
            onChange={(event) => onToggleAllDay(event.target.checked)}
            className="h-4 w-4 rounded border-white/30 bg-transparent text-[#7cc5ff] focus:ring-0"
          />
          All day
        </label>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>Color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => onChangeColor(event.target.value)}
            className="h-8 w-8 rounded border border-white/20 bg-transparent p-0"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(event) => onChangeNotes(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none min-h-[120px]"
          placeholder="Add details..."
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Link (optional)
        </label>
        <input
          type="url"
          value={link}
          onChange={(event) => onChangeLink(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none"
          placeholder="https://example.com"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#7cc5ff] to-[#4a9be0] px-4 py-2 text-sm font-semibold text-[#0b111a] shadow-[0_10px_24px_rgba(0,0,0,0.3)] hover:brightness-110 transition"
        >
          Save event
        </button>
      </div>
    </form>
  );
}
