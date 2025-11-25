import { Plus } from "lucide-react";

interface NoteFormProps {
  title: string;
  content: string;
  link: string;
  list: string;
  listOptions: string[];
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onChangeLink: (value: string) => void;
  onChangeList: (value: string) => void;
  onOpenListModal: () => void;
}

export function NoteForm({
  title,
  content,
  link,
  list,
  listOptions,
  onChangeTitle,
  onChangeContent,
  onChangeLink,
  onChangeList,
  onOpenListModal,
}: NoteFormProps) {
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
          placeholder="Add a title"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Content
        </label>
        <textarea
          value={content}
          onChange={(event) => onChangeContent(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-[#7cc5ff] focus:outline-none min-h-[180px]"
          placeholder="Write your note..."
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
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          List
        </label>
        <div className="flex items-center gap-2">
          <select
            value={list}
            onChange={(event) => onChangeList(event.target.value)}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white focus:border-[#7cc5ff] focus:outline-none"
          >
            {listOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onOpenListModal}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
            aria-label="Add list"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#7cc5ff] to-[#4a9be0] px-4 py-2 text-sm font-semibold text-[#0b111a] shadow-[0_10px_24px_rgba(0,0,0,0.3)] hover:brightness-110 transition"
        >
          Save note
        </button>
      </div>
    </form>
  );
}
