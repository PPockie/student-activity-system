import { useEffect, useState } from "react";
import { Switch } from "antd";
import ModalBottom from "../ui/modal-bottom";
import {
  DAY_RANGE_OPTIONS,
  DEFAULT_ACTIVITY_FILTER,
  HOUR_RANGE_OPTIONS,
  SORT_OPTIONS,
  type ActivityFilter,
} from "../../utils/activity-filter";

export interface FilterActivityModalBottomProps {
  open: boolean;
  onClose: () => void;
  /** ตัวกรองที่ใช้อยู่จริง — ใช้ตั้งค่าเริ่มต้นทุกครั้งที่เปิด */
  value: ActivityFilter;
  onApply: (filter: ActivityFilter) => void;
  /** จำนวนผลลัพธ์ของตัวกรองที่กำลังเลือก — เอาไว้โชว์บนปุ่มยืนยัน */
  countMatches: (filter: ActivityFilter) => number;
}

interface FilterChipGroupProps<T extends string> {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

function FilterChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterChipGroupProps<T>) {
  return (
    <div>
      <p className="text-ink-500 text-sm">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2 flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary-50 text-primary-700"
                  : "border-ink-100 text-ink-600 hover:border-primary-200 hover:text-primary bg-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** แผ่นตัวกรองกิจกรรมสำหรับจอมือถือ — เลือกแล้วต้องกดยืนยันจึงจะมีผล */
function FilterActivityModalBottom({
  open,
  onClose,
  value,
  onApply,
  countMatches,
}: FilterActivityModalBottomProps) {
  const [draft, setDraft] = useState<ActivityFilter>(value);

  /* เปิดใหม่ = เริ่มจากค่าที่ใช้อยู่จริงเสมอ ทิ้งของที่เลือกค้างไว้รอบก่อน */
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const matches = countMatches(draft);

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <ModalBottom open={open} onClose={onClose} title="ตัวกรอง">
      <div className="space-y-5 pt-1">
        <FilterChipGroup
          label="ช่วงวัน"
          options={DAY_RANGE_OPTIONS}
          value={draft.dayRange}
          onChange={(dayRange) => setDraft((prev) => ({ ...prev, dayRange }))}
        />

        <FilterChipGroup
          label="จำนวนชั่วโมง"
          options={HOUR_RANGE_OPTIONS}
          value={draft.hourRange}
          onChange={(hourRange) => setDraft((prev) => ({ ...prev, hourRange }))}
        />

        <FilterChipGroup
          label="เรียงตาม"
          options={SORT_OPTIONS}
          value={draft.sort}
          onChange={(sort) => setDraft((prev) => ({ ...prev, sort }))}
        />

        <label className="border-ink-100 flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4">
          <span className="min-w-0 flex-1">
            <span className="text-ink-900 block text-sm font-medium">
              เฉพาะที่ยังมีที่นั่ง
            </span>
            <span className="text-ink-400 block text-xs">
              ซ่อนกิจกรรมที่เต็มและคิวสำรอง
            </span>
          </span>
          <Switch
            checked={draft.onlyAvailable}
            onChange={(onlyAvailable) =>
              setDraft((prev) => ({ ...prev, onlyAvailable }))
            }
          />
        </label>
      </div>

      <div className="border-ink-100 sticky bottom-0 -mx-5 mt-5 flex gap-3 border-t bg-white px-5 pt-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => setDraft(DEFAULT_ACTIVITY_FILTER)}
          className="border-ink-100 text-ink-700 hover:border-primary-200 hover:text-primary flex-1 cursor-pointer rounded-full border bg-white py-3 text-sm font-medium transition-colors"
        >
          ล้างทั้งหมด
        </button>

        <button
          type="button"
          onClick={handleApply}
          className="bg-brand-gradient flex-1 cursor-pointer rounded-full py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          ดู {matches} กิจกรรม
        </button>
      </div>
    </ModalBottom>
  );
}

export default FilterActivityModalBottom;
