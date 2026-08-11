export type TimePeriod = 'morning' | 'noon' | 'afternoon' | 'evening' | 'night'

export interface PeriodInfo {
  period: TimePeriod
  label: string
  emoji: string
  greeting: string
}

interface PeriodRule {
  period: TimePeriod
  label: string
  emoji: string
  startMinutes: number
}

const toMinutes = (hour: number, minute = 0) => hour * 60 + minute

const PERIOD_RULES: PeriodRule[] = [
  { period: 'morning', label: 'ตอนเช้า', emoji: '🌤️', startMinutes: toMinutes(5) },
  { period: 'noon', label: 'ตอนกลางวัน', emoji: '☀️', startMinutes: toMinutes(11) },
  { period: 'afternoon', label: 'ตอนบ่าย', emoji: '🌇', startMinutes: toMinutes(13) },
  { period: 'evening', label: 'ตอนเย็น', emoji: '🌆', startMinutes: toMinutes(16) },
  { period: 'night', label: 'ตอนค่ำ', emoji: '🌙', startMinutes: toMinutes(19) },
]

const NIGHT_RULE = PERIOD_RULES[PERIOD_RULES.length - 1]

const toInfo = ({ period, label, emoji }: PeriodRule): PeriodInfo => ({
  period,
  label,
  emoji,
  greeting: `สวัสดี${label}`,
})

export function getPeriodInfo(date: Date = new Date()): PeriodInfo {
  const minutes = toMinutes(date.getHours(), date.getMinutes())

  const matched = PERIOD_RULES.reduce<PeriodRule | null>(
    (found, rule) => (minutes >= rule.startMinutes ? rule : found),
    null,
  )

  return toInfo(matched ?? NIGHT_RULE)
}

export function getTimePeriod(date: Date = new Date()): TimePeriod {
  return getPeriodInfo(date).period
}

export function detectionTimePeriod(date: Date = new Date()): string {
  return getPeriodInfo(date).greeting
}

export default detectionTimePeriod
