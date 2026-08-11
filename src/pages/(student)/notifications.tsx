import { useMemo, useState } from "react";
import { Button, Empty } from "antd";
import { CheckCheck } from "lucide-react";
import CardNotificationList, {
  type NotificationData,
} from "../../components/cards/card-notification";
import FilterCategoryActivity from "../../components/filters/filter-category-activity";
import StudentContentLayout from "../../layouts/student/content-layout";

const INITIAL_NOTIFICATIONS: NotificationData[] = [
  {
    id: 1,
    title: "กิจกรรมได้รับการอนุมัติ",
    message: "ปลูกป่าชายเลน — ได้รับ 6 ชั่วโมงกิจกรรม",
    time: "5 นาทีที่แล้ว",
    type: "approved",
    read: false,
  },
  {
    id: 2,
    title: "เตือนความจำ",
    message: "จิตอาสาพัฒนาชุมชน เริ่มพรุ่งนี้ 08:00 ที่ศาลาประชาคม",
    time: "2 ชั่วโมงที่แล้ว",
    type: "reminder",
    read: false,
  },
  {
    id: 3,
    title: "ประกาศจากงานกิจกรรม",
    message: "เปิดรับสมัครกิจกรรมประจำเดือนกันยายนแล้ววันนี้",
    time: "เมื่อวาน 14:30",
    type: "announcement",
    read: false,
  },
  {
    id: 4,
    title: "คำขอยกเลิกถูกปฏิเสธ",
    message: "อบรมการเงินสำหรับนักศึกษา — ติดต่ออาจารย์ที่ปรึกษา",
    time: "2 ส.ค. 2569",
    type: "rejected",
    read: true,
  },
  {
    id: 5,
    title: "ลงทะเบียนสำเร็จ",
    message: "อบรมการเงินสำหรับนักศึกษา วันที่ 20 ส.ค. 2569",
    time: "28 ก.ค. 2569",
    type: "general",
    read: true,
  },
];

const FILTERS = ["ทั้งหมด", "ยังไม่อ่าน", "อ่านแล้ว"] as const;
type Filter = (typeof FILTERS)[number];

function StudentNotifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("ทั้งหมด");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const list = useMemo(
    () =>
      notifications.filter((item) => {
        if (filter === "ยังไม่อ่าน") return !item.read;
        if (filter === "อ่านแล้ว") return item.read;
        return true;
      }),
    [notifications, filter],
  );

  const markAsRead = (id: NotificationData["id"]) =>
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );

  const markAllAsRead = () =>
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));

  const emptyText =
    filter === "ยังไม่อ่าน"
      ? "อ่านครบทุกรายการแล้ว 🎉"
      : filter === "อ่านแล้ว"
        ? "ยังไม่มีรายการที่อ่านแล้ว"
        : "ยังไม่มีการแจ้งเตือน";

  return (
    <StudentContentLayout back pageLabel="การแจ้งเตือน" scroll={false}>
      <div className="flex shrink-0 items-center justify-between gap-3">
        <p className="text-ink-500 text-sm">
          {unreadCount > 0 ? `ยังไม่ได้อ่าน ${unreadCount} รายการ` : "อ่านครบแล้ว"}
        </p>
        <Button
          type="link"
          size="small"
          className="px-0!"
          icon={<CheckCheck className="size-4" />}
          disabled={unreadCount === 0}
          onClick={markAllAsRead}
        >
          อ่านทั้งหมด
        </Button>
      </div>

      <FilterCategoryActivity
        className="shrink-0"
        categories={[...FILTERS]}
        value={filter}
        onChange={(next) => setFilter(next as Filter)}
      />

      {list.length === 0 ? (
        <Empty description={emptyText} className="py-10!" />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <CardNotificationList items={list} onSelect={(item) => markAsRead(item.id)} />
        </div>
      )}
    </StudentContentLayout>
  );
}

export default StudentNotifications;
