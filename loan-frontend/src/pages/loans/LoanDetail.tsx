import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Percent, DollarSign, Clock } from 'lucide-react'
import { Card, Badge, Skeleton } from '@/components/ui'
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
    <div className="flex flex-col gap-4 animate-fade-in">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-40" />
      <Skeleton className="h-60" />
    </div>
  )

  if (!loan) return (
    <div className="text-center py-16">
      <p className="text-[#8899AA]">Loan not found</p>
    </div>
  )

  const cfg = loanStatusConfig[loan.status as LoanStatus]
  const principal = Number(loan.amount)
  const monthlyRate = Number(loan.interestRate) / 100 / 12
  const months = loan.termMonths
  const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalRepayable = monthlyPayment * months

  return (
    <div className="flex flex-col gap-5 animate-fade-in max-w-lg">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#8899AA] hover:text-[#F0F4F8] transition-colors w-fit">
        <ArrowLeft size={16} />
        <span className="text-sm">Back to loans</span>
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[#8899AA] mb-1">Loan amount</p>
          <p className="text-3xl font-black text-[#F0F4F8]">{formatCurrency(principal)}</p>
        </div>
        <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
      </div>

      {/* Details grid */}
      <Card>
        <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-4">Loan Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: FileText, label: 'Purpose', value: loan.purpose },
            { icon: Calendar, label: 'Applied', value: formatDate(loan.createdAt) },
            { icon: Clock, label: 'Term', value: `${loan.termMonths} months` },
            { icon: Percent, label: 'Interest Rate', value: `${Number(loan.interestRate)}% p.a.` },
            { icon: DollarSign, label: 'Monthly Payment', value: formatCurrency(monthlyPayment) },
            { icon: DollarSign, label: 'Total Repayable', value: formatCurrency(totalRepayable) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-[#8899AA]">{label}</p>
              <p className="text-sm font-medium text-[#F0F4F8] mt-0.5 break-words">{value}</p>
            </div>
          ))}
        </div>
        {loan.rejectionReason && (
          <div className="mt-4 p-3 bg-[#FF4D4F10] border border-[#FF4D4F30] rounded-lg">
            <p className="text-xs text-[#FF4D4F] font-medium mb-0.5">Rejection Reason</p>
            <p className="text-sm text-[#F0F4F8]">{loan.rejectionReason}</p>
          </div>
        )}
        {loan.notes && (
          <div className="mt-4 pt-4 border-t border-[#243447]">
            <p className="text-xs text-[#8899AA]">Notes</p>
            <p className="text-sm text-[#F0F4F8] mt-0.5">{loan.notes}</p>
          </div>
        )}
      </Card>

      {/* Timeline — signature design element */}
      <Card>
        <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-5">Application Progress</h3>
        <LoanTimeline status={loan.status as LoanStatus} createdAt={loan.createdAt} disbursedAt={loan.disbursedAt} />
      </Card>
    </div>
  )
}

// tiny helper import fix
import { FileText } from 'lucide-react'
