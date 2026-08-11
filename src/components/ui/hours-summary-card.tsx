import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface HoursSummaryCardProps {
  /** ชั่วโมงที่ทำแล้ว */
  done: number;
  /** ชั่วโมงที่ต้องทำทั้งหมด */
  required: number;
  title?: string;
  /** ปลายทางของลิงก์มุมขวาบน — ไม่ส่ง = ไม่แสดงลิงก์ */
  detailsTo?: string;
  className?: string;
}

/** การ์ดสรุปชั่วโมงกิจกรรมสะสม พร้อมแถบความคืบหน้าแบบ gradient */
function HoursSummaryCard({
  done,
  required,
  title = "ชั่วโมงกิจกรรมปีนี้",
  detailsTo,
  className = "",
}: HoursSummaryCardProps) {
  const safeRequired = Math.max(required, 1);
  const percent = Math.min(Math.round((done / safeRequired) * 100), 100);
  const remaining = Math.max(required - done, 0);

  return (
    <section
      className={`border-ink-100 rounded-2xl border bg-white p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {detailsTo && (
          <Link
            to={detailsTo}
            className="text-accent hover:text-accent-600 flex shrink-0 items-center gap-0.5 text-sm font-medium transition-colors"
          >
            ดูรายละเอียด
            <ChevronRight className="size-4" strokeWidth={2} />
          </Link>
        )}
      </div>

      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-ink-900 text-4xl font-bold">{done}</span>
        <span className="text-ink-400 text-base font-medium">
          / {required} ชม.
        </span>
      </p>

      <div
        className="bg-ink-100 mt-4 h-3 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title}
      >
        <div
          className="bg-brand-gradient h-full rounded-full transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 text-sm">
        <span className="text-ink-500">สำเร็จแล้ว {percent}%</span>
        <span className="text-ink-900 font-semibold">
          {remaining === 0 ? "ครบแล้ว 🎉" : `เหลืออีก ${remaining} ชม.`}
        </span>
      </div>
    </section>
  );
}

export default HoursSummaryCard;
