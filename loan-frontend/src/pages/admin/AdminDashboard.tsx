import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllLoans } from '@/api'
import { useAuthStore } from '@/store/auth.store'
import { formatCurrency, formatDate, getInitials } from '@/utils'
import api from '@/api/client'
import './admin.css'

// ── Constants ────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard', to: '/admin/dashboard' },
  { icon: 'ti-chart-bar', label: 'Analytics', to: '/admin/analytics' },
  { icon: 'ti-file-text', label: 'My loans', to: '/loans' },
  { icon: 'ti-files', label: 'All loans', to: '/admin/loans' },
  { icon: 'ti-users', label: 'Borrowers', to: '/admin/borrowers' },
  { icon: 'ti-receipt', label: 'Invoices', to: '/admin/invoices' },
  { icon: 'ti-arrows-right-left', label: 'Transactions', to: '/admin/transactions' },
]
const NAV_BOTTOM = [
  { icon: 'ti-settings', label: 'Settings', to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const STATUS_PILL: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:      { label: 'Pending',      bg: '#FDF1D6', color: '#92620A' },
  UNDER_REVIEW: { label: 'Under review', bg: '#D5F3EF', color: '#0B6B63' },
  APPROVED:     { label: 'Approved',     bg: '#E3F5DC', color: '#2F6B12' },
  DISBURSED:    { label: 'Disbursed',    bg: '#DEEEFB', color: '#185FA5' },
  CLOSED:       { label: 'Closed',       bg: '#EEF2F2', color: '#5B6B6A' },
  DEFAULTED:    { label: 'Defaulted',    bg: '#FCE8E6', color: '#B42318' },
  REJECTED:     { label: 'Rejected',     bg: '#FCE8E6', color: '#B42318' },
  CANCELLED:    { label: 'Cancelled',    bg: '#EEF2F2', color: '#5B6B6A' },
}

const AVATAR_COLORS = [
  { bg: '#D5F3EF', color: '#0F766E' },
  { bg: '#DEEEFB', color: '#185FA5' },
  { bg: '#FDF1D6', color: '#92620A' },
  { bg: '#E3F5DC', color: '#2F6B12' },
  { bg: '#EAE8FB', color: '#534AB7' },
  { bg: '#FBE7EE', color: '#993556' },
]
const SAT_COLORS = ['#0F766E', '#14B8A6', '#F5B83D', '#E5484D']

// ── Sidebar (defined outside so it isn't remounted on every render) ──
interface SidebarProps {
  open: boolean
  onClose: () => void
  onLogout: () => void
  name?: string
  role?: string
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onLogout, name, role }) => {
  const link = ({ isActive }: { isActive: boolean }) => `ad-link${isActive ? ' active' : ''}`
  return (
    <>
      <div className={`ad-scrim${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`ad-side${open ? ' open' : ''}`}>
        <div className="ad-brand">
          <div className="ad-mark">LF</div>
          <div><b>LoanFlow</b><small>Admin portal</small></div>
        </div>

        <nav className="ad-nav">
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavLink key={to} to={to} onClick={onClose} className={link}>
              <i className={`ti ${icon}`} aria-hidden="true" />{label}
            </NavLink>
          ))}
          <div className="ad-sep" />
          {NAV_BOTTOM.map(({ icon, label, to }) => (
            <NavLink key={to} to={to} onClick={onClose} className={link}>
              <i className={`ti ${icon}`} aria-hidden="true" />{label}
            </NavLink>
          ))}
          <div className="ad-sep" />
          <button className="ad-link" onClick={onLogout}>
            <i className="ti ti-logout" aria-hidden="true" />Log out
          </button>
        </nav>

        <div className="ad-user">
          <div className="av">{getInitials(name ?? 'A')}</div>
          <div><b>{name}</b><small>{role?.replace(/_/g, ' ').toLowerCase()}</small></div>
        </div>
      </aside>
    </>
  )
}

// ── Component ─────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  // ── Data fetching (unchanged) ──
  const { data: loansData } = useQuery({
    queryKey: ['admin-loans'],
    queryFn: () => getAllLoans(),
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  })
  const loans = loansData?.data ?? []

  const { data: statsData } = useQuery({
    queryKey: ['monthly-stats'],
    queryFn: () => api.get('/loans/stats/monthly').then(r => r.data),
  })
  const { data: satisfactionData } = useQuery({
    queryKey: ['satisfaction'],
    queryFn: () => api.get('/feedback/stats').then(r => r.data),
  })

  // ── Derived stats ──
  const totalPortfolio = loans.reduce((s, l) => s + Number(l.amount), 0)
  const totalRepaidAdmin = loans.reduce((s, l) => s + ((l as any).balance?.totalPaid ?? 0), 0)
  const totalOutstandingAdmin = loans.reduce((s, l) => s + ((l as any).balance?.outstanding ?? 0), 0)
  const activeLoans = loans.filter(l => l.status === 'DISBURSED').length
  const pendingLoans = loans.filter(l => ['PENDING', 'UNDER_REVIEW'].includes(l.status)).length

  // ── Bar chart ──
  const rawMonths: { month: number; count: number }[] = statsData?.data ?? []
  const maxCount = Math.max(...rawMonths.map(m => m.count), 1)
  const barHeights = MONTHS.map((_, i) => {
    const found = rawMonths.find(m => m.month === i + 1)
    return found ? Math.round((found.count / maxCount) * 100) : 0
  })
  const peak = Math.max(...barHeights)

  // ── Satisfaction ──
  const satRows: { label: string; percentage: number; color: string }[] = satisfactionData?.data
    ? satisfactionData.data.map((r: any, idx: number) => ({
        label: r.label, percentage: r.percentage, color: SAT_COLORS[idx] ?? '#ccc',
      }))
    : ['Excellent', 'Good', 'Neutral', 'Poor'].map((label, i) => ({ label, percentage: 0, color: SAT_COLORS[i] }))
  const overallPct: number = satisfactionData?.overallPercentage ?? 0
  const totalResponses: number = satisfactionData?.total ?? 0

  // ── Table rows ──
  const filtered = loans
    .filter(l => search === '' || JSON.stringify(l).toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8)
  const tableRows = filtered.length > 0 ? filtered : loans.slice(0, 6)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="ad">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        name={user?.name}
        role={user?.role}
      />

      <div className="ad-main">
        {/* Top bar */}
        <header className="ad-top">
          <button className="ad-menu" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
            <i className="ti ti-menu-2" />
          </button>
          <div className="ad-search">
            <i className="ti ti-search" aria-hidden="true" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search loans, borrowers…" />
          </div>
          <div className="ad-spacer" />
          <button className="ad-icon ad-hide-s" aria-label="Messages"><i className="ti ti-message-circle" /></button>
          <button className="ad-icon" aria-label="Notifications">
            <i className="ti ti-bell" /><span className="ad-dot" />
          </button>
          <div className="ad-me" title="Profile">{getInitials(user?.name ?? 'A')}</div>
        </header>

        <main className="ad-content">
          <div className="ad-head">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name?.split(' ')[0]}. Here's what's happening today.</p>
          </div>

          {/* Stat cards */}
          <div className="ad-stats">
            <div className="ad-card ad-stat hero">
              <div className="ad-stat-top">
                <span>Total portfolio</span>
                <div className="ad-chip"><i className="ti ti-coin" /></div>
              </div>
              <strong>{formatCurrency(totalPortfolio)}</strong>
              <em>All loans ever issued</em>
            </div>

            <div className="ad-card ad-stat">
              <div className="ad-stat-top">
                <span>Total repaid</span>
                <div className="ad-chip"><i className="ti ti-check" /></div>
              </div>
              <strong>{formatCurrency(totalRepaidAdmin)}</strong>
              <em>Collected from borrowers</em>
            </div>

            <div className="ad-card ad-stat">
              <div className="ad-stat-top">
                <span>Outstanding</span>
                <div className="ad-chip amber"><i className="ti ti-clock" /></div>
              </div>
              <strong>{formatCurrency(totalOutstandingAdmin)}</strong>
              <em>Still owed by borrowers</em>
            </div>

            <div className="ad-card ad-stat">
              <div className="ad-stat-top">
                <span>Active loans</span>
                <div className="ad-chip"><i className="ti ti-users" /></div>
              </div>
              <strong>{activeLoans}</strong>
              <em>{pendingLoans} pending review</em>
            </div>
          </div>

          {/* Charts */}
          <div className="ad-charts">
            <div className="ad-card ad-panel">
              <div className="ad-panel-head">
                <div>
                  <h2>Borrow statistics</h2>
                  <div className="sub">Loan applications per month, {new Date().getFullYear()}</div>
                </div>
              </div>
              <div className="ad-bars" role="img" aria-label="Monthly loan applications bar chart">
                {MONTHS.map((m, i) => (
                  <div key={m} className={`ad-bar${barHeights[i] > 0 && barHeights[i] === peak ? ' peak' : ''}`}>
                    <div style={{ height: `${Math.max(barHeights[i], 4)}%` }} />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              {rawMonths.length === 0 && <p className="ad-empty">No applications yet this year</p>}
            </div>

            <div className="ad-card ad-panel">
              <div className="ad-panel-head">
                <div>
                  <h2>Customer satisfaction</h2>
                  <div className="sub">Based on borrower feedback</div>
                </div>
                <span className="ad-big">{totalResponses > 0 ? `${overallPct}%` : '—'}</span>
              </div>
              <div className="ad-sat">
                {satRows.map(row => (
                  <div key={row.label} className="ad-sat-row">
                    <span className="l">{row.label}</span>
                    <div className="t"><div style={{ width: `${row.percentage}%`, background: row.color }} /></div>
                    <span className="p">{row.percentage}%</span>
                  </div>
                ))}
              </div>
              <div className="ad-foot">
                <span>{totalResponses > 0 ? `${totalResponses} responses total` : 'No feedback yet'}</span>
                <NavLink to="/admin/loans" className="ad-more">View all</NavLink>
              </div>
            </div>
          </div>

          {/* Recent loans */}
          <div className="ad-card" style={{ overflow: 'hidden' }}>
            <div className="ad-table-head">
              <h2>Recent loan applications</h2>
              <NavLink to="/admin/loans" className="ad-more">View all</NavLink>
            </div>
            <div className="ad-scroll">
              <table>
                <thead>
                  <tr>
                    {['Borrower', 'Amount', 'Purpose', 'Term', 'Date applied', 'Status'].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.length === 0 ? (
                    <tr><td colSpan={6} className="ad-none">No loans yet. New applications will show up here.</td></tr>
                  ) : (
                    tableRows.map((loan, i) => {
                      const l = loan as any
                      const ac = AVATAR_COLORS[i % AVATAR_COLORS.length]
                      const pill = STATUS_PILL[loan.status] ?? STATUS_PILL.CLOSED
                      const name: string = l.user?.name ?? `Borrower ${i + 1}`
                      const phone: string = l.user?.phone ?? '+265 9XX XXX XXX'
                      const avatarUrl: string | null = l.user?.avatarUrl ?? null

                      return (
                        <tr key={loan.id}>
                          <td>
                            <div className="ad-who">
                              {avatarUrl ? (
                                <img className="a" src={`http://localhost:3200${avatarUrl}`} alt={name} />
                              ) : (
                                <div className="a" style={{ background: ac.bg, color: ac.color }}>{getInitials(name)}</div>
                              )}
                              <div><b>{name}</b><small>{phone}</small></div>
                            </div>
                          </td>
                          <td className="num">{formatCurrency(Number(loan.amount))}</td>
                          <td className="purpose">{loan.purpose}</td>
                          <td>{loan.termMonths} mo</td>
                          <td className="muted">{formatDate(loan.createdAt)}</td>
                          <td>
                            <span className="ad-pill" style={{ background: pill.bg, color: pill.color }}>{pill.label}</span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}