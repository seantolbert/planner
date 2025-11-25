import type { LucideIcon } from 'lucide-react';

interface EventCardProps {
  dateLabel: string;
  title: string;
  description?: string;
  bgClass: string;
  textClass?: string;
  Icon: LucideIcon;
}

export function EventCard({ dateLabel, title, description, bgClass, textClass, Icon }: EventCardProps) {
  return (
    <div
      className={`rounded-3xl p-4 shadow-[0_14px_32px_rgba(0,0,0,0.25)] border border-white/10 ${bgClass}`}
    >
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-white/70">
        <Icon size={20} className="text-white/65" />
      </div>
      <div className={`text-sm font-semibold ${textClass ?? 'text-white/75'}`}>{dateLabel}</div>
      <div className={`text-xl font-bold leading-snug ${textClass ?? 'text-white'}`}>{title}</div>
      {description ? <div className="text-sm font-medium text-white/65">{description}</div> : null}
    </div>
  );
}
