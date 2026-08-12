import { Alert, Skeleton } from "antd";
import {
  CalendarDays,
  CircleAlert,
  CircleCheck,
  Clock,
  ListOrdered,
  MapPin,
  Phone,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import useActivityDetail from "../../hook/use-activity-detail";
import { useIsMobile } from "../../hook/use-media-query";
import DrawerSide from "./drawer-side";
import ModalBottom from "./modal-bottom";
import type { ActivityDetail } from "../../types/activity";
import { PARTICIPATION_STATUS_META } from "../../utils/participation-status";

export interface PopUpActivityIdProps {
  activityId: string | number | null;
  open: boolean;
  onClose: () => void;
  onRegister?: (activity: ActivityDetail) => void;
  registering?: boolean;
}

function joinDateTime(date?: string, time?: string): string {
  return [date, time].filter(Boolean).join(" ");
}

/** แถวข้อมูล: ไอคอนในวงกลมอ่อน + หัวข้อ + บรรทัดรอง */
function InfoRow({
  icon: Icon,
  title,
  hint,
}: {
  icon: typeof CalendarDays;
  title: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="bg-primary-50 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="text-ink-900 block text-sm font-medium">{title}</span>
        {hint && <span className="text-ink-400 block text-xs">{hint}</span>}
      </span>
    </div>
  );
}

/** แถบความคืบหน้าที่นั่ง — เต็มแล้วเปลี่ยนเป็นสีเตือน */
function SeatsBar({ joined, capacity }: { joined: number; capacity: number }) {
  const percent = capacity > 0 ? Math.min(100, (joined / capacity) * 100) : 0;
  const isFull = joined >= capacity;

  return (
    <div
      className="bg-ink-100 h-2 overflow-hidden rounded-full"
      role="progressbar"
      aria-valuenow={joined}
      aria-valuemin={0}
      aria-valuemax={capacity}
      aria-label="จำนวนที่นั่งที่ลงทะเบียนแล้ว"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${
          isFull ? "bg-accent-300" : "bg-brand-gradient"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function ActivityDetailBody({ activity }: { activity: ActivityDetail }) {
  const {
    title,
    category,
    date,
    endDate,
    time,
    endTime,
    location,
    hours,
    maxHours,
    joined,
    capacity,
    allowOverflow,
    description,
    coverUrl,
    waitlistCount,
    organizer,
    contact,
    requirements,
    participationStatus,
  } = activity;

  const seatsLeft = capacity - joined;
  const isFull = seatsLeft <= 0;
  const isMultiDay = Boolean(endDate && endDate !== date);
  const startLabel = joinDateTime(date, time);
  const endLabel = joinDateTime(isMultiDay ? endDate : undefined, endTime);
  const statusMeta = participationStatus
    ? PARTICIPATION_STATUS_META[participationStatus]
    : undefined;
  const metaLine = [
    location,
    startLabel,
    endLabel && `ถึง ${endLabel}`,
    `${hours} ชม.`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-5">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt=""
          className="bg-primary-50 h-40 w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="bg-primary-100 text-primary-300 flex h-40 w-full items-center justify-center rounded-2xl text-sm">
          ภาพปกกิจกรรม
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary-50 text-primary-700 rounded-lg px-2.5 py-1 text-xs font-medium">
            {category}
          </span>
          {statusMeta && (
            <span
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${statusMeta.className}`}
            >
              <span
                className={`size-1.5 rounded-full ${statusMeta.dotClassName}`}
                aria-hidden
              />
              {statusMeta.label}
            </span>
          )}
        </div>

        <h2 className="text-ink-900 mt-2.5 text-2xl leading-tight font-bold">
          {title}
        </h2>

        <p className="text-ink-500 mt-2 text-sm leading-relaxed">{description}</p>
        <p className="text-ink-400 mt-1.5 text-xs">{metaLine}</p>
      </div>

      <div className="border-ink-100 rounded-2xl border p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-ink-900 text-sm font-semibold">ที่นั่ง</span>
          <span className="text-ink-400 text-sm">
            <span className="text-ink-900 text-lg font-bold">{joined}</span> / {capacity}
          </span>
        </div>

        <div className="mt-3">
          <SeatsBar joined={joined} capacity={capacity} />
        </div>

        {isFull ? (
          <p className="text-danger mt-3 flex items-center gap-1.5 text-sm font-medium">
            <CircleAlert className="size-4 shrink-0" strokeWidth={2} />
            {allowOverflow ? "เต็ม — เปิดรับคิวสำรอง" : "เต็มแล้ว — ปิดรับลงทะเบียน"}
          </p>
        ) : (
          <p className="text-success mt-3 flex items-center gap-1.5 text-sm font-medium">
            <CircleCheck className="size-4 shrink-0" strokeWidth={2} />
            เหลือ {seatsLeft} ที่นั่ง
          </p>
        )}

        {isFull && allowOverflow && waitlistCount !== undefined && (
          <p className="border-ink-100 text-ink-400 mt-3 flex items-center gap-1.5 border-t pt-3 text-xs">
            <Users className="size-4 shrink-0" strokeWidth={1.75} />
            มีคิวสำรองแล้ว {waitlistCount} คน · คุณจะได้ลำดับที่ #{waitlistCount + 1}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <InfoRow
          icon={Clock}
          title={`${hours} ชั่วโมงกิจกรรม`}
          hint={`นับเข้าโควตาหมวด${category} (สูงสุด ${maxHours} ชม.)`}
        />

        <InfoRow
          icon={MapPin}
          title={location}
          hint={endLabel ? `${startLabel} ถึง ${endLabel}` : startLabel}
        />

        <InfoRow icon={UserRound} title={organizer} hint="ผู้จัดกิจกรรม" />

        {contact && <InfoRow icon={Phone} title={contact} hint="ติดต่อสอบถาม" />}
      </div>

      {requirements && requirements.length > 0 && (
        <section>
          <h3 className="text-ink-900 text-sm font-semibold">สิ่งที่ต้องเตรียม</h3>
          <ul className="text-ink-500 mt-2 space-y-1.5 text-sm">
            {requirements.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="bg-primary-200 mt-2 size-1.5 shrink-0 rounded-full" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/** แถบปุ่มด้านล่าง — ตัว shell เป็นคนใส่ padding/เส้นคั่นให้ */
function RegisterFooter({
  activity,
  onRegister,
  registering,
}: {
  activity: ActivityDetail;
  onRegister: (activity: ActivityDetail) => void;
  registering?: boolean;
}) {
  const isFull = activity.capacity - activity.joined <= 0;
  const isJoined = Boolean(activity.participationStatus);

  const isWaitlist = isFull && activity.allowOverflow && !isJoined;
  const canRegister = !isJoined && (!isFull || activity.allowOverflow);

  return (
    <>
      <button
        type="button"
        disabled={!canRegister || registering}
        onClick={() => onRegister(activity)}
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-opacity ${
          canRegister && !registering
            ? "bg-brand-gradient cursor-pointer text-white hover:opacity-90"
            : "bg-ink-100 text-ink-400 cursor-not-allowed"
        }`}
      >
        {isWaitlist ? (
          <ListOrdered className="size-5" strokeWidth={2} />
        ) : (
          <UserPlus className="size-5" strokeWidth={2} />
        )}
        {registering
          ? "กำลังดำเนินการ..."
          : isJoined
            ? "ลงทะเบียนแล้ว"
            : isWaitlist
              ? "เข้าคิวสำรอง (Overflow)"
              : isFull
                ? "ที่นั่งเต็ม"
                : "ลงทะเบียนเข้าร่วม"}
      </button>

      {isFull && (
        <p className="text-ink-400 mt-2 text-center text-xs">
          {activity.allowOverflow
            ? "ที่นั่งเต็มแล้ว — ระบบจะยืนยันสิทธิ์ให้อีกครั้งเมื่อมีผู้สละสิทธิ์"
            : "ที่นั่งเต็มแล้ว — ปิดรับลงทะเบียนชั่วคราว"}
        </p>
      )}
    </>
  );
}

function PopUpActivityId({
  activityId,
  open,
  onClose,
  onRegister,
  registering,
}: PopUpActivityIdProps) {
  const isMobile = useIsMobile();
  const { activity, loading, error } = useActivityDetail(open ? activityId : null);

  let content: React.ReactNode;

  if (loading) {
    content = (
      <div className="space-y-4">
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  } else if (error || !activity) {
    content = (
      <Alert
        type="error"
        showIcon
        title="โหลดข้อมูลกิจกรรมไม่สำเร็จ"
        description={error?.message ?? "ไม่พบข้อมูลกิจกรรมนี้"}
      />
    );
  } else {
    content = <ActivityDetailBody activity={activity} />;
  }

  const footer =
    activity && onRegister ? (
      <RegisterFooter
        activity={activity}
        onRegister={onRegister}
        registering={registering}
      />
    ) : null;

  if (isMobile) {
    return (
      <ModalBottom open={open} onClose={onClose} footer={footer}>
        {content}
      </ModalBottom>
    );
  }

  return (
    <DrawerSide
      open={open}
      onClose={onClose}
      title="รายละเอียดกิจกรรม"
      footer={footer}
    >
      {content}
    </DrawerSide>
  );
}

export default PopUpActivityId;
