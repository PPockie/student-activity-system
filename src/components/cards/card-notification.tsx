import { BellRing, CalendarClock, CircleCheck, CircleX, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NotificationType =
  | "approved"
  | "rejected"
  | "reminder"
  | "announcement"
  | "general";

export interface NotificationData {
  id: string | number;
  title: string;
  message: string;
  /** เวลาแบบพร้อมแสดง เช่น "5 นาทีที่แล้ว" */
  time: string;
  type: NotificationType;
  read: boolean;
}

const TYPE_META: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  approved: { icon: CircleCheck, className: "bg-success/10 text-success" },
  rejected: { icon: CircleX, className: "bg-danger/10 text-danger" },
  reminder: { icon: CalendarClock, className: "bg-warning/10 text-warning" },
  announcement: { icon: Megaphone, className: "bg-accent-50 text-accent-700" },
  general: { icon: BellRing, className: "bg-primary-50 text-primary-700" },
};

export interface CardNotificationListProps {
  items: NotificationData[];
  /** กดที่การ์ดแล้วทำอะไรต่อ — ไม่ส่ง = การ์ดกดไม่ได้ */
  onSelect?: (item: NotificationData) => void;
  className?: string;
}

export default function CardNotificationList({
  items,
  onSelect,
  className = "",
}: CardNotificationListProps) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item.id}>
          <CardNotificationItem item={item} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}

export interface CardNotificationProps {
  item: NotificationData;
  onSelect?: (item: NotificationData) => void;
  className?: string;
}

export function CardNotificationItem({
  item,
  onSelect,
  className = "",
}: CardNotificationProps) {
  const { title, message, time, type, read } = item;
  const { icon: Icon, className: iconClass } = TYPE_META[type];

  const content = (
    <>
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <h3
            className={`min-w-0 flex-1 text-sm ${read ? "text-ink-600 font-medium" : "text-ink-900 font-semibold"}`}
          >
            {title}
          </h3>
          {/* จุดฟ้าหน้ารายการที่ยังไม่อ่าน */}
          {!read && (
            <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" aria-label="ยังไม่อ่าน" />
          )}
        </div>
        <p className="text-ink-500 mt-0.5 text-sm">{message}</p>
        <p className="text-ink-400 mt-1 text-xs">{time}</p>
      </div>
    </>
  );

  // ยังไม่อ่าน = พื้นม่วงจางๆ ให้กวาดตาเห็นง่าย
  const cardClass = `flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
    read ? "border-ink-100 bg-white" : "border-primary-100 bg-primary-50/50"
  } ${className}`;

  if (!onSelect) return <div className={cardClass}>{content}</div>;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`${cardClass} hover:border-primary-200 cursor-pointer`}
    >
      {content}
    </button>
  );
}
