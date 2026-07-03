import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { StatCard, Card, Badge, Skeleton, Button } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getMyLoans } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore()
  const { data, isLoading } = useQuery({ queryKey: ['my-loans'], queryFn: () => getMyLoans() })
  const loans = data?.data ?? []

  const totalBorrowed = loans.filter(l => ['DISBURSED', 'CLOSED'].includes(l.status)).reduce((s, l) => s + Number(l.amount), 0)
  const activeLoans = loans.filter(l => l.status === 'DISBURSED').length
  const pendingLoans = loans.filter(l => ['PENDING', 'UNDER_REVIEW'].includes(l.status)).length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#8899AA]">{greeting}</p>
          <h1 className="text-2xl font-bold text-[#F0F4F8] mt-0.5">{user?.name?.split(' ')[0]} 👋</h1>
        </div>
        <Link to="/loans/apply">
          <Button size="sm" className="shrink-0">
            <PlusCircle size={14} />
            Apply
          </Button>
        </Link>
      </div>

      {/* KYC warning */}
      {user?.kycStatus === 'PENDING' && (
        <div className="bg-[#FAAD1415] border border-[#FAAD1440] rounded-xl p-4 flex items-start gap-3">
          <Clock size={16} className="text-[#FAAD14] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-[#FAAD14]">KYC verification pending</p>
            <p className="text-xs text-[#8899AA] mt-0.5">Your identity verification is in progress. Loan disbursements are on hold until verified.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard
          label="Total Borrowed"
          value={totalBorrowed > 0 ? formatCurrency(totalBorrowed) : '—'}
          sub="Across all loans"
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Active Loans"
          value={String(activeLoans)}
          sub="Currently disbursed"
          accent="#1890FF"
          icon={<CheckCircle size={16} />}
        />
        <div className="col-span-2 lg:col-span-1">
          <StatCard
            label="Pending Review"
            value={String(pendingLoans)}
            sub="Awaiting officer decision"
            accent="#0fbb0a"
            icon={<Clock size={16} />}
          />
        </div>
      </div>

      {/* Recent loans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#F0F4F8]">Recent Loans</h2>
          <Link to="/loans" className="text-xs text-[#00C9A7] hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-20" />)}
          </div>
        ) : loans.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-[#8899AA] text-sm">No loans yet</p>
            <p className="text-xs text-[#4A6080] mt-1 mb-4">Apply for your first loan to get started</p>
            <Link to="/loans/apply">
              <Button size="sm"><PlusCircle size={14} /> Apply for a loan</Button>
            </Link>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {loans.slice(0, 5).map(loan => {
              const cfg = loanStatusConfig[loan.status as LoanStatus]
              return (
                <Link key={loan.id} to={`/loans/${loan.id}`}>
                  <Card className="hover:border-[#00C9A730] transition-all cursor-pointer" style={{ borderLeft: `3px solid ${cfg.color}` } as React.CSSProperties}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#F0F4F8] text-sm truncate">{formatCurrency(Number(loan.amount))}</p>
                        <p className="text-xs text-[#8899AA] mt-0.5 truncate">{loan.purpose}</p>
                        <p className="text-xs text-[#4A6080] mt-1">{formatDate(loan.createdAt)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                        <span className="text-xs text-[#8899AA]">{loan.termMonths}mo</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
