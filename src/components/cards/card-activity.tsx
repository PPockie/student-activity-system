import { Link } from "react-router-dom";
import { CalendarDays, MapPin, MoveRight } from "lucide-react";

export interface ActivityCardData {
  id: string | number;
  title: string;
  category?: string;
  /** วันเริ่ม (จัดรูปแบบมาแล้ว) เช่น "ศ. 15 ส.ค." */
  date: string;
  /** วันสิ้นสุด — ใส่เฉพาะกิจกรรมหลายวัน ถ้าเท่ากับ date จะไม่แสดงซ้ำ */
  endDate?: string;
  /** เวลาเริ่ม เช่น "08:00" */
  time?: string;
  /** เวลาสิ้นสุด เช่น "12:00" */
  endTime?: string;
  location?: string;
  hours: number;
  seatsLeft?: number;
}

/** ต่อวันที่กับเวลาเป็นข้อความเดียว ข้ามค่าที่ไม่มี */
function joinDateTime(date?: string, time?: string): string {
  return [date, time].filter(Boolean).join(" ");
}

export interface CardActivityProps {
  activity: ActivityCardData;
  to?: string;
  /** กดแล้วเปิดรายละเอียดในหน้าเดิม — มีค่านี้จะไม่ใช้ `to` */
  onSelect?: (activity: ActivityCardData) => void;
  className?: string;
}

export interface CardActivityListProps {
  activities: ActivityCardData[];
  getItemLink?: (activity: ActivityCardData) => string;
  onSelect?: (activity: ActivityCardData) => void;
  className?: string;
}

export default function CardActivityList({
  activities,
  getItemLink,
  onSelect,
  className = "",
}: CardActivityListProps) {
  return (
    <ul className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 ${className}`}>
      {activities.map((activity) => (
        <li key={activity.id}>
          <CardActivityItem
            activity={activity}
            to={getItemLink?.(activity)}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}

export function CardActivityItem({
  activity,
  to,
  onSelect,
  className = "",
}: CardActivityProps) {
  const { title, category, date, endDate, time, endTime, location, hours, seatsLeft } =
    activity;
  const isFull = seatsLeft !== undefined && seatsLeft <= 0;
  
  const isMultiDay = Boolean(endDate && endDate !== date);
  const startLabel = joinDateTime(date, time);
  const endLabel = joinDateTime(isMultiDay ? endDate : undefined, endTime);

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-ink-900 text-base leading-snug font-semibold">
          {title}
        </h3>
        {category && (
          <span className="bg-ink-100 text-ink-600 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
            {category}
          </span>
        )}
      </div>

      <div className="text-ink-500 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <CalendarDays className="size-4 shrink-0" strokeWidth={1.75} />
        <span>{startLabel}</span>
        {endLabel && (
          <>
            <MoveRight className="text-ink-400 size-4 shrink-0" strokeWidth={1.75} />
            <span>{endLabel}</span>
          </>
        )}
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        {location && (
          <span className="text-ink-300 inline-flex min-w-0 items-center gap-1.5">
            <MapPin className="size-4 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{location}</span>
          </span>
        )}
      </p>

      <div className="mt-3.5 flex items-center justify-between gap-3">
        {seatsLeft !== undefined && (
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              isFull ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${isFull ? "bg-danger" : "bg-success"}`}
              aria-hidden
            />
            {isFull ? "เต็มแล้ว" : `เหลือ ${seatsLeft} ที่นั่ง`}
          </span>
        )}

        <span className="text-ink-900 ml-auto text-sm font-medium">
          +{hours} ชม.
        </span>
      </div>
    </>
  );

  const cardClass = `border-ink-100 block rounded-2xl border bg-white p-4 ${className}`;
  const interactiveClass = `${cardClass} hover:border-primary-200 transition-colors hover:shadow-sm`;

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(activity)}
        className={`${interactiveClass} w-full cursor-pointer text-left`}
      >
        {content}
      </button>
    );
  }

  if (!to) return <div className={cardClass}>{content}</div>;

  return (
    <Link to={to} className={interactiveClass}>
      {content}
    </Link>
  );
}
