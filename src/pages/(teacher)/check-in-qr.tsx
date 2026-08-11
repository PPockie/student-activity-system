import { useEffect, useMemo, useState } from "react";
import { QRCode, Segmented, Select } from "antd";
import {
  buildCheckInCode,
  CHECK_IN_TYPE_LABEL,
  type CheckInCodeType,
} from "../../utils/schemas/check-in-code";

const MODES = (Object.keys(CHECK_IN_TYPE_LABEL) as CheckInCodeType[]).map((value) => ({
  value,
  label: CHECK_IN_TYPE_LABEL[value],
}));

const SESSIONS = [
  { value: "ses_001", label: "จิตอาสาพัฒนาชุมชน — รอบเช้า", activityId: "act_001" },
  { value: "ses_002", label: "อบรมการเงิน — รอบบ่าย", activityId: "act_002" },
];

/** QR หมดอายุทุกกี่วินาที — สั้นไว้กันถ่ายรูปส่งต่อให้เพื่อนเช็คอินแทน */
const TTL_SECONDS = 60;

function TeacherCheckInQr() {
  const [mode, setMode] = useState<CheckInCodeType>("check-in");
  const [sessionId, setSessionId] = useState(SESSIONS[0].value);
  /** เปลี่ยนค่าเพื่อบังคับสร้าง QR ใหม่เมื่อหมดอายุ */
  const [issuedAt, setIssuedAt] = useState(() => Date.now());
  const [secondsLeft, setSecondsLeft] = useState(TTL_SECONDS);

  const session = SESSIONS.find((item) => item.value === sessionId) ?? SESSIONS[0];

  const value = useMemo(
    () =>
      buildCheckInCode({
        t: mode,
        a: session.activityId,
        s: session.value,
        exp: Math.floor(issuedAt / 1000) + TTL_SECONDS,
        // TODO: ให้ backend เซ็นและส่ง sig กลับมา — client ไม่ควรสร้างเอง
      }),
    [mode, session, issuedAt],
  );

  // นับถอยหลังแล้วออก QR ใหม่อัตโนมัติ
  useEffect(() => {
    setSecondsLeft(TTL_SECONDS);
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIssuedAt(Date.now());
          return TTL_SECONDS;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [issuedAt, mode, sessionId]);

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-xl font-semibold">QR สำหรับเช็คอิน/เช็คเอาท์</h1>

      <Select
        size="large"
        className="w-full"
        options={SESSIONS}
        value={sessionId}
        onChange={setSessionId}
      />

      <Segmented
        block
        options={MODES}
        value={mode}
        onChange={(next) => setMode(next as CheckInCodeType)}
      />

      <div className="border-ink-100 flex flex-col items-center gap-3 rounded-2xl border bg-white p-6">
        <QRCode value={value} size={240} errorLevel="M" bordered={false} />
        <p className="text-ink-500 text-sm">
          หมดอายุใน <span className="text-ink-900 font-semibold">{secondsLeft}</span> วินาที
        </p>
        <p className="text-ink-400 max-w-full text-center font-mono text-[11px] break-all">
          {value}
        </p>
      </div>
    </div>
  );
}

export default TeacherCheckInQr;
