import type { ActivitySummary } from '../types/activity'

export type DayRange = 'all' | 'weekday' | 'weekend'
export type HourRange = 'all' | 'short' | 'long'
export type ActivitySort = 'date' | 'hours' | 'seats'

export interface ActivityFilter {
  dayRange: DayRange
  hourRange: HourRange
  sort: ActivitySort
  /** ซ่อนกิจกรรมที่เต็มและคิวสำรอง */
  onlyAvailable: boolean
}

export const DEFAULT_ACTIVITY_FILTER: ActivityFilter = {
  dayRange: 'all',
  hourRange: 'all',
  sort: 'date',
  onlyAvailable: false,
}

export const DAY_RANGE_OPTIONS: { value: DayRange; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'weekday', label: 'วันธรรมดา' },
  { value: 'weekend', label: 'เสาร์-อาทิตย์' },
]

export const HOUR_RANGE_OPTIONS: { value: HourRange; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'short', label: '1–2 ชม.' },
  { value: 'long', label: '3 ชม. ขึ้นไป' },
]

export const SORT_OPTIONS: { value: ActivitySort; label: string }[] = [
  { value: 'date', label: 'วันที่' },
  { value: 'hours', label: 'ชั่วโมงมากสุด' },
  { value: 'seats', label: 'ที่นั่งว่างมากสุด' },
]

const WEEKEND_PREFIXES = ['ส.', 'อา.']

/** วันที่ในข้อมูลจำลองเป็นข้อความ เช่น "ส. 2 ส.ค." — ดูจากตัวย่อวันหน้าสุด */
function isWeekend(date: string): boolean {
  const [dayToken] = date.trim().split(' ')

  return WEEKEND_PREFIXES.includes(dayToken)
}

function seatsLeft(activity: ActivitySummary): number {
  return activity.capacity - activity.joined
}

/** จำนวนตัวกรองที่ต่างจากค่าเริ่มต้น — ใช้โชว์ badge บนปุ่มตัวกรอง */
export function countActiveFilters(filter: ActivityFilter): number {
  return (Object.keys(DEFAULT_ACTIVITY_FILTER) as (keyof ActivityFilter)[]).filter(
    (key) => filter[key] !== DEFAULT_ACTIVITY_FILTER[key],
  ).length
}

/** กรอง + เรียงรายการกิจกรรม (pure — ไม่แก้ไข array เดิม) */
export function applyActivityFilter<T extends ActivitySummary>(
  activities: readonly T[],
  filter: ActivityFilter,
): T[] {
  const filtered = activities.filter((activity) => {
    if (filter.dayRange !== 'all') {
      const weekend = isWeekend(activity.date)
      if (filter.dayRange === 'weekend' ? !weekend : weekend) return false
    }

    if (filter.hourRange === 'short' && activity.hours > 2) return false
    if (filter.hourRange === 'long' && activity.hours < 3) return false

    if (filter.onlyAvailable && seatsLeft(activity) <= 0) return false

    return true
  })

  /* 'date' = คงลำดับจากต้นทาง (ของจริงให้ API เรียงมาให้ตั้งแต่แรก) */
  if (filter.sort === 'hours') {
    return filtered.sort((a, b) => b.hours - a.hours)
  }

  if (filter.sort === 'seats') {
    return filtered.sort((a, b) => seatsLeft(b) - seatsLeft(a))
  }

  return filtered
}
