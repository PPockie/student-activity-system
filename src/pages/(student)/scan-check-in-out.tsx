import { useState } from "react";
import { Button, Input } from "antd";
import { QrCode, ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentContentLayout from "../../layouts/student/content-layout";

/** ประวัติล่าสุด — TODO: ดึงจาก API */
const RECENT = [
  { id: 1, title: "จิตอาสาพัฒนาชุมชน", type: "เช็คอิน", at: "วันนี้ 08:02" },
  { id: 2, title: "ปลูกป่าชายเลน", type: "เช็คเอาท์", at: "2 ส.ค. 13:40" },
];

function StudentScanCheckInOut() {
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState("");

  const goScan = (code?: string) =>
    navigate("/student/scan", code ? { state: { code } } : undefined);

  return (
    <StudentContentLayout pageLabel="เช็คอิน / เช็คเอาท์">
      <button
        type="button"
        onClick={() => goScan()}
        className="bg-primary-500 flex w-full cursor-pointer flex-col items-center gap-3 rounded-3xl px-6 py-10 text-white transition-opacity hover:opacity-95"
      >
        <span className="flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <ScanLine className="size-10" strokeWidth={1.5} />
        </span>
        <span className="text-lg font-semibold text-white">สแกน QR</span>
        <span className="text-sm text-white/80">
          กดเพื่อเปิดกล้อง แล้วส่อง QR ของกิจกรรม
        </span>
      </button>

      <div className="border-ink-100 space-y-3 rounded-2xl border bg-white p-4">
        <p className="text-ink-600 text-sm font-medium">กรอกรหัสกิจกรรมแทน</p>
        <div className="flex items-center gap-3">
          <Input
            size="large"
            placeholder="เช่น ACTIVITY-001"
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
            onPressEnter={() => manualCode.trim() && goScan(manualCode.trim())}
          />
          <Button
            size="large"
            type="primary"
            disabled={!manualCode.trim()}
            onClick={() => goScan(manualCode.trim())}
          >
            ยืนยัน
          </Button>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold">รายการล่าสุด</h2>
        <ul className="space-y-2">
          {RECENT.map((item) => (
            <li
              key={item.id}
              className="border-ink-100 flex items-center gap-3 rounded-2xl border bg-white p-3"
            >
              <span className="bg-primary-50 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                <QrCode className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-ink-500 text-xs">{item.at}</p>
              </div>
              <span className="text-ink-600 shrink-0 text-xs">{item.type}</span>
            </li>
          ))}
        </ul>
      </section>
    </StudentContentLayout>
  );
}

export default StudentScanCheckInOut;
