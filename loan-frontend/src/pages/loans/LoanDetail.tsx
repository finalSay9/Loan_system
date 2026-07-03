import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Percent, DollarSign, Clock, FileText } from 'lucide-react'
import { Badge, Skeleton } from '@/components/ui'
import { LoanTimeline } from '@/components/ui/LoanTimeline'
import { getMyLoanById } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

export const LoanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: loan, isLoading } = useQuery({ queryKey: ['loan', id], queryFn: () => getMyLoanById(id!), enabled: !!id })

  if (isLoading) return (
    <div className="flex-col gap-4 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <Skeleton style={{ height: 28, width: 120, borderRadius: 6 }} />
      <Skeleton style={{ height: 80, borderRadius: 10 }} />
      <Skeleton style={{ height: 200, borderRadius: 10 }} />
    </div>
  )
  if (!loan) return <div style={{ textAlign: 'center', padding: 60, color: 'var(--silver)' }}>Loan not found</div>

  const cfg = loanStatusConfig[loan.status as LoanStatus]
  const principal = Number(loan.amount)
  const mr = Number(loan.interestRate) / 100 / 12
  const mp = (principal * (mr * Math.pow(1 + mr, loan.termMonths))) / (Math.pow(1 + mr, loan.termMonths) - 1)
  const total = mp * loan.termMonths

  const fields = [
    { icon: FileText,    label: 'Purpose',         value: loan.purpose },
    { icon: Calendar,    label: 'Applied',          value: formatDate(loan.createdAt) },
    { icon: Clock,       label: 'Term',             value: `${loan.termMonths} months` },
    { icon: Percent,     label: 'Interest Rate',    value: `${Number(loan.interestRate)}% p.a.` },
    { icon: DollarSign,  label: 'Monthly Payment',  value: formatCurrency(mp) },
    { icon: DollarSign,  label: 'Total Repayable',  value: formatCurrency(total) },
  ]

  return (
    <div className="flex-col gap-5 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <button onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--silver)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, padding: 0 }}>
        <ArrowLeft size={15} /> Back to loans
      </button>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-silver mb-1">Loan amount</p>
          <p className="font-black" style={{ fontSize: 30, color: 'var(--text)' }}>{formatCurrency(principal)}</p>
        </div>
        <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
      </div>

      <div className="card">
        <p className="section-label">Loan Details</p>
        <div className="summary-grid" style={{ gap: 16 }}>
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-silver">{label}</p>
              <p className="text-sm font-semibold text-text mt-1" style={{ wordBreak: 'break-word' }}>{value}</p>
            </div>
          ))}
        </div>
        {loan.rejectionReason && (
          <div className="alert alert-danger mt-4">
            <div>
              <p className="text-xs font-semibold mb-1">Rejection Reason</p>
              <p className="text-sm text-text">{loan.rejectionReason}</p>
            </div>
          </div>
        )}
        {loan.notes && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--navy-lighter)' }}>
            <p className="text-xs text-silver mb-1">Notes</p>
            <p className="text-sm text-text">{loan.notes}</p>
          </div>
        )}
      </div>

      <div className="card">
        <p className="section-label">Application Progress</p>
        <LoanTimeline status={loan.status as LoanStatus} createdAt={loan.createdAt} disbursedAt={loan.disbursedAt} />
      </div>
    </div>
  )
}
