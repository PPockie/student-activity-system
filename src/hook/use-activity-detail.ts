import { useEffect, useState } from 'react'
import { fetchActivityById } from '../mocks/activities'
import type { ActivityDetail } from '../types/activity'

export interface ActivityDetailState {
  activity: ActivityDetail | null
  loading: boolean
  error: Error | null
}

/**
 * ดึงรายละเอียดกิจกรรมตาม id — ส่ง `null` เพื่อไม่ให้ยิงข้อมูล (เช่นตอนป๊อปอัพปิดอยู่)
 * ผลลัพธ์ของ id เก่าจะถูกทิ้งเมื่อ id เปลี่ยนระหว่างโหลด
 */
export function useActivityDetail(id: string | number | null): ActivityDetailState {
  const [state, setState] = useState<ActivityDetailState>({
    activity: null,
    loading: id !== null,
    error: null,
  })

  useEffect(() => {
    if (id === null) {
      setState({ activity: null, loading: false, error: null })
      return
    }

    let active = true
    setState({ activity: null, loading: true, error: null })

    fetchActivityById(id)
      .then((activity) => {
        if (active) setState({ activity, loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            activity: null,
            loading: false,
            error: error instanceof Error ? error : new Error('โหลดข้อมูลกิจกรรมไม่สำเร็จ'),
          })
        }
      })

    return () => {
      active = false
    }
  }, [id])

  return state
}

export default useActivityDetail
