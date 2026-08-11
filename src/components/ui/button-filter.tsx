import { SlidersHorizontal } from "lucide-react";

export interface ButtonFilterProps {
  onClick?: () => void;
  /** จำนวนตัวกรองที่เลือกอยู่ — มากกว่า 0 จะโชว์ badge มุมขวาบน */
  activeCount?: number;
  className?: string;
}

/** ปุ่มเปิดตัวกรอง — สี่เหลี่ยมมนพื้น gradient คู่กับช่องค้นหา */
function ButtonFilter({
  onClick,
  activeCount = 0,
  className = "",
}: ButtonFilterProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="ตัวกรอง"
      title="ตัวกรอง"
      className={`bg-primary-500 cursor-pointer relative flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition-opacity hover:opacity-90 ${className}`}
    >
      <SlidersHorizontal className="size-5" strokeWidth={2} />
      {activeCount > 0 && (
        <span className="bg-danger absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full px-1 text-[11px] leading-5 font-medium text-white">
          {activeCount > 9 ? "9+" : activeCount}
        </span>
      )}
    </button>
  );
}

export default ButtonFilter;
