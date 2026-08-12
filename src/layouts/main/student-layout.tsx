import { Badge } from "antd";
import {
  Bell,
  House,
  UserRound,
  Search,
  ScanLine,
  RotateCcwClock,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppLogo from "../../components/ui/app-logo";
import BottomTabBar from "../../components/ui/bottom-tab-bar";
import Sidebar from "../../components/ui/sidebar";
import type { NavItem } from "../../components/ui/nav-item";
import { useAuth } from "../../hook/auth-context";
import { getPeriodInfo } from "../../utils/detection-time-period";
import { ROLE_LABEL } from "../../utils/roles";

const NAV_ITEMS: NavItem[] = [
  { label: "หน้าหลัก", to: "/student", icon: House, end: true },
  { label: "กิจกรรม", to: "/student/activities", icon: Search },
  { label: "เช็คอินเอาท์", to: "/student/check-in-out", icon: ScanLine },
  { label: "ประวัติ", to: "/student/history", icon: RotateCcwClock },
  { label: "โปรไฟล์", to: "/student/profile", icon: UserRound },
];

const HOME_PATH = NAV_ITEMS[0].to;

function StudentLayout() {
  const { user } = useAuth();
  const { greeting, emoji } = getPeriodInfo();
  const { pathname } = useLocation();
  const isHome = pathname.replace(/\/+$/, "") === HOME_PATH;

  return (
    /* h-dvh + overflow-hidden = โครงหน้าไม่เลื่อน ให้แต่ละหน้าเลือกเองว่าจะให้ส่วนไหนเลื่อน */
    <div className="bg-surface flex h-dvh overflow-hidden">
      <div className="z-20 hidden h-full shrink-0 md:block">
        <Sidebar items={NAV_ITEMS} subtitle={ROLE_LABEL.student} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {isHome && (
          <header className="border-ink-100 z-10 flex h-20 shrink-0 items-center justify-between border-b bg-white/90 px-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-4">
              <AppLogo className="size-11 md:hidden" />

              {/* คำทักทาย + ชื่อ แสดงเฉพาะหน้าหลัก */}
              <div className="min-w-0">
                <p className="text-ink-500 text-xs">
                  {greeting} {emoji}
                </p>
                <h3 className="text-lg truncate font-semibold whitespace-nowrap text-ellipsis">
                  {user?.name}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge count={2} size="medium" offset={[-2, 2]}>
                <Link
                  to="/student/notifications"
                  aria-label="การแจ้งเตือน"
                  className="text-ink-600 hover:text-primary block p-3 border border-neutral-500/20 rounded-md transition-colors"
                >
                  <Bell className="size-5" strokeWidth={1.75} />
                </Link>
              </Badge>
            </div>
          </header>
        )}

        {/* padding ล่าง = ความสูง bottom tab bar + safe area (มือถือ) เพื่อไม่ให้เนื้อหาลอดใต้แถบ */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-5 pb-[calc(4rem+env(safe-area-inset-bottom))] md:px-8 md:pb-6">
          <Outlet />
        </main>
      </div>

      <BottomTabBar items={NAV_ITEMS} />
    </div>
  );
}

export default StudentLayout;
