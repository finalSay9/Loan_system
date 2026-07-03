import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { StatCard, Badge, Skeleton, Button } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getMyLoans } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore()
  const { data, isLoading } = useQuery({ queryKey: ['my-loans'], queryFn: () => getMyLoans() })
  const loans = data?.data ?? []

  const totalBorrowed = loans.filter(l => ['DISBURSED','CLOSED'].includes(l.status)).reduce((s, l) => s + Number(l.amount), 0)
  const activeLoans = loans.filter(l => l.status === 'DISBURSED').length
  const pendingLoans = loans.filter(l => ['PENDING','UNDER_REVIEW'].includes(l.status)).length
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex' }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-silver">{greeting}</p>
          <h1 className="font-black" style={{ fontSize: 26, color: 'var(--text)', marginTop: 2 }}>{user?.name?.split(' ')[0]} 👋</h1>
        </div>
        <Link to="/loans/apply">
          <Button size="sm"><PlusCircle size={14} /> Apply</Button>
        </Link>
      </div>

      {/* KYC warning */}
      {user?.kycStatus === 'PENDING' && (
        <div className="alert alert-warning">
          <Clock size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <p className="text-sm font-semibold">KYC verification pending</p>
            <p className="text-xs text-silver mt-1">Your identity is being verified. Disbursements are on hold until complete.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="Total Borrowed" value={totalBorrowed > 0 ? formatCurrency(totalBorrowed) : '—'} sub="All time" icon={<TrendingUp size={16} />} />
        <StatCard label="Active Loans" value={String(activeLoans)} sub="Currently disbursed" accent="var(--blue)" icon={<CheckCircle size={16} />} />
        <div style={{ gridColumn: 'span 2' }} className="stats-span">
          <StatCard label="Pending Review" value={String(pendingLoans)} sub="Awaiting decision" accent="var(--warning)" icon={<Clock size={16} />} />
        </div>
      </div>

      {/* Recent loans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Recent Loans</span>
          <Link to="/loans" style={{ color: 'var(--teal)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex-col gap-3" style={{ display: 'flex' }}>
            {[1,2,3].map(i => <Skeleton key={i} style={{ height: 76, borderRadius: 10 }} />)}
          </div>
        ) : loans.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p className="text-silver text-sm">No loans yet</p>
            <p className="text-xs text-dim mt-1 mb-4">Apply for your first loan to get started</p>
            <Link to="/loans/apply"><Button size="sm"><PlusCircle size={14} /> Apply now</Button></Link>
          </div>
        ) : (
          <div className="flex-col gap-3" style={{ display: 'flex' }}>
            {loans.slice(0, 5).map(loan => {
              const cfg = loanStatusConfig[loan.status as LoanStatus]
              return (
                <Link key={loan.id} to={`/loans/${loan.id}`} className="loan-card loan-card-left" style={{ borderLeftColor: cfg.color }}>
                  <div className="flex items-center justify-between gap-3">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="font-bold text-text" style={{ fontSize: 15 }}>{formatCurrency(Number(loan.amount))}</p>
                      <p className="text-sm text-silver truncate mt-1">{loan.purpose}</p>
                      <p className="text-xs text-dim mt-1">{formatDate(loan.createdAt)}</p>
                    </div>
                    <div className="flex-col items-end gap-2 shrink-0" style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                      <span className="text-xs text-dim">{loan.termMonths}mo</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
