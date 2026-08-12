import { useCallback, useSyncExternalStore } from 'react'

/** ตรงกับ breakpoint `md` ของ Tailwind */
export const MD_BREAKPOINT = '(min-width: 768px)'

/**
 * ติดตามผลลัพธ์ของ media query แบบ reactive
 * ค่าฝั่ง server/prerender คืน false เสมอ (mobile-first)
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)

      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** จอเล็กกว่า md — ใช้เลือกว่าจะแสดงเป็น bottom sheet หรือ drawer */
export function useIsMobile(): boolean {
  return !useMediaQuery(MD_BREAKPOINT)
}

export default useMediaQuery
