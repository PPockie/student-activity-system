import { NavLink } from 'react-router-dom'
import type { NavItem } from './nav-item'

export interface BottomTabBarProps {
  items: NavItem[]
}

/** แถบเมนูล่างสำหรับมือถือ — ซ่อนอัตโนมัติตั้งแต่ md ขึ้นไป */
function BottomTabBar({ items }: BottomTabBarProps) {
  return (
    <nav className="border-ink-100 fixed inset-x-0 bottom-0 z-20 border-t py-1 bg-white md:hidden">
      <ul
        className="grid pb-[env(safe-area-inset-bottom)]"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map(({ label, to, icon: Icon, end, badge }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-ink-400',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon className="size-6" strokeWidth={isActive ? 2.25 : 1.75} />
                    {!!badge && (
                      <span className="bg-danger absolute -top-1 -right-2 min-w-4 rounded-full px-1 text-[10px] leading-4 font-medium text-white">
                        {badge > 99 ? '99+' : badge}
                      </span>
                    )}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomTabBar
