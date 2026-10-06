import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { formatDate } from '@/utils'
import {
  getReportSummary,
  getDisbursementReport,
  getCollectionsReport,
  getDelinquencyReport,
  exportDisbursements,
  exportCollections,
  exportDelinquency,
} from '@/api/backoffice'
import { AdminLayout } from '../admin/AdminLayout' // adjust path to where you keep AdminLayout
import './reports.css'

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

type Tab = 'overview' | 'disbursements' | 'collections' | 'delinquency'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview',      label: 'Overview',      icon: 'ti-layout-dashboard' },
  { key: 'disbursements', label: 'Disbursements', icon: 'ti-cash' },
  { key: 'collections',   label: 'Collections',   icon: 'ti-circle-check' },
  { key: 'delinquency',   label: 'Delinquency',   icon: 'ti-alert-triangle' },
]

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
  if (isLoading) return <div className="rp-skel" style={{ height: 240 }} />

  return (
    <div className="ad-card" style={{ overflow: 'hidden' }}>
      {totals && (
        <div className="rp-totals">
          {totalKeys.map(t => (
            <div key={t.key}>
              <small>{t.label}</small>
              <strong>{t.money ? fmtMWK(totals[t.key]) : totals[t.key]}</strong>
            </div>
          ))}
        </div>
      )}
      <div className="ad-scroll">
        <table>
          <thead>
            <tr>{columns.map(c => <th key={c.key} className={c.align === 'right' ? 'r' : ''}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="rp-none">{emptyMessage}</td></tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i}>
                  {columns.map(c => (
                    <td key={c.key} className={`${c.align === 'right' ? 'r' : ''}${c.money ? ' money' : ''}`}>
                      {c.money ? fmtMWK(row[c.key]) : String(row[c.key] ?? '—')}
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

// ── Page ──────────────────────────────────────────────────
export const AdminReports: React.FC = () => {
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
      toast.error('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const s = summary?.data
  const overviewCards = s
    ? [
        { label: 'Loans disbursed',      value: String(s.disbursements.loan_count),   sub: fmtMWK(s.disbursements.total),               icon: 'ti-cash',           hero: true },
        { label: 'Payments received',    value: String(s.collections.payment_count),  sub: fmtMWK(s.collections.total),                 icon: 'ti-circle-check' },
        { label: 'Overdue installments', value: String(s.delinquency.installments),   sub: `${s.delinquency.loans} loans`,              icon: 'ti-alert-triangle', amber: true },
        { label: 'Outstanding debt',     value: fmtMWK(s.delinquency.outstanding),    sub: `${s.delinquency.borrowers} borrowers`,      icon: 'ti-coin' },
      ]
    : []

  return (
    <AdminLayout title="Financial reports" subtitle="Disbursements, collections and overdue loans">
      {/* Filters */}
      <div className="ad-card rp-filters">
        <i className="ti ti-calendar" aria-hidden="true" />
        <label>From
          <input className="rp-date" type="date" value={startDate} max={endDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>To
          <input className="rp-date" type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <div className="rp-quick">
          {[{ label: '7d', n: 7 }, { label: '30d', n: 30 }, { label: '90d', n: 90 }].map(r => (
            <button key={r.label} type="button"
              className={`rp-chip${startDate === daysAgo(r.n) && endDate === today() ? ' on' : ''}`}
              onClick={() => { setStartDate(daysAgo(r.n)); setEndDate(today()) }}>
              Last {r.label}
            </button>
          ))}
        </div>
        {activeTab !== 'overview' && (
          <button className="rp-export" onClick={handleExport} disabled={exporting}>
            <i className="ti ti-download" aria-hidden="true" />
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="rp-tabs" role="tablist">
        {TABS.map(tab => (
          <button key={tab.key} role="tab" aria-selected={activeTab === tab.key}
            className={`rp-tab${activeTab === tab.key ? ' on' : ''}`}
            onClick={() => setActiveTab(tab.key)}>
            <i className={`ti ${tab.icon}`} aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        summaryLoading ? (
          <div className="rp-grid">{[1, 2, 3, 4].map(i => <div key={i} className="rp-skel" style={{ height: 124 }} />)}</div>
        ) : s && (
          <>
            <div className="rp-grid">
              {overviewCards.map(c => (
                <div key={c.label} className={`ad-card ad-stat${c.hero ? ' hero' : ''}`}>
                  <div className="ad-stat-top">
                    <span>{c.label}</span>
                    <div className={`ad-chip${c.amber ? ' amber' : ''}`}><i className={`ti ${c.icon}`} /></div>
                  </div>
                  <strong>{c.value}</strong>
                  <em>{c.sub}</em>
                </div>
              ))}
            </div>
            <div className="ad-card rp-period">
              <i className="ti ti-calendar-stats" aria-hidden="true" />
              <span>Period: <b>{formatDate(summary.filters.start)}</b> to <b>{formatDate(summary.filters.end)}</b></span>
            </div>
          </>
        )
      )}

      {/* Disbursements */}
      {activeTab === 'disbursements' && (
        <ReportTable
          isLoading={disbLoading}
          rows={disbursements?.data ?? []}
          totals={disbursements?.totals}
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'loan_count', label: 'Loans', align: 'right' },
            { key: 'total_disbursed', label: 'Total disbursed (MWK)', align: 'right', money: true },
          ]}
          totalKeys={[
            { key: 'loan_count', label: 'Total loans' },
            { key: 'total_disbursed', label: 'Total disbursed', money: true },
          ]}
          emptyMessage="No disbursements in this period"
        />
      )}

      {/* Collections */}
      {activeTab === 'collections' && (
        <ReportTable
          isLoading={colLoading}
          rows={collections?.data ?? []}
          totals={collections?.totals}
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'payment_count', label: 'Payments', align: 'right' },
            { key: 'total_collected', label: 'Total collected (MWK)', align: 'right', money: true },
          ]}
          totalKeys={[
            { key: 'payment_count', label: 'Total payments' },
            { key: 'total_collected', label: 'Total collected', money: true },
          ]}
          emptyMessage="No collections in this period"
        />
      )}

      {/* Delinquency */}
      {activeTab === 'delinquency' && (
        delLoading ? (
          <div className="rp-skel" style={{ height: 240 }} />
        ) : (
          <>
            {delinquency?.totals && (
              <div className="rp-grid">
                {[
                  { label: 'Overdue installments', value: delinquency.totals.delinquent_installments },
                  { label: 'Affected loans',       value: delinquency.totals.delinquent_loans },
                  { label: 'Affected borrowers',   value: delinquency.totals.affected_borrowers },
                  { label: 'Total outstanding',    value: fmtMWK(delinquency.totals.total_outstanding) },
                ].map(c => (
                  <div key={c.label} className="rp-warn">
                    <small>{c.label}</small>
                    <strong>{c.value}</strong>
                  </div>
                ))}
              </div>
            )}

            <div className="ad-card" style={{ overflow: 'hidden' }}>
              <div className="ad-scroll">
                <table>
                  <thead>
                    <tr>
                      {['Borrower', 'Phone', 'Due date', 'Amount due', 'Paid', 'Outstanding', 'Days overdue'].map(h => <th key={h}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(delinquency?.data ?? []).length === 0 ? (
                      <tr><td colSpan={7} className="rp-none">No delinquent loans. Great news!</td></tr>
                    ) : (
                      (delinquency?.data ?? []).map((row: any, i: number) => (
                        <tr key={i} className={row.days_overdue > 30 ? 'late' : ''}>
                          <td style={{ fontWeight: 700 }}>{row.borrower_name}</td>
                          <td className="muted">{row.phone}</td>
                          <td className="muted">{row.due_date ? formatDate(row.due_date) : '—'}</td>
                          <td>{fmtMWK(row.amount_due)}</td>
                          <td className="paid">{fmtMWK(row.amount_paid)}</td>
                          <td className="owed">{fmtMWK(row.outstanding)}</td>
                          <td><span className={`rp-days ${row.days_overdue > 30 ? 'hi' : 'lo'}`}>{row.days_overdue}d</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      )}
    </AdminLayout>
  )
}