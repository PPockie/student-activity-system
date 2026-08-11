import { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { CameraOff, CheckCircle2, QrCode, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import QrScannerFrame from "../../components/scanner/qr-scanner-frame";
import useQrScanner from "../../hook/use-qr-scanner";
import {
  describeCameraIssues,
  getCameraSupport,
  type CameraSupport,
} from "../../utils/browser-support";
import {
  CHECK_IN_TYPE_LABEL,
  parseCheckInCode,
  type ParsedCheckInCode,
} from "../../utils/schemas/check-in-code";

/** หน้ากล้องเต็มจอ — อยู่นอก StudentLayout จึงไม่มี header/แถบเมนูล่างมาบัง */
function StudentScanFullscreen() {
  const navigate = useNavigate();
  const location = useLocation();
  /** รหัสที่พิมพ์มาจากหน้าก่อนหน้า (ถ้ามี) ข้ามขั้นตอนสแกนไปเลย */
  const initialCode = (location.state as { code?: string } | null)?.code ?? null;

  const [code, setCode] = useState<string | null>(initialCode);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isScanning = code === null;

  const parsed: ParsedCheckInCode | null = code === null ? null : parseCheckInCode(code);
  /** หมดอายุ / ผิดรูปแบบ = ยืนยันไม่ได้ (โค้ดที่พิมพ์เองปล่อยผ่านให้ backend ตรวจ) */
  const blocked = parsed?.ok === false && parsed.reason !== "format";
  /** ประเภทมาจาก QR — ถ้าอ่านไม่ได้ ให้ backend เป็นคนตัดสิน */
  const typeLabel = parsed?.ok ? CHECK_IN_TYPE_LABEL[parsed.data.t] : null;

  const handleResult = useCallback((value: string) => setCode(value), []);
  const { videoRef, status, errorMessage, detectionSupported, decoder } = useQrScanner({
    enabled: isScanning,
    onResult: handleResult,
  });

  /** ผลตรวจความสามารถของเบราว์เซอร์ — โชว์เฉพาะตอน dev เพื่อ debug */
  const [support, setSupport] = useState<CameraSupport | null>(null);
  useEffect(() => {
    if (import.meta.env.DEV) void getCameraSupport().then(setSupport);
  }, []);

  const close = () => navigate("/student/check-in-out", { replace: true });

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      // TODO: ต่อ API จริง — POST /participations/check-in หรือ /check-out
      await new Promise((resolve) => setTimeout(resolve, 700));
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  const cameraUnavailable = status === "denied" || status === "error";

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="size-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* ปุ่มปิด — เว้น safe area ของ notch */}
      <button
        type="button"
        onClick={close}
        aria-label="ปิด"
        className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
      >
        <X className="size-6" strokeWidth={2} />
      </button>

      {isScanning && !cameraUnavailable && (
        <QrScannerFrame active={status === "scanning" && detectionSupported}>
          <p className="px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] text-center text-sm text-white/90">
            {status !== "scanning"
              ? "กำลังเปิดกล้อง…"
              : detectionSupported
                ? "วาง QR ของกิจกรรมให้อยู่ในกรอบ"
                : "เบราว์เซอร์นี้อ่าน QR เองไม่ได้ — ย้อนกลับไปกรอกรหัสแทน"}
          </p>
        </QrScannerFrame>
      )}

      {cameraUnavailable && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white/80">
          <CameraOff className="size-12" strokeWidth={1.5} />
          <p className="text-sm">{errorMessage}</p>
          <Button size="large" onClick={close}>
            กลับไปกรอกรหัส
          </Button>
        </div>
      )}

      {/* ผลลัพธ์หลังอ่านได้ */}
      {code !== null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 p-8 text-center text-white">
          {done ? (
            <>
              <CheckCircle2 className="text-success size-16" strokeWidth={1.5} />
              <p className="text-xl font-semibold text-white">
                {typeLabel ?? "บันทึก"}สำเร็จ
              </p>
            </>
          ) : (
            <>
              <QrCode className="size-14" strokeWidth={1.5} />
              {parsed?.ok ? (
                <div>
                  <p className="text-xl font-semibold text-white">{typeLabel}</p>
                  <p className="text-sm text-white/70">รอบกิจกรรม {parsed.data.s}</p>
                </div>
              ) : (
                <p className="text-sm text-white/80">
                  {parsed?.ok === false ? parsed.message : "อ่านรหัสได้แล้ว"}
                </p>
              )}
            </>
          )}

          <p className="max-w-full truncate rounded-lg bg-white/10 px-3 py-1.5 font-mono text-xs">
            {code}
          </p>

          <div className="mt-2 flex w-full max-w-xs gap-3">
            {done ? (
              <>
                <Button
                  size="large"
                  block
                  onClick={() => {
                    setCode(null);
                    setDone(false);
                  }}
                >
                  สแกนต่อ
                </Button>
                <Button size="large" block type="primary" onClick={close}>
                  เสร็จสิ้น
                </Button>
              </>
            ) : (
              <>
                <Button size="large" block onClick={() => setCode(null)}>
                  สแกนใหม่
                </Button>
                <Button
                  size="large"
                  block
                  type="primary"
                  loading={submitting}
                  disabled={blocked}
                  onClick={handleConfirm}
                >
                  ยืนยัน{typeLabel ?? ""}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* แผงตรวจสภาพเบราว์เซอร์ — เห็นเฉพาะตอน dev */}
      {import.meta.env.DEV && support && (
        <details className="absolute right-4 bottom-4 left-4 rounded-xl bg-black/60 p-3 text-xs text-white/80 backdrop-blur">
          <summary className="cursor-pointer font-medium">
            ตรวจความสามารถเบราว์เซอร์ ({support.canScan ? "พร้อมสแกน" : "สแกนอัตโนมัติไม่ได้"})
          </summary>
          <ul className="mt-2 space-y-1">
            <li>secure context (https/localhost): {support.secureContext ? "✅" : "❌"}</li>
            <li>getUserMedia: {support.mediaDevices ? "✅" : "❌"}</li>
            <li>BarcodeDetector: {support.barcodeDetector ? "✅" : "❌ (ใช้ zxing แทน)"}</li>
            <li>ตัวถอดรหัสที่ใช้อยู่: {decoder ?? "—"}</li>
            <li>กล้องที่พบ: {support.videoInputs ?? "ตรวจไม่ได้"}</li>
            <li>สิทธิ์กล้อง: {support.permission}</li>
          </ul>
          {describeCameraIssues(support).length > 0 && (
            <p className="text-danger mt-2">
              ติดที่: {describeCameraIssues(support).join(" · ")}
            </p>
          )}
        </details>
      )}
    </div>
  );
}

export default StudentScanFullscreen;
