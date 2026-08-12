import { GraduationCap } from 'lucide-react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="bg-surface flex min-h-dvh flex-col md:items-center md:justify-center md:p-6">
      <header className="bg-brand-gradient px-6 pt-12 pb-16 text-white md:hidden">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <GraduationCap className="size-8" strokeWidth={1.75} />
        </div>
        <p className="mt-5 text-lg font-semibold text-white">ระบบจัดการกิจกรรมนักศึกษา</p>
        <p className="mt-1 text-sm text-white/80">กิจกกรรมของ นักศึกษาหาง่าย ได้ที่นี้</p>
      </header>

      <main className="-mt-8 flex-1 rounded-t-3xl bg-white px-6 pt-8 pb-10 shadow-sm md:mt-0 md:w-full md:max-w-md md:flex-none md:rounded-3xl md:p-10 md:shadow-lg">
        <div className="mb-8 hidden text-center md:block">
          <div className="bg-brand-gradient mx-auto flex size-14 items-center justify-center rounded-2xl text-white">
            <GraduationCap className="size-8" strokeWidth={1.75} />
          </div>
          <p className="mt-4 font-semibold">ระบบจัดการกิจกรรมนักศึกษา</p>
        </div>

        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
