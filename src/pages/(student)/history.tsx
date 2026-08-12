import { useState } from "react";
import { Empty } from "antd";
import CardHistoryList, { type HistoryCardData } from "../../components/cards/card-history";
import FilterCategoryActivity from "../../components/filters/filter-category-activity";
import StudentContentLayout from "../../layouts/student/content-layout";
import { PARTICIPATION_STATUS_META } from "../../utils/participation-status";

const HISTORY: HistoryCardData[] = [
  {
    id: 1,
    title: "ปลูกป่าชายเลน",
    date: "ส. 2 ส.ค. 2569",
    location: "บางขุนเทียน",
    hours: 6,
    status: "approved",
  },
  {
    id: 2,
    title: "จิตอาสาพัฒนาชุมชน",
    date: "ศ. 15 ส.ค. 2569",
    location: "ศาลาประชาคม",
    hours: 4,
    status: "pending",
  },
  {
    id: 3,
    title: "อบรมการเงินสำหรับนักศึกษา",
    date: "พ. 20 ส.ค. 2569",
    location: "ห้องประชุม A",
    hours: 3,
    status: "registered",
  },
  {
    id: 4,
    title: "เดินการกุศลเพื่อผู้ป่วย",
    date: "อา. 27 ก.ค. 2569",
    location: "สวนสาธารณะกลางเมือง",
    hours: 5,
    status: "cancelled",
  },
  {
    id: 5,
    title: "ช่วยงานกีฬาสี",
    date: "พฤ. 11 มิ.ย. 2569",
    location: "สนามกีฬากลาง",
    hours: 0,
    status: "rejected",
    note: "หลักฐานไม่ชัดเจน",
  },
];

const ALL_STATUS = "ทั้งหมด";
const STATUS_FILTERS = [
  ALL_STATUS,
  ...new Set(HISTORY.map((item) => PARTICIPATION_STATUS_META[item.status].label)),
];

function StudentHistory() {
  const [statusLabel, setStatusLabel] = useState(ALL_STATUS);

  const list = HISTORY.filter(
    (item) =>
      statusLabel === ALL_STATUS ||
      PARTICIPATION_STATUS_META[item.status].label === statusLabel,
  );

  // const approvedHours = HISTORY.filter((item) => item.status === "approved").reduce(
  //   (total, item) => total + item.hours,
  //   0,
  // );

  return (
    <StudentContentLayout pageLabel="ประวัติกิจกรรม" scroll={false}>
      {/* <div className="border-ink-100 flex shrink-0 items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3">
        <div>
          <p className="text-ink-500 text-xs">ชั่วโมงที่อนุมัติแล้ว</p>
          <h4 className="text-primary text-2xl font-semibold">{approvedHours} ชม.</h4>
        </div>
        <div className="text-right">
          <p className="text-ink-500 text-xs">กิจกรรมที่ลงทะเบียน</p>
          <h4 className="text-ink-900 text-2xl font-semibold">{HISTORY.length}</h4>
        </div>
      </div> */}

      <FilterCategoryActivity
        className="shrink-0"
        categories={STATUS_FILTERS}
        value={statusLabel}
        onChange={setStatusLabel}
      />

      {list.length === 0 ? (
        <Empty description="ไม่พบกิจกรรม" className="py-10!" />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          {/* TODO: ต่อกับหน้าใบรับรอง / อัปโหลดหลักฐานใหม่เมื่อมี endpoint */}
          <CardHistoryList items={list} onAction={() => undefined} />
        </div>
      )}
    </StudentContentLayout>
  );
}

export default StudentHistory;
