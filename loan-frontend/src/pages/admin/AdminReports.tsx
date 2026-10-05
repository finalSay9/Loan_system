import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { getInitials, formatDate } from '@/utils'
import {
  getReportSummary,
  getDisbursementReport,
  getCollectionsReport,
  getDelinquencyReport,
  exportDisbursements,
  exportCollections,
  exportDelinquency,
} from '@/api/backoffice'

// ── Nav (same as AdminDashboard) ─────────────────────────
const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard',    to: '/admin/dashboard' },
  { icon: 'ti-chart-bar',        label: 'Analytics',    to: '/admin/analytics' },
  { icon: 'ti-file-text',        label: 'My loans',     to: '/loans' },
  { icon: 'ti-files',            label: 'All loans',    to: '/admin/loans' },
  { icon: 'ti-users',            label: 'Borrowers',    to: '/admin/borrowers' },
  { icon: 'ti-report-analytics', label: 'Reports',      to: '/admin/reports' },
  { icon: 'ti-receipt',          label: 'Invoices',     to: '/admin/invoices' },
  { icon: 'ti-arrows-right-left',label: 'Transactions', to: '/admin/transactions' },
]
const NAV_BOTTOM = [
  { icon: 'ti-settings',    label: 'Settings',  to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]

// ── Helpers ───────────────────────────────────────────────
const today = () => new Date().toISOString().split('T')[0]
const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const fmtMWK = (val: string | number) =>
  `MWK ${Number(val).toLocaleString('en-MW', { minimumFractionDigits: 2 })}`

// ── Sidebar ───────────────────────────────────────────────
const Sidebar: React.FC<{ user: any; logout: () => void; onClose?: () => void }> = ({ user, logout, onClose }) => {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#00C9A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#0a1420', fontWeight: 900, fontSize: 11 }}>LF</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>LoanFlow</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Admin portal</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .15s', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent' })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />
            {label}
          </NavLink>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 10px' }} />
        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: 'none', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent' })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />
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
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
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

// ── Tab types ─────────────────────────────────────────────
type Tab = 'overview' | 'disbursements' | 'collections' | 'delinquency'

// ── Main component ────────────────────────────────────────
export const AdminReports: React.FC = () => {
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [startDate, setStartDate] = useState(daysAgo(30))
  const [endDate, setEndDate] = useState(today())
  const [exporting, setExporting] = useState(false)

  const params = { start: startDate, end: endDate }

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['report-summary', startDate, endDate],
    queryFn: () => getReportSummary(params),
  })

  const { data: disbursements, isLoading: disbLoading } = useQuery({
    queryKey: ['report-disbursements', startDate, endDate],
    queryFn: () => getDisbursementReport(params),
    enabled: activeTab === 'disbursements',
  })

  const { data: collections, isLoading: colLoading } = useQuery({
    queryKey: ['report-collections', startDate, endDate],
    queryFn: () => getCollectionsReport(params),
    enabled: activeTab === 'collections',
  })

  const { data: delinquency, isLoading: delLoading } = useQuery({
    queryKey: ['report-delinquency'],
    queryFn: () => getDelinquencyReport(),
    enabled: activeTab === 'delinquency',
  })

  const handleExport = async () => {
    setExporting(true)
    try {
      let blob: Blob
      let filename: string
      if (activeTab === 'disbursements') {
        blob = await exportDisbursements(params)
        filename = `disbursements-${startDate}-to-${endDate}.csv`
      } else if (activeTab === 'collections') {
        blob = await exportCollections(params)
        filename = `collections-${startDate}-to-${endDate}.csv`
      } else {
        blob = await exportDelinquency()
        filename = `delinquency-${today()}.csv`
      }
      downloadBlob(blob, filename)
    } catch (e) {
      console.error('Export failed', e)
    } finally {
      setExporting(false)
    }
  }

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'overview',      label: 'Overview',      icon: 'ti-layout-dashboard' },
    { key: 'disbursements', label: 'Disbursements',  icon: 'ti-cash' },
    { key: 'collections',   label: 'Collections',    icon: 'ti-circle-check' },
    { key: 'delinquency',   label: 'Delinquency',    icon: 'ti-alert-triangle' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F6FA' }}>
      {/* Desktop sidebar */}
      <aside className="hide-mobile" style={{ width: 220, background: '#1a3a6b', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30 }}>
        <Sidebar user={user} logout={logout} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'relative', width: 240, background: '#1a3a6b', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            <Sidebar user={user} logout={logout} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="main-shift" style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Topbar */}
        <header style={{ padding: '12px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', position: 'sticky', top: 0, zIndex: 20, flexShrink: 0 }}>
          <button className="menu-btn-admin" onClick={() => setSidebarOpen(true)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4 }}>
            <i className="ti ti-menu-2" style={{ fontSize: 22 }} />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Financial Reports</h1>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0, marginTop: 1 }}>Powered by Django backoffice API</p>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{getInitials(user?.name ?? 'A')}</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Date filter row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 16px' }}>
            <i className="ti ti-calendar" style={{ color: '#6B7280', fontSize: 16 }} />
            <label style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
              From
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 13, color: '#111827', outline: 'none' }} />
            </label>
            <label style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
              To
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 13, color: '#111827', outline: 'none' }} />
            </label>
            {/* Quick range buttons */}
            {[
              { label: '7d',  start: daysAgo(7) },
              { label: '30d', start: daysAgo(30) },
              { label: '90d', start: daysAgo(90) },
            ].map(r => (
              <button key={r.label} onClick={() => { setStartDate(r.start); setEndDate(today()) }}
                style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #D1D5DB', background: startDate === r.start ? '#1a3a6b' : '#F9FAFB', color: startDate === r.start ? '#fff' : '#374151', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                Last {r.label}
              </button>
            ))}
            {activeTab !== 'overview' && activeTab !== 'delinquency' && (
              <button onClick={handleExport} disabled={exporting}
                style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: 6, border: 'none', background: '#16A34A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="ti ti-download" style={{ fontSize: 14 }} />
                {exporting ? 'Exporting…' : 'Export CSV'}
              </button>
            )}
            {activeTab === 'delinquency' && (
              <button onClick={handleExport} disabled={exporting}
                style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: 6, border: 'none', background: '#DC2626', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="ti ti-download" style={{ fontSize: 14 }} />
                {exporting ? 'Exporting…' : 'Export CSV'}
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: 4 }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all .15s',
                  background: activeTab === tab.key ? '#1a3a6b' : 'transparent',
                  color: activeTab === tab.key ? '#fff' : '#6B7280',
                }}>
                <i className={`ti ${tab.icon}`} style={{ fontSize: 15 }} />
                <span className="hide-on-mobile">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {summaryLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                  {[1,2,3,4].map(i => <div key={i} style={{ height: 110, borderRadius: 12, background: '#E5E7EB', animation: 'pulse 1.5s infinite' }} />)}
                </div>
              ) : summary?.data && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                    {[
                      { label: 'Loans Disbursed',    value: String(summary.data.disbursements.loan_count),    sub: fmtMWK(summary.data.disbursements.total),       bg: '#FAAD14', color: '#78490A', iconBg: 'rgba(0,0,0,0.15)', icon: 'ti-cash',          valColor: '#1a0e00' },
                      { label: 'Payments Received',   value: String(summary.data.collections.payment_count),  sub: fmtMWK(summary.data.collections.total),        bg: '#DCFCE7', color: '#14532D', iconBg: '#16A34A30',          icon: 'ti-circle-check',  valColor: '#14532D' },
                      { label: 'Overdue Installments',value: String(summary.data.delinquency.installments),   sub: `${summary.data.delinquency.loans} loans`,      bg: '#FEE2E2', color: '#7F1D1D', iconBg: '#DC262630',          icon: 'ti-alert-triangle',valColor: '#7F1D1D' },
                      { label: 'Outstanding Debt',    value: fmtMWK(summary.data.delinquency.outstanding),    sub: `${summary.data.delinquency.borrowers} borrowers`,bg: '#EDE9FE', color: '#3730A3', iconBg: '#4F46E530',          icon: 'ti-coin',          valColor: '#3730A3' },
                    ].map(card => (
                      <div key={card.label} style={{ background: card.bg, borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: card.color, textTransform: 'uppercase', letterSpacing: '.04em' }}>{card.label}</span>
                          <div style={{ width: 30, height: 30, borderRadius: 7, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className={`ti ${card.icon}`} style={{ fontSize: 15, color: card.color }} />
                          </div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: card.valColor, marginBottom: 4 }}>{card.value}</div>
                        <div style={{ fontSize: 11, color: card.color, opacity: 0.8 }}>{card.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '16px 20px' }}>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
                      Period: <strong>{summary.filters.start}</strong> → <strong>{summary.filters.end}</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── DISBURSEMENTS TAB ── */}
          {activeTab === 'disbursements' && (
            <ReportTable
              isLoading={disbLoading}
              rows={disbursements?.data ?? []}
              totals={disbursements?.totals}
              columns={[
                { key: 'date',           label: 'Date' },
                { key: 'loan_count',     label: 'Loans', align: 'right' },
                { key: 'total_disbursed',label: 'Total Disbursed (MWK)', align: 'right', money: true },
              ]}
              totalKeys={[
                { key: 'loan_count',     label: 'Total Loans' },
                { key: 'total_disbursed',label: 'Total Disbursed', money: true },
              ]}
              emptyMessage="No disbursements in this period"
            />
          )}

          {/* ── COLLECTIONS TAB ── */}
          {activeTab === 'collections' && (
            <ReportTable
              isLoading={colLoading}
              rows={collections?.data ?? []}
              totals={collections?.totals}
              columns={[
                { key: 'date',            label: 'Date' },
                { key: 'payment_count',   label: 'Payments', align: 'right' },
                { key: 'total_collected', label: 'Total Collected (MWK)', align: 'right', money: true },
              ]}
              totalKeys={[
                { key: 'payment_count',   label: 'Total Payments' },
                { key: 'total_collected', label: 'Total Collected', money: true },
              ]}
              emptyMessage="No collections in this period"
            />
          )}

          {/* ── DELINQUENCY TAB ── */}
          {activeTab === 'delinquency' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {delLoading ? (
                <div style={{ height: 200, borderRadius: 12, background: '#E5E7EB' }} />
              ) : (
                <>
                  {/* Summary */}
                  {delinquency?.totals && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                      {[
                        { label: 'Overdue Installments', value: delinquency.totals.delinquent_installments },
                        { label: 'Affected Loans',        value: delinquency.totals.delinquent_loans },
                        { label: 'Affected Borrowers',    value: delinquency.totals.affected_borrowers },
                        { label: 'Total Outstanding',     value: fmtMWK(delinquency.totals.total_outstanding) },
                      ].map(c => (
                        <div key={c.label} style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '14px 16px' }}>
                          <p style={{ fontSize: 11, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '.04em', margin: 0, marginBottom: 6 }}>{c.label}</p>
                          <p style={{ fontSize: 22, fontWeight: 800, color: '#7F1D1D', margin: 0 }}>{c.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table */}
                  <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: '#F9FAFB' }}>
                            {['Borrower','Phone','Due Date','Amount Due','Paid','Outstanding','Days Overdue'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#6B7280', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.04em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(delinquency?.data ?? []).length === 0 ? (
                            <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>No delinquent loans — great news!</td></tr>
                          ) : (
                            (delinquency?.data ?? []).map((row: any, i: number) => (
                              <tr key={i}
                                style={{ borderBottom: '1px solid #F9FAFB', background: row.days_overdue > 30 ? '#FFF1F2' : 'white' }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>{row.borrower_name}</td>
                                <td style={{ padding: '12px 14px', color: '#6B7280', whiteSpace: 'nowrap' }}>{row.phone}</td>
                                <td style={{ padding: '12px 14px', color: '#6B7280', whiteSpace: 'nowrap' }}>{row.due_date ? new Date(row.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</td>
                                <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{fmtMWK(row.amount_due)}</td>
                                <td style={{ padding: '12px 14px', color: '#16A34A', whiteSpace: 'nowrap' }}>{fmtMWK(row.amount_paid)}</td>
                                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#DC2626', whiteSpace: 'nowrap' }}>{fmtMWK(row.outstanding)}</td>
                                <td style={{ padding: '12px 14px', fontWeight: 700, color: row.days_overdue > 30 ? '#DC2626' : '#D97706', whiteSpace: 'nowrap' }}>
                                  {row.days_overdue}d
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{display:none!important}
          .main-shift{margin-left:0!important}
          .menu-btn-admin{display:flex!important}
          .hide-on-mobile{display:none}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
        }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>
    </div>
  )
}

// ── Reusable report table ─────────────────────────────────
interface ColDef { key: string; label: string; align?: 'left' | 'right'; money?: boolean }
interface TotalDef { key: string; label: string; money?: boolean }

const ReportTable: React.FC<{
  isLoading: boolean
  rows: any[]
  totals?: any
  columns: ColDef[]
  totalKeys: TotalDef[]
  emptyMessage: string
}> = ({ isLoading, rows, totals, columns, totalKeys, emptyMessage }) => {
  if (isLoading) return <div style={{ height: 200, borderRadius: 12, background: '#E5E7EB', animation: 'pulse 1.5s infinite' }} />

  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* Totals bar */}
      {totals && (
        <div style={{ display: 'flex', gap: 24, padding: '14px 20px', borderBottom: '1px solid #F3F4F6', background: '#F9FAFB', flexWrap: 'wrap' }}>
          {totalKeys.map(t => (
            <div key={t.key}>
              <p style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.04em', margin: 0 }}>{t.label}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: 0, marginTop: 2 }}>
                {t.money ? fmtMWK(totals[t.key]) : totals[t.key]}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB' }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6B7280', textAlign: col.align ?? 'left', textTransform: 'uppercase', letterSpacing: '.04em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>{emptyMessage}</td></tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F9FAFB' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '12px 16px', fontSize: 13, color: col.money ? '#16A34A' : '#374151', textAlign: col.align ?? 'left', fontWeight: col.money ? 600 : 400, whiteSpace: 'nowrap' }}>
                      {col.money ? fmtMWK(row[col.key]) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}