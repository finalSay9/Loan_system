import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle, Filter, ArrowRight } from 'lucide-react'
import { Badge, Skeleton, Button } from '@/components/ui'
import { getMyLoans } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

const FILTERS = [
  { label: 'All', value: '' }, { label: 'Pending', value: 'PENDING' },
  { label: 'Under Review', value: 'UNDER_REVIEW' }, { label: 'Approved', value: 'APPROVED' },
  { label: 'Disbursed', value: 'DISBURSED' }, { label: 'Closed', value: 'CLOSED' },
]

export const LoansList: React.FC = () => {
  const [filter, setFilter] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['my-loans', filter],
    queryFn: () => getMyLoans(filter ? { status: filter } : undefined),
  })
  const loans = data?.data ?? []

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex' }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title">My Loans</h1>
          <p className="page-subtitle">{loans.length} loan{loans.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/loans/apply"><Button size="sm"><PlusCircle size={14} /> Apply</Button></Link>
      </div>

      <div className="filter-row">
        <Filter size={14} style={{ color: 'var(--silver)', flexShrink: 0, marginTop: 1 }} />
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`filter-chip ${filter === f.value ? 'active' : ''}`}>
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex-col gap-3" style={{ display: 'flex' }}>
          {[1,2,3].map(i => <Skeleton key={i} style={{ height: 90, borderRadius: 10 }} />)}
        </div>
      ) : loans.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
          <p className="text-silver">No loans found</p>
          <p className="text-xs text-dim mt-1 mb-5">{filter ? 'No loans with this status' : 'Apply for your first loan'}</p>
          <Link to="/loans/apply"><Button><PlusCircle size={14} /> Apply now</Button></Link>
        </div>
      ) : (
        <div className="flex-col gap-3" style={{ display: 'flex' }}>
          {loans.map(loan => {
            const cfg = loanStatusConfig[loan.status as LoanStatus]
            return (
              <Link key={loan.id} to={`/loans/${loan.id}`} className="loan-card loan-card-left" style={{ borderLeftColor: cfg.color }}>
                <div className="flex items-start justify-between gap-3">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2 wrap mb-1">
                      <span className="font-bold text-text" style={{ fontSize: 16 }}>{formatCurrency(Number(loan.amount))}</span>
                      <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                    </div>
                    <p className="text-sm text-silver truncate">{loan.purpose}</p>
                    <div className="flex gap-3 mt-1 wrap">
                      <span className="text-xs text-dim">{loan.termMonths} months</span>
                      <span className="text-xs text-dim">{Number(loan.interestRate)}% p.a.</span>
                      <span className="text-xs text-dim">{formatDate(loan.createdAt)}</span>
                    </div>
                  </div>
                  <ArrowRight size={15} style={{ color: 'var(--dim)', flexShrink: 0, marginTop: 3 }} />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
