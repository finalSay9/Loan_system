import React from 'react'
import { Check, Clock, AlertCircle } from 'lucide-react'
import type { LoanStatus } from '@/types'
import { loanStatusConfig, LOAN_STEPS } from '@/utils'
import { formatDate } from '@/utils'

interface Props { status: LoanStatus; createdAt: string; disbursedAt?: string }

const STEP_INFO: Record<string, { label: string; desc: string }> = {
  PENDING:      { label: 'Application Submitted', desc: 'Your loan request is queued for review' },
  UNDER_REVIEW: { label: 'Under Review',           desc: 'A loan officer is reviewing your application' },
  APPROVED:     { label: 'Approved',               desc: 'Your loan has been approved' },
  DISBURSED:    { label: 'Funds Disbursed',         desc: 'Money has been sent to your account' },
  CLOSED:       { label: 'Loan Closed',             desc: 'Fully repaid — congratulations!' },
  DEFAULTED:    { label: 'Defaulted',               desc: 'This loan has been marked as defaulted' },
}

export const LoanTimeline: React.FC<Props> = ({ status, createdAt, disbursedAt }) => {
  const isDefaulted = status === 'DEFAULTED'
  const currentStep = loanStatusConfig[status].step
  const steps = isDefaulted ? [...LOAN_STEPS.slice(0, 4), 'DEFAULTED' as LoanStatus] : LOAN_STEPS

  return (
    <div className="timeline">
      {steps.map((step, i) => {
        const cfg = loanStatusConfig[step]
        const n = i + 1
        const done = n < currentStep
        const current = n === currentStep
        const pending = n > currentStep
        const isLast = i === steps.length - 1
        const info = STEP_INFO[step]

        return (
          <div key={step} className="tl-row">
            <div className="tl-spine">
              <div className="tl-dot"
                style={{
                  borderColor: done ? 'var(--teal)' : current ? cfg.color : 'var(--navy-lighter)',
                  backgroundColor: done ? 'var(--teal)' : current ? cfg.bg : 'var(--navy-light)',
                  boxShadow: current ? `0 0 0 4px ${cfg.color}22` : 'none',
                }}>
                {done    && <Check size={12} color="var(--navy)" strokeWidth={3} />}
                {current && !isDefaulted && <Clock size={12} style={{ color: cfg.color }} />}
                {current &&  isDefaulted && <AlertCircle size={12} color="var(--danger)" />}
                {pending && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--navy-lighter)', display: 'block' }} />}
              </div>
              {!isLast && (
                <div className="tl-line" style={{ background: done ? 'var(--teal)' : 'var(--navy-lighter)' }} />
              )}
            </div>

            <div className="tl-content" style={{ paddingBottom: isLast ? 0 : undefined }}>
              <div className="flex items-center gap-2 wrap">
                <span className="text-sm font-semibold" style={{ color: current ? cfg.color : done ? 'var(--text)' : 'var(--dim)' }}>
                  {info.label}
                </span>
                {current && (
                  <span className="badge" style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border, fontSize: 10 }}>
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs mt-1" style={{ color: pending ? 'var(--dim)' : 'var(--silver)' }}>{info.desc}</p>
              {step === 'PENDING' && <p className="text-xs text-dim mt-1">{formatDate(createdAt)}</p>}
              {step === 'DISBURSED' && disbursedAt && <p className="text-xs text-dim mt-1">{formatDate(disbursedAt)}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
