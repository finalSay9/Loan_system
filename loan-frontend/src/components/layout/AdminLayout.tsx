import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getInitials } from '@/utils'

const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard',    to: '/admin/dashboard' },
  { icon: 'ti-chart-bar',        label: 'Analytics',    to: '/admin/analytics' },
  { icon: 'ti-files',            label: 'All Loans',    to: '/admin/loans' },
  { icon: 'ti-users',            label: 'Borrowers',    to: '/admin/borrowers' },
  { icon: 'ti-shield-check',     label: 'KYC',          to: '/admin/kyc' },
  { icon: 'ti-report-analytics', label: 'Reports',      to: '/admin/reports' },
  { icon: 'ti-user-shield',      label: 'Staff',        to: '/admin/staff' },
  { icon: 'ti-file-text',        label: 'My Loans',     to: '/loans' },
]

const NAV_BOTTOM = [
  { icon: 'ti-settings',    label: 'Settings',  to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]

const SidebarContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#00C9A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#0a1420', fontWeight: 900, fontSize: 11 }}>LF</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>LoanFlow</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Admin portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 7, fontSize: 13,
              fontWeight: 500, textDecoration: 'none', transition: 'all .15s',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
            })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18, flexShrink: 0 }} />
            {label}
          </NavLink>
        ))}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 10px' }} />

        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 7, fontSize: 13,
              fontWeight: 500, textDecoration: 'none',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
            })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18, flexShrink: 0 }} />
            {label}
          </NavLink>
        ))}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 10px' }} />

        <button onClick={() => { logout(); navigate('/login') }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontWeight: 500 }}>
          <i className="ti ti-logout" style={{ fontSize: 16, width: 18 }} />
          Log out
        </button>
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{getInitials(user?.name ?? 'A')}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{user?.role?.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AdminLayout: React.FC<{
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}> = ({ children, title, subtitle, actions }) => {
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F6FA' }}>
      {/* Desktop sidebar */}
      <aside style={{ width: 220, background: '#1a3a6b', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30 }}
        className="admin-sidebar-desktop">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'relative', width: 240, background: '#1a3a6b', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setSidebarOpen(false)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 20, zIndex: 1 }}>✕</button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        className="admin-main">

        {/* Topbar */}
        <header style={{ padding: '12px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', position: 'sticky', top: 0, zIndex: 20, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(true)}
            className="admin-menu-btn"
            style={{ display: 'none', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4 }}>
            <i className="ti ti-menu-2" style={{ fontSize: 22 }} />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h1>
            {subtitle && <p style={{ fontSize: 12, color: '#6B7280', margin: 0, marginTop: 1 }}>{subtitle}</p>}
          </div>
          <div style={{ flex: 1 }} />
          {actions}
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{getInitials(user?.name ?? 'A')}</span>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {children}
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .admin-sidebar-desktop { display: none !important }
          .admin-main { margin-left: 0 !important }
          .admin-menu-btn { display: flex !important }
        }
      `}</style>
    </div>
  )
}