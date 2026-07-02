import React from 'react'
import { Check, Clock, AlertCircle } from 'lucide-react'
import type { LoanStatus } from '@/types'
import { loanStatusConfig, LOAN_STEPS } from '@/utils'
import { formatDate } from '@/utils'

interface LoanTimelineProps {
  status: LoanStatus
  createdAt: string
  disbursedAt?: string
}

const STEP_LABELS: Record<string, { label: string; desc: string }> = {
  PENDING:      { label: 'Application Submitted', desc: 'Your loan request is queued for review' },
  UNDER_REVIEW: { label: 'Under Review',           desc: 'A loan officer is reviewing your application' },
  APPROVED:     { label: 'Approved',               desc: 'Your loan has been approved' },
  DISBURSED:    { label: 'Funds Disbursed',         desc: 'Money has been sent to your account' },
  CLOSED:       { label: 'Loan Closed',             desc: 'Fully repaid — congratulations!' },
}

export const LoanTimeline: React.FC<LoanTimelineProps> = ({ status, createdAt, disbursedAt }) => {
  const isDefaulted = status === 'DEFAULTED'
  const currentStep = loanStatusConfig[status].step
  const steps = isDefaulted
    ? [...LOAN_STEPS.slice(0, 4), 'DEFAULTED' as LoanStatus]
    : LOAN_STEPS

  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const cfg = loanStatusConfig[step]
        const stepNum = i + 1
        const isDone = stepNum < currentStep
        const isCurrent = stepNum === currentStep
        const isPending = stepNum > currentStep
        const isLast = i === steps.length - 1
        const info = STEP_LABELS[step] ?? { label: step, desc: '' }

        return (
          <div key={step} className="flex gap-4">
            {/* Line + dot column */}
            <div className="flex flex-col items-center" style={{ minWidth: 28 }}>
              {/* Dot */}
              <div
                className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-500 shrink-0"
                style={{
                  borderColor: isDone ? '#00C9A7' : isCurrent ? cfg.color : '#243447',
                  backgroundColor: isDone ? '#00C9A7' : isCurrent ? cfg.bg : '#1E2D3D',
                  boxShadow: isCurrent ? `0 0 0 4px ${cfg.color}20` : 'none',
                }}
              >
                {isDone && <Check size={13} color="#0F1B2D" strokeWidth={3} />}
                {isCurrent && !isDefaulted && <Clock size={12} style={{ color: cfg.color }} />}
                {isCurrent && isDefaulted && <AlertCircle size={12} color="#FF4D4F" />}
                {isPending && <span className="w-2 h-2 rounded-full bg-[#243447]" />}
              </div>
              {/* Connector line */}
              {!isLast && (
                <div
                  className="w-0.5 flex-1 my-1 transition-all duration-700"
                  style={{
                    backgroundColor: isDone ? '#00C9A7' : '#243447',
                    minHeight: 28,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-sm font-semibold"
                  style={{ color: isCurrent ? cfg.color : isDone ? '#F0F4F8' : '#4A6080' }}
                >
                  {info.label}
                </span>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5" style={{ color: isPending ? '#4A6080' : '#8899AA' }}>
                {info.desc}
              </p>
              {step === 'PENDING' && (
                <p className="text-xs text-[#4A6080] mt-0.5">{formatDate(createdAt)}</p>
              )}
              {step === 'DISBURSED' && disbursedAt && (
                <p className="text-xs text-[#4A6080] mt-0.5">{formatDate(disbursedAt)}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
