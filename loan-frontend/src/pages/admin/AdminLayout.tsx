import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getInitials } from '@/utils'
import './admin.css'

const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard', to: '/admin/dashboard' },
  { icon: 'ti-chart-bar', label: 'Analytics', to: '/admin/analytics' },
  { icon: 'ti-file-text', label: 'My loans', to: '/loans' },
  { icon: 'ti-files', label: 'All loans', to: '/admin/loans' },
  { icon: 'ti-users', label: 'Borrowers', to: '/admin/borrowers' },
  { icon: 'ti-report-analytics', label: 'Reports', to: '/admin/reports' },
  { icon: 'ti-receipt', label: 'Invoices', to: '/admin/invoices' },
  { icon: 'ti-arrows-right-left', label: 'Transactions', to: '/admin/transactions' },
]
const NAV_BOTTOM = [
  { icon: 'ti-settings', label: 'Settings', to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]

interface Props {
  title?: string
  subtitle?: string
  children: React.ReactNode
}

/** Shared admin shell: teal sidebar + sticky top bar. Wrap any admin page in it. */
export const AdminLayout: React.FC<Props> = ({ title, subtitle, children }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const link = ({ isActive }: { isActive: boolean }) => `ad-link${isActive ? ' active' : ''}`

  return (
    <div className="ad">
      <div className={`ad-scrim${open ? ' open' : ''}`} onClick={close} />
      <aside className={`ad-side${open ? ' open' : ''}`}>
        <div className="ad-brand">
          <div className="ad-mark">LF</div>
          <div><b>LoanFlow</b><small>Admin portal</small></div>
        </div>

        <nav className="ad-nav">
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavLink key={to} to={to} onClick={close} className={link}>
              <i className={`ti ${icon}`} aria-hidden="true" />{label}
            </NavLink>
          ))}
          <div className="ad-sep" />
          {NAV_BOTTOM.map(({ icon, label, to }) => (
            <NavLink key={to} to={to} onClick={close} className={link}>
              <i className={`ti ${icon}`} aria-hidden="true" />{label}
            </NavLink>
          ))}
          <div className="ad-sep" />
          <button className="ad-link" onClick={() => { logout(); navigate('/login') }}>
            <i className="ti ti-logout" aria-hidden="true" />Log out
          </button>
        </nav>

        <div className="ad-user">
          <div className="av">{getInitials(user?.name ?? 'A')}</div>
          <div><b>{user?.name}</b><small>{user?.role?.replace(/_/g, ' ').toLowerCase()}</small></div>
        </div>
      </aside>

      <div className="ad-main">
        <header className="ad-top">
          <button className="ad-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <i className="ti ti-menu-2" />
          </button>
          {title && (
            <div className="ad-ttl">
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          )}
          <div className="ad-spacer" />
          <div className="ad-me" title="Profile">{getInitials(user?.name ?? 'A')}</div>
        </header>
        <main className="ad-content">{children}</main>
      </div>
    </div>
  )
}