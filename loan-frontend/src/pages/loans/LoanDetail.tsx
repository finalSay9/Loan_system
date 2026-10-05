import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Percent, DollarSign, Clock, FileText, Layers, RotateCcw } from 'lucide-react'
import { Badge, Skeleton } from '@/components/ui'
import { LoanTimeline } from '@/components/ui/LoanTimeline'
import { getMyLoanById } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { LoanStatus } from '@/types'

export const LoanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: loan, isLoading } = useQuery({
    queryKey: ['loan', id],
    queryFn: () => getMyLoanById(id!),
    enabled: !!id,
  })

  if (isLoading) return (
    <div className="flex-col gap-4 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <Skeleton style={{ height: 28, width: 120, borderRadius: 6 }} />
      <Skeleton style={{ height: 80, borderRadius: 10 }} />
      <Skeleton style={{ height: 200, borderRadius: 10 }} />
    </div>
  )

  if (!loan) return (
    <div style={{ textAlign: 'center', padding: 60, color: 'var(--silver)' }}>
      Loan not found
    </div>
  )

  const cfg = loanStatusConfig[loan.status as LoanStatus]
  const principal = Number(loan.amount)

  // Use inline balance from backend — no separate fetch needed
  const balance = loan.balance ?? null

  const fields = [
    { icon: FileText,    label: 'Purpose',           value: loan.purpose },
    { icon: Calendar,    label: 'Applied',            value: formatDate(loan.createdAt) },
    { icon: Clock,       label: 'Term',               value: `${loan.termValue} ${loan.termUnit?.toLowerCase() ?? 'months'}` },
    { icon: Percent,     label: 'Interest Rate',      value: `${Number(loan.interestRate)}% p.a.` },
    { icon: Layers,      label: 'Interest Type',      value: loan.interestType?.replace('_', ' ') ?? '—' },
    { icon: RotateCcw,   label: 'Repayment Frequency',value: loan.repaymentFrequency ?? '—' },
    { icon: FileText,    label: 'Installments',       value: String(loan.numberOfInstallments ?? '—') },
    { icon: DollarSign,  label: 'Processing Fee',     value: formatCurrency(Number(loan.totalFees ?? 0)) },
    { icon: DollarSign,  label: 'Total Interest',     value: formatCurrency(Number(loan.totalInterest ?? 0)) },
    { icon: DollarSign,  label: 'Total Payable',      value: formatCurrency(Number(loan.totalPayable ?? 0)) },
    ...(loan.firstPaymentDueAt ? [{ icon: Calendar, label: 'First Payment Due', value: formatDate(loan.firstPaymentDueAt) }] : []),
    ...(loan.maturityDate      ? [{ icon: Calendar, label: 'Maturity Date',      value: formatDate(loan.maturityDate) }]      : []),
  ]

  return (
    <div className="flex-col gap-5 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      {/* Back */}
      <button onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--silver)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, padding: 0 }}>
        <ArrowLeft size={15} /> Back to loans
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-silver mb-1">Loan amount</p>
          <p className="font-black" style={{ fontSize: 30, color: 'var(--text)' }}>{formatCurrency(principal)}</p>
          {loan.product?.name && (
            <p className="text-xs text-silver mt-1">{loan.product.name}</p>
          )}
        </div>
        <Badge status={loan.status} label={cfg?.label ?? loan.status} color={cfg?.color ?? 'var(--silver)'} bg={cfg?.bg ?? 'transparent'} border={cfg?.border ?? 'var(--navy-lighter)'} />
      </div>

      {/* Inline balance — shown for disbursed and closed loans */}
      {balance && ['DISBURSED', 'CLOSED'].includes(loan.status) && (
        <div className="card">
          <p className="section-label">Repayment Progress</p>

          {/* Progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span className="text-xs text-silver">
                {loan.repayments?.filter((r: any) => r.status === 'PAID').length ?? 0} of {loan.numberOfInstallments} installments paid
              </span>
              <span className="text-xs font-semibold" style={{ color: balance.progressPercent === 100 ? 'var(--teal)' : 'var(--text)' }}>
                {balance.progressPercent}%
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--navy-lighter)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: balance.progressPercent === 100 ? 'var(--teal)' : 'linear-gradient(90deg,#2563EB,var(--teal))',
                width: `${balance.progressPercent}%`,
                transition: 'width .6s ease',
              }} />
            </div>
          </div>

          {/* Amounts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Total Loan',   value: formatCurrency(balance.totalDue),  color: 'var(--text)' },
              { label: 'Total Paid',   value: formatCurrency(balance.totalPaid),  color: '#16A34A' },
              { label: 'Outstanding',  value: formatCurrency(balance.outstanding), color: balance.outstanding === 0 ? '#16A34A' : '#EF4444' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: 'var(--navy-lighter)', borderRadius: 8, padding: '10px 12px' }}>
                <p className="text-xs text-silver mb-1">{label}</p>
                <p style={{ fontSize: 13, fontWeight: 800, color, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Fully repaid banner */}
          {balance.outstanding === 0 && (
            <div style={{ marginTop: 12, background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.3)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal)', margin: 0 }}>✓ Loan fully repaid</p>
            </div>
          )}
        </div>
      )}

      {/* Details */}
      <div className="card">
        <p className="section-label">Loan Details</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-silver">{label}</p>
              <p className="text-sm font-semibold text-text mt-1" style={{ wordBreak: 'break-word' }}>{value}</p>
            </div>
          ))}
        </div>

        {loan.rejectionReason && (
          <div className="alert alert-danger" style={{ marginTop: 16 }}>
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

      {/* Timeline */}
      <div className="card">
        <p className="section-label">Application Progress</p>
        <LoanTimeline
          status={loan.status as LoanStatus}
          createdAt={loan.createdAt}
          disbursedAt={loan.disbursedAt}
        />
      </div>
    </div>
  )
}