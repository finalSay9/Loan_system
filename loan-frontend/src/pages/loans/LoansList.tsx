import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle, Filter, ArrowRight } from 'lucide-react'
import { Card, Badge, Skeleton, Button } from '@/components/ui'
import { getMyLoans } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Under Review', value: 'UNDER_REVIEW' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Disbursed', value: 'DISBURSED' },
  { label: 'Closed', value: 'CLOSED' },
]

export const LoansList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['my-loans', statusFilter],
    queryFn: () => getMyLoans(statusFilter ? { status: statusFilter } : undefined),
  })
  const loans = data?.data ?? []

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F4F8]">My Loans</h1>
          <p className="text-sm text-[#8899AA] mt-0.5">{loans.length} loan{loans.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/loans/apply">
          <Button size="sm"><PlusCircle size={14} />Apply</Button>
        </Link>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        <Filter size={14} className="text-[#8899AA] shrink-0 mt-1.5" />
        {STATUS_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              statusFilter === f.value
                ? 'bg-[#00C9A720] text-[#00C9A7] border-[#00C9A740]'
                : 'text-[#8899AA] border-[#243447] hover:border-[#8899AA]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : loans.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-[#8899AA]">No loans found</p>
          <p className="text-xs text-[#4A6080] mt-1 mb-5">
            {statusFilter ? 'No loans with this status' : 'Apply for your first loan'}
          </p>
          <Link to="/loans/apply">
            <Button><PlusCircle size={14} /> Apply for a loan</Button>
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {loans.map(loan => {
            const cfg = loanStatusConfig[loan.status as LoanStatus]
            return (
              <Link key={loan.id} to={`/loans/${loan.id}`}>
                <Card className="hover:border-[#00C9A730] transition-all cursor-pointer group" style={{ borderLeft: `3px solid ${cfg.color}` } as React.CSSProperties}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-[#F0F4F8]">{formatCurrency(Number(loan.amount))}</p>
                        <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                      </div>
                      <p className="text-sm text-[#8899AA] truncate">{loan.purpose}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[#4A6080]">{loan.termMonths} months</span>
                        <span className="text-xs text-[#4A6080]">{Number(loan.interestRate)}% p.a.</span>
                        <span className="text-xs text-[#4A6080]">{formatDate(loan.createdAt)}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-[#4A6080] group-hover:text-[#00C9A7] transition-colors shrink-0 mt-1" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
