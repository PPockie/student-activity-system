import { ChevronLeft, GraduationCap } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSidebarCollapsed } from "../../hook/use-sidebar-collapsed";
import type { NavItem } from "./nav-item";

export interface SidebarProps {
  items: NavItem[];
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
}

function Sidebar({ items, subtitle, footer, className = "" }: SidebarProps) {
  const [isHidden, toggleSidebar] = useSidebarCollapsed();

  return (
    <aside
      className={`relative border-ink-100 flex h-full flex-col border-r bg-white transition-[width] duration-200 ${
        isHidden ? "w-24" : "w-64"
      } ${className}`}
    >

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isHidden ? "แสดงแถบเมนู" : "ซ่อนแถบเมนู"}
        aria-expanded={!isHidden}
        title={isHidden ? "แสดงแถบเมนู" : "ซ่อนแถบเมนู"}
        className="border-ink-200 text-ink-500 hover:text-primary cursor-pointer hover:border-primary-200 absolute top-5 -right-5 z-40 flex size-10 items-center justify-center rounded-full border bg-white transition-colors"
      >
        <ChevronLeft
          className={`size-5 transition-transform ${isHidden ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`flex items-center gap-3 py-6 ${isHidden ? "justify-center px-2" : "px-5"}`}
      >
        <div className="bg-brand-gradient flex size-10 shrink-0 items-center justify-center rounded-xl text-white">
          <GraduationCap className="size-6" strokeWidth={1.75} />
        </div>
        {!isHidden && (
          <div className="min-w-0">
            <h3 className="truncate font-semibold">ระบบหาไรทำกัน</h3>
            {subtitle && (
              <p className="text-ink-500 truncate text-xs">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      <nav className={`flex-1 overflow-y-auto ${isHidden ? "px-2" : "px-3"}`}>
        <ul className="space-y-1">
          {items.map(({ label, to, icon: Icon, end, badge }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                title={isHidden ? label : undefined}
                className={({ isActive }) =>
                  [
                    "flex rounded-md transition-colors",
                    // ย่อ: ไอคอนอยู่บน label อยู่ใต้ไอคอน | ปกติ: เรียงแนวนอน
                    isHidden
                      ? "flex-col items-center gap-1 px-1 py-2.5 text-center text-[11px] leading-tight"
                      : "items-center gap-3 px-3 py-2.5 text-sm",
                    isActive
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900 font-regular",
                  ].join(" ")
                }
              >
                <span className="relative shrink-0">
                  <Icon className={isHidden ? "size-6" : "size-5"} strokeWidth={1.75} />
                  {/* ย่อแล้วไม่มีที่ให้ badge ต่อท้าย — ย้ายไปเกาะมุมไอคอนแทน */}
                  {isHidden && !!badge && (
                    <span className="bg-danger absolute -top-1 -right-2 min-w-4 rounded-full px-1 text-[10px] leading-4 font-medium text-white">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </span>

                <span className={isHidden ? "w-full truncate" : "flex-1 truncate"}>
                  {label}
                </span>

                {!isHidden && !!badge && (
                  <span className="bg-danger min-w-5 rounded-full px-1.5 text-center text-[11px] leading-5 font-medium text-white">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {footer && (
        <div className={`border-ink-100 border-t p-3 ${isHidden ? "text-center text-xs" : ""}`}>
          {footer}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
