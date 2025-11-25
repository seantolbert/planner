export function SoftcalTimeframeToggle() {
  return (
    <div className="mb-4 flex items-center gap-3 text-sm font-semibold w-full max-w-5xl">
      <button
        className="rounded-full bg-white px-4 py-2 text-[#0f1621] shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
        type="button"
      >
        Week
      </button>
      <button
        className="rounded-full border border-white/10 bg-[#141c2a] px-4 py-2 text-white/70"
        type="button"
      >
        Month
      </button>
      <button
        className="rounded-full border border-white/10 bg-[#141c2a] px-4 py-2 text-white/70"
        type="button"
      >
        Year
      </button>
    </div>
  );
}
