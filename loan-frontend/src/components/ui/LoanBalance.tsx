import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLoanBalance } from '@/api'
import { formatCurrency, formatDate } from '@/utils'
import { Skeleton } from '@/components/ui'

interface Props { loanId: string }

export const LoanBalance: React.FC<Props> = ({ loanId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['loan-balance', loanId],
    queryFn: () => getLoanBalance(loanId),
    refetchInterval: 30000, // refresh every 30s
  })

  if (isLoading) return <Skeleton style={{ height: 140, borderRadius: 12 }} />
  if (!data) return null

  const pct = data.progressPercent

  return (
    <div style={{ background: 'var(--navy-light)', border: '1px solid var(--navy-lighter)', borderRadius: 12, padding: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 16 }}>
        Repayment progress
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--silver)' }}>
            {data.paidInstallments} of {data.totalInstallments} installments paid
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? 'var(--teal)' : 'var(--text)' }}>
            {pct}%
          </span>
        </div>
        <div style={{ height: 8, background: 'var(--navy-lighter)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            borderRadius: 4,
            background: pct === 100 ? 'var(--teal)' : 'linear-gradient(90deg,#2563EB,var(--teal))',
            width: `${pct}%`,
            transition: 'width .6s ease',
          }} />
        </div>
      </div>

      {/* Amounts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Total loan',   value: formatCurrency(data.totalDue),   color: 'var(--text)' },
          { label: 'Total paid',   value: formatCurrency(data.totalPaid),  color: '#16A34A' },
          { label: 'Outstanding',  value: formatCurrency(data.outstanding), color: data.outstanding === 0 ? '#16A34A' : '#EF4444' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: 'var(--navy-lighter)', borderRadius: 8, padding: '10px 12px' }}>
            <p style={{ fontSize: 10, color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '.04em', margin: 0, marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 14, fontWeight: 800, color, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Next installment */}
      {data.nextInstallment && data.outstanding > 0 && (
        <div style={{ background: 'rgba(0,201,167,0.08)', border: '1px solid rgba(0,201,167,0.2)', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--silver)', margin: 0 }}>Next installment due</p>
            <p style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, margin: 0, marginTop: 2 }}>
              {formatDate(data.nextInstallment.dueDate)}
            </p>
          </div>
          <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--teal)', margin: 0 }}>
            {formatCurrency(Number(data.nextInstallment.amountDue) - Number(data.nextInstallment.amountPaid))}
          </p>
        </div>
      )}

      {data.outstanding === 0 && (
        <div style={{ background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.3)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal)', margin: 0 }}>✓ Loan fully repaid</p>
        </div>
      )}
    </div>
  )
}