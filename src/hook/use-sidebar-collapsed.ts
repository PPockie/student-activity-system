import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'sidebar-hidden'
const CHANGE_EVENT = 'sidebar-hidden-change'

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function getSnapshot(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

export function useSidebarCollapsed(): [boolean, () => void] {
  const collapsed = useSyncExternalStore(subscribe, getSnapshot)

  const toggle = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, String(!getSnapshot()))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return [collapsed, toggle]
}

export default useSidebarCollapsed
