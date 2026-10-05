import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Shield } from 'lucide-react'
import { Badge, Skeleton, Button, Modal } from '@/components/ui'
import {
  getAllLoans,
  startLoanReview,
  approveLoan,
  rejectLoan,
  disburseLoan,
  closeLoan,
  defaultLoan,
} from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { Loan, LoanStatus } from '@/types'
import toast from 'react-hot-toast'

export const AdminLoans: React.FC = () => {
  const qc = useQueryClient()
  const [rejectTarget, setRejectTarget] = useState<Loan | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-loans'],
    queryFn: () => getAllLoans(),
  })
  const loans = data?.data ?? []

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-loans'] })

  const { mutate: review, isPending: reviewing } = useMutation({
    mutationFn: (id: string) => startLoanReview(id),
    onSuccess: () => { invalidate(); toast.success('Loan moved to review') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const { mutate: approve, isPending: approving } = useMutation({
    mutationFn: (id: string) => approveLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan approved') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const { mutate: reject, isPending: rejecting } = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => rejectLoan(id, reason),
    onSuccess: () => {
      invalidate()
      toast.success('Loan rejected')
      setRejectTarget(null)
      setRejectReason('')
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const { mutate: disburse, isPending: disbursing } = useMutation({
    mutationFn: (id: string) => disburseLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan disbursed successfully') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const { mutate: close, isPending: closing } = useMutation({
    mutationFn: (id: string) => closeLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan closed') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const { mutate: markDefault, isPending: defaulting } = useMutation({
    mutationFn: (id: string) => defaultLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan marked as defaulted') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex' }}>
      <div className="flex items-center gap-3">
        <Shield size={20} style={{ color: 'var(--teal)' }} />
        <div>
          <h1 className="page-title">All Loan Applications</h1>
          <p className="page-subtitle">{loans.length} total</p>
        </div>
      </div>

      {/* Summary boxes */}
      <div className="admin-stats">
        {(['PENDING','UNDER_REVIEW','APPROVED','DISBURSED'] as LoanStatus[]).map(s => {
          const cfg = loanStatusConfig[s]
          const count = loans.filter((l: any) => l.status === s).length
          return (
            <div key={s} className="card" style={{ borderTop: `2px solid ${cfg.color}`, padding: '14px 16px' }}>
              <p className="text-xs text-silver">{cfg.label}</p>
              <p className="font-black mt-1" style={{ fontSize: 24, color: cfg.color }}>{count}</p>
            </div>
          )
        })}
      </div>

      {isLoading ? (
        <div className="flex-col gap-3" style={{ display: 'flex' }}>
          {[1,2,3].map(i => <Skeleton key={i} style={{ height: 100, borderRadius: 10 }} />)}
        </div>
      ) : (
        <div className="flex-col gap-3" style={{ display: 'flex' }}>
          {loans.map((loan: any) => {
            const cfg = loanStatusConfig[loan.status as LoanStatus]
            return (
              <div key={loan.id} className="loan-card loan-card-left" style={{ borderLeftColor: cfg.color }}>
                <div className="flex items-start justify-between gap-3 wrap">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2 wrap mb-1">
                      <span className="font-bold text-text" style={{ fontSize: 16 }}>
                        {formatCurrency(Number(loan.amount))}
                      </span>
                      <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                    </div>
                    <p className="text-sm text-silver truncate">{loan.purpose}</p>
                    <div className="flex gap-3 mt-1 wrap">
                      {loan.user && (
                        <span className="text-xs text-dim">{loan.user.name}</span>
                      )}
                      <span className="text-xs text-dim">
                        {loan.termValue}{loan.termUnit === 'MONTHS' ? 'mo' : 'wk'} · {Number(loan.interestRate)}%
                      </span>
                      <span className="text-xs text-dim">{formatDate(loan.createdAt)}</span>
                    </div>
                  </div>

                  {/* Action buttons per status */}
                  <div className="flex gap-2 wrap" style={{ flexShrink: 0 }}>
                    {loan.status === 'PENDING' && (
                      <Button size="sm" variant="outline" loading={reviewing}
                        onClick={() => review(loan.id)}>
                        Start Review
                      </Button>
                    )}
                    {loan.status === 'UNDER_REVIEW' && (
                      <>
                        <Button size="sm" loading={approving}
                          onClick={() => approve(loan.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="danger"
                          onClick={() => { setRejectTarget(loan); setRejectReason('') }}>
                          Reject
                        </Button>
                      </>
                    )}
                    {loan.status === 'APPROVED' && (
                      <Button size="sm" loading={disbursing}
                        onClick={() => disburse(loan.id)}>
                        Disburse
                      </Button>
                    )}
                    {loan.status === 'DISBURSED' && (
                      <>
                        <Button size="sm" variant="outline" loading={closing}
                          onClick={() => close(loan.id)}>
                          Close
                        </Button>
                        <Button size="sm" variant="danger" loading={defaulting}
                          onClick={() => markDefault(loan.id)}>
                          Default
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Reject modal — requires a reason */}
      <Modal
        isOpen={!!rejectTarget}
        onClose={() => { setRejectTarget(null); setRejectReason('') }}
        title="Reject loan application">
        {rejectTarget && (
          <>
            <div style={{ marginBottom: 16 }}>
              <p className="text-xs text-silver mb-1">Loan</p>
              <p className="font-semibold text-text">{formatCurrency(Number(rejectTarget.amount))}</p>
              <p className="text-sm text-silver mt-1">{rejectTarget.purpose}</p>
            </div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label className="field-label">Rejection reason *</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Explain why this loan is being rejected…"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline"
                onClick={() => { setRejectTarget(null); setRejectReason('') }}
                style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button
                variant="danger"
                loading={rejecting}
                disabled={!rejectReason.trim()}
                onClick={() => reject({ id: rejectTarget.id, reason: rejectReason })}
                style={{ flex: 1 }}>
                Confirm Rejection
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}