export type ParticipationStatus =
  | 'registered'
  | 'checked-in'
  | 'pending'
  | 'approved'
  | 'cancel-requested'
  | 'cancelled'
  | 'rejected'

export interface ParticipationStatusMeta {
  label: string
  /** สีพื้น + สีตัวอักษรของป้ายสถานะ */
  className: string
  /** สีจุดนำหน้าป้าย */
  dotClassName: string
}

export const PARTICIPATION_STATUS_META: Record<ParticipationStatus, ParticipationStatusMeta> = {
  registered: {
    label: 'ลงทะเบียนแล้ว',
    className: 'bg-primary-50 text-primary-700',
    dotClassName: 'bg-primary',
  },
  'checked-in': {
    label: 'เช็คอินแล้ว',
    className: 'bg-accent-50 text-accent-700',
    dotClassName: 'bg-accent',
  },
  pending: {
    label: 'รออนุมัติ',
    className: 'bg-warning/10 text-warning',
    dotClassName: 'bg-warning',
  },
  approved: {
    label: 'อนุมัติแล้ว',
    className: 'bg-success/10 text-success',
    dotClassName: 'bg-success',
  },
  'cancel-requested': {
    label: 'ขอยกเลิก',
    className: 'bg-warning/10 text-warning',
    dotClassName: 'bg-warning',
  },
  cancelled: {
    label: 'ยกเลิกแล้ว',
    className: 'bg-ink-100 text-ink-500',
    dotClassName: 'bg-ink-400',
  },
  rejected: {
    label: 'ไม่อนุมัติ',
    className: 'bg-danger/10 text-danger',
    dotClassName: 'bg-danger',
  },
}
