import { CalendarDays, MapPin } from "lucide-react";
import {
  PARTICIPATION_STATUS_META,
  type ParticipationStatus,
} from "../../utils/participation-status";

export interface HistoryCardData {
  id: string | number;
  title: string;
  /** วันที่จัดกิจกรรม (จัดรูปแบบมาแล้ว) เช่น "ศ. 15 ส.ค. 2569" */
  date: string;
  location?: string;
  /** ชั่วโมงที่ได้รับ — นับจริงเฉพาะสถานะ approved */
  hours: number;
  status: ParticipationStatus;
}

export interface CardHistoryListProps {
  items: HistoryCardData[];
  className?: string;
}

export default function CardHistoryList({ items, className = "" }: CardHistoryListProps) {
  return (
    <ul className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <li key={item.id}>
          <CardHistoryItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export interface CardHistoryProps {
  item: HistoryCardData;
  className?: string;
}

export function CardHistoryItem({ item, className = "" }: CardHistoryProps) {
  const { title, date, location, hours, status } = item;
  const meta = PARTICIPATION_STATUS_META[status];
  /** ชั่วโมงนับจริงเมื่ออนุมัติแล้วเท่านั้น สถานะอื่นแสดงแบบจาง */
  const counted = status === "approved";

  return (
    <div className={`border-ink-100 rounded-2xl border bg-white p-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-ink-900 text-base leading-snug font-semibold">{title}</h3>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
        >
          <span className={`size-1.5 rounded-full ${meta.dotClassName}`} aria-hidden />
          {meta.label}
        </span>
      </div>

      <p className="text-ink-500 mt-2 flex items-center gap-1.5 text-sm">
        <CalendarDays className="size-4 shrink-0" strokeWidth={1.75} />
        {date}
      </p>

      {location && (
        <p className="text-ink-400 mt-1 flex min-w-0 items-center gap-1.5 text-sm">
          <MapPin className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{location}</span>
        </p>
      )}

      <div className="border-ink-100 mt-3.5 flex items-center justify-between gap-3 border-t pt-3">
        <span className="text-ink-500 text-xs">ชั่วโมงที่ได้รับ</span>
        <span
          className={`text-sm font-semibold ${counted ? "text-ink-900" : "text-ink-400"}`}
        >
          {counted ? `+${hours} ชม.` : `${hours} ชม. (ยังไม่นับ)`}
        </span>
      </div>
    </div>
  );
}
