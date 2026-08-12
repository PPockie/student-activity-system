export interface CardRequirementProgressProps {
  title: string;
  done: number;
  required: number;
  /** หน่วยต่อท้ายตัวเลข เช่น "ชม." */
  unit?: string;
  /** ข้อความอธิบายใต้แถบ เช่น ข้อมูลอาจารย์ที่ปรึกษา */
  note?: React.ReactNode;
  className?: string;
}

/**
 * การ์ดความคืบหน้าแบบกะทัดรัด — หัวข้อซ้าย ตัวเลขขวา แถบเต็มความกว้าง
 * ต่างจาก HoursSummaryCard ที่เป็นการ์ดใหญ่ของหน้าหลัก
 */
function CardRequirementProgress({
  title,
  done,
  required,
  unit = "ชม.",
  note,
  className = "",
}: CardRequirementProgressProps) {
  const percent = Math.min(Math.round((done / Math.max(required, 1)) * 100), 100);

  return (
    <section
      className={`border-ink-100 rounded-2xl border bg-white p-5 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-ink-900 text-sm font-semibold">{title}</h2>
        <p className="text-ink-400 shrink-0 text-sm">
          <span className="text-ink-900 font-bold">{done}</span> / {required} {unit}
        </p>
      </div>

      <div
        className="bg-ink-100 mt-3 h-2.5 w-full overflow-hidden rounded-full"
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

      {note && <p className="text-ink-400 mt-3 text-xs leading-relaxed">{note}</p>}
    </section>
  );
}

export default CardRequirementProgress;
