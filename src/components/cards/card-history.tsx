import {
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  RotateCcw,
} from "lucide-react";
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
  /** หมายเหตุต่อท้ายชั่วโมง เช่น เหตุผลที่ไม่อนุมัติ */
  note?: string;
}

/** ไอคอนหน้าป้ายสถานะ — สีมาจาก PARTICIPATION_STATUS_META */
const STATUS_ICON: Record<ParticipationStatus, typeof CircleCheck> = {
  registered: Clock,
  "checked-in": CircleCheck,
  pending: Clock,
  approved: CircleCheck,
  "cancel-requested": CircleAlert,
  cancelled: CircleX,
  rejected: CircleX,
};

/** ข้อความปุ่มลัดมุมขวาล่างตามสถานะ — ไม่มี = ไม่ต้องแสดงปุ่ม */
const STATUS_ACTION: Partial<Record<ParticipationStatus, string>> = {
  approved: "ใบรับรอง",
  pending: "ดูรายละเอียด",
  registered: "ดูรายละเอียด",
  "checked-in": "ดูรายละเอียด",
  "cancel-requested": "ดูรายละเอียด",
  rejected: "อัปโหลดใหม่",
};

export interface CardHistoryProps {
  item: HistoryCardData;
  onAction?: (item: HistoryCardData) => void;
  actionLabel?: string;
  className?: string;
}

export interface CardHistoryListProps {
  items: HistoryCardData[];
  onAction?: (item: HistoryCardData) => void;
  className?: string;
}

export default function CardHistoryList({
  items,
  onAction,
  className = "",
}: CardHistoryListProps) {
  return (
    <ul className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <li key={item.id}>
          <CardHistoryItem item={item} onAction={onAction} />
        </li>
      ))}
    </ul>
  );
}

export function CardHistoryItem({
  item,
  onAction,
  actionLabel,
  className = "",
}: CardHistoryProps) {
  const { title, date, location, hours, status, note } = item;
  const meta = PARTICIPATION_STATUS_META[status];
  const StatusIcon = STATUS_ICON[status];
  const counted = status === "approved";
  const label = actionLabel ?? STATUS_ACTION[status];
  const isRetry = status === "rejected";
  const metaLine = [date, location].filter(Boolean).join(" · ");

  return (
    <div className={`border-ink-100 rounded-2xl border bg-white p-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-ink-900 min-w-0 flex-1 text-base leading-snug font-semibold">
          {title}
        </h3>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
        >
          <StatusIcon className="size-3.5 shrink-0" strokeWidth={2} />
          {meta.label}
        </span>
      </div>

      <p className="text-ink-400 mt-1.5 truncate text-xs">{metaLine}</p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="min-w-0">
          <span
            className={`text-base font-semibold ${counted ? "text-ink-900" : "text-ink-400"}`}
          >
            {hours} ชม.
          </span>
          {note && <span className="text-ink-400 text-xs"> · {note}</span>}
        </p>

        {label && onAction && (
          <button
            type="button"
            onClick={() => onAction(item)}
            className="text-primary hover:text-primary-700 flex shrink-0 cursor-pointer items-center gap-0.5 text-sm font-medium transition-colors"
          >
            {isRetry && <RotateCcw className="size-4" strokeWidth={2} />}
            {label}
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
