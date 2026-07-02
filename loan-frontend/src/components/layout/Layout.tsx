import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, User, LogOut, Shield, Menu, X } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { getInitials } from '@/utils'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/loans',     icon: FileText,        label: 'My Loans' },
  { to: '/profile',   icon: User,            label: 'Profile' },
]

const ADMIN_NAV = [
  { to: '/admin/loans', icon: Shield, label: 'All Loans' },
]

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'LOAN_OFFICER'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const allNav = isAdmin ? [...NAV, ...ADMIN_NAV] : NAV

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#243447]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00C9A7] flex items-center justify-center">
            <span className="text-[#0F1B2D] font-black text-xs">LF</span>
          </div>
          <div>
            <p className="font-bold text-[#F0F4F8] text-sm leading-none">LoanFlow</p>
            <p className="text-[10px] text-[#8899AA] mt-0.5">Financial Services</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {allNav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to} to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#00C9A720] text-[#00C9A7] border border-[#00C9A730]'
                  : 'text-[#8899AA] hover:text-[#F0F4F8] hover:bg-[#243447]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-[#243447]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2">
          <div className="w-8 h-8 rounded-full bg-[#00C9A720] border border-[#00C9A740] flex items-center justify-center shrink-0">
            <span className="text-[#00C9A7] text-xs font-bold">{getInitials(user?.name ?? 'U')}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F4F8] truncate">{user?.name}</p>
            <p className="text-xs text-[#8899AA] truncate">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8899AA] hover:text-[#FF4D4F] hover:bg-[#FF4D4F10] transition-all"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-[#0F1B2D]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#1E2D3D] border-r border-[#243447] fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-[#1E2D3D] border-r border-[#243447] flex flex-col animate-fade-in">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-[#8899AA] hover:text-[#F0F4F8]">
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#1E2D3D] border-b border-[#243447] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-[#8899AA] hover:text-[#F0F4F8]">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#00C9A7] flex items-center justify-center">
                <span className="text-[#0F1B2D] font-black text-[10px]">LF</span>
              </div>
              <span className="font-bold text-[#F0F4F8] text-sm">LoanFlow</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#00C9A720] border border-[#00C9A740] flex items-center justify-center">
            <span className="text-[#00C9A7] text-xs font-bold">{getInitials(user?.name ?? 'U')}</span>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
          {children}
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#1E2D3D] border-t border-[#243447] z-20">
          <div className="flex">
            {allNav.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to} to={to}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${
                    isActive ? 'text-[#00C9A7]' : 'text-[#4A6080]'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </main>
    </div>
  )
}
