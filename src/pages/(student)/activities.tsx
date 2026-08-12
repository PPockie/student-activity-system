import { useState } from "react";
import { Empty, Input } from "antd";
import { Search } from "lucide-react";
import CardActivityList from "../../components/cards/card-activity";
import FilterActivityModalBottom from "../../components/filters/filter-activity-modal-bottom";
import FilterCategoryActivity from "../../components/filters/filter-category-activity";
import ButtonFilter from "../../components/ui/button-filter";
import PopUpActivityId from "../../components/ui/pop-up-acitivity-id";
import StudentContentLayout from "../../layouts/student/content-layout";
import { MOCK_ACTIVITIES } from "../../mocks/activities";
import {
  applyActivityFilter,
  countActiveFilters,
  DEFAULT_ACTIVITY_FILTER,
  type ActivityFilter,
} from "../../utils/activity-filter";

const ACTIVITIES = MOCK_ACTIVITIES;

const ALL_CATEGORY = "ทั้งหมด";
const CATEGORIES = [
  ALL_CATEGORY,
  ...new Set(ACTIVITIES.map((item) => item.category)),
];

function StudentActivities() {
  const [category, setCategory] = useState<string>(ALL_CATEGORY);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<ActivityFilter>(DEFAULT_ACTIVITY_FILTER);

  /* หมวด + คำค้น ใช้ร่วมกับทุกตัวกรอง — แยกไว้เพื่อให้แผ่นตัวกรองนับผลลัพธ์ล่วงหน้าได้ */
  const baseList = ACTIVITIES.filter(
    (item) =>
      (category === ALL_CATEGORY || item.category === category) &&
      item.title.includes(keyword.trim()),
  );

  const list = applyActivityFilter(baseList, filter);

  return (
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
        <ButtonFilter
          onClick={() => setFilterOpen(true)}
          activeCount={countActiveFilters(filter)}
        />
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
              endDate: item.endDate,
              time: item.time,
              endTime: item.endTime,
              location: item.location,
              hours: item.hours,
              seatsLeft: item.capacity - item.joined,
            }))}
            onSelect={(activity) => setSelectedId(Number(activity.id))}
          />
        </div>
      )}

      <FilterActivityModalBottom
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filter}
        onApply={setFilter}
        countMatches={(draft) => applyActivityFilter(baseList, draft).length}
      />

      <PopUpActivityId
        activityId={selectedId}
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        onRegister={() => undefined}
      />
    </StudentContentLayout>
  );
}

export default StudentActivities;
