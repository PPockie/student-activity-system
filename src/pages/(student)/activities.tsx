import { useState } from "react";
import { Empty, Input } from "antd";
import { Search } from "lucide-react";
import CardActivityList from "../../components/cards/card-activity";
import FilterCategoryActivity from "../../components/filters/filter-category-activity";
import ButtonFilter from "../../components/ui/button-filter";
import StudentContentLayout from "../../layouts/student/content-layout";

const ACTIVITIES = [
  {
    id: 1,
    title: "จิตอาสาพัฒนาชุมชน",
    category: "จิตอาสา",
    date: "ศ. 15 ส.ค.",
    time: "08:00",
    location: "ศาลาประชาคม",
    hours: 4,
    joined: 38,
    capacity: 40,
    tab: "เปิดรับสมัคร",
  },
  {
    id: 2,
    title: "อบรมการเงินสำหรับนักศึกษา",
    category: "อบรม",
    date: "พ. 20 ส.ค.",
    endDate: "ศ. 22 ส.ค.",
    endTime: "16:00",
    time: "13:00",
    location: "ห้องประชุม A",
    hours: 3,
    joined: 40,
    capacity: 40,
    tab: "เปิดรับสมัคร",
  },
  {
    id: 3,
    title: "ปลูกป่าชายเลน",
    category: "อนุรักษ์",
    date: "ส. 2 ส.ค.",
    time: "07:30",
    location: "บางขุนเทียน",
    hours: 6,
    joined: 25,
    capacity: 30,
    tab: "ของฉัน",
  },
  {
    id: 4,
    title: "ปลูกป่าชายเลน",
    category: "อนุรักษ์",
    date: "ส. 2 ส.ค.",
    time: "07:30",
    location: "บางขุนเทียน",
    hours: 6,
    joined: 25,
    capacity: 30,
    tab: "ของฉัน",
  },
  {
    id: 5,
    title: "ปลูกป่าชายเลน",
    category: "อนุรักษ์",
    date: "ส. 2 ส.ค.",
    time: "07:30",
    location: "บางขุนเทียน",
    hours: 6,
    joined: 25,
    capacity: 30,
    tab: "ของฉัน",
  },
  {
    id: 6,
    title: "ปลูกป่าชายเลน",
    category: "อนุรักษ์",
    date: "ส. 2 ส.ค.",
    time: "07:30",
    location: "บางขุนเทียน",
    hours: 6,
    joined: 25,
    capacity: 30,
    tab: "ของฉัน",
  },

] as const;

const ALL_CATEGORY = "ทั้งหมด";
/** หมวดทั้งหมดที่มีจริงในข้อมูล — ไม่ต้องมาไล่แก้ list เองเวลาเพิ่มกิจกรรม */
const CATEGORIES = [
  ALL_CATEGORY,
  ...new Set(ACTIVITIES.map((item) => item.category)),
];

function StudentActivities() {
  const [category, setCategory] = useState<string>(ALL_CATEGORY);
  const [keyword, setKeyword] = useState("");

  const list = ACTIVITIES.filter(
    (item) =>
      (category === ALL_CATEGORY || item.category === category) &&
      item.title.includes(keyword.trim()),
  );

  return (
    /* scroll={false} = ช่องค้นหากับชิปหมวดถูกตรึงไว้ เลื่อนเฉพาะรายการกิจกรรม */
    <StudentContentLayout pageLabel="กิจกรรม" scroll={false}>
      <div className="flex shrink-0 items-center gap-3">
        <Input
          size="large"
          allowClear
          prefix={<Search className="text-ink-400 mr-1 size-5" />}
          placeholder="ค้นหากิจกรรม"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <ButtonFilter onClick={() => undefined} />
      </div>

      <FilterCategoryActivity
        className="shrink-0"
        categories={CATEGORIES}
        value={category}
        onChange={setCategory}
      />

      {list.length === 0 ? (
        <Empty description="ไม่พบกิจกรรม" className="py-10!" />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <CardActivityList
            activities={list.map((item) => ({
              id: item.id,
              title: item.title,
              category: item.category,
              date: item.date,
              endDate: "endDate" in item ? item.endDate : undefined,
              time: item.time,
              endTime: "endTime" in item ? item.endTime : undefined,
              location: item.location,
              hours: item.hours,
              seatsLeft: item.capacity - item.joined,
            }))}
            getItemLink={(activity) => `/student/activities/${activity.id}`}
          />
        </div>
      )}
    </StudentContentLayout>
  );
}

export default StudentActivities;
