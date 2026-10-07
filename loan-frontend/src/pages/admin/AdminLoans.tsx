import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Skeleton, Modal } from '@/components/ui'
import {
  getAllLoans,
  startLoanReview,
  approveLoan,
  rejectLoan,
  disburseLoan,
  closeLoan,
  defaultLoan,
} from '@/api'
import { formatCurrency, formatDate, getInitials } from '@/utils'
import type { Loan, LoanStatus } from '@/types'
import { AdminLayout } from '@/components/layout/AdminLayout'
import toast from 'react-hot-toast'
import './admin-page.css'

const STATUS_PILL: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:      { label: 'Pending',      bg: '#FDF1D6', color: '#92620A' },
  UNDER_REVIEW: { label: 'Under review', bg: '#D5F3EF', color: '#0B6B63' },
  APPROVED:     { label: 'Approved',     bg: '#E3F5DC', color: '#2F6B12' },
  DISBURSED:    { label: 'Disbursed',    bg: '#DEEEFB', color: '#185FA5' },
  CLOSED:       { label: 'Closed',       bg: '#EEF2F2', color: '#5B6B6A' },
  DEFAULTED:    { label: 'Defaulted',    bg: '#FCE8E6', color: '#B42318' },
  REJECTED:     { label: 'Rejected',     bg: '#FCE8E6', color: '#B42318' },
  CANCELLED:    { label: 'Cancelled',    bg: '#EEF2F2', color: '#5B6B6A' },
}
const SUMMARY_STATUSES: LoanStatus[] = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'DISBURSED']
const AVATAR_COLORS = [
  { bg: '#D5F3EF', color: '#0F766E' },
  { bg: '#DEEEFB', color: '#185FA5' },
  { bg: '#FDF1D6', color: '#92620A' },
  { bg: '#E3F5DC', color: '#2F6B12' },
  { bg: '#EAE8FB', color: '#534AB7' },
  { bg: '#FBE7EE', color: '#993556' },
]

type Variant = 'solid' | 'ghost' | 'danger' | 'danger-solid'
const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant; small?: boolean; grow?: boolean; loading?: boolean
}> = ({ variant = 'solid', small, grow, loading, children, disabled, ...rest }) => (
  <button
    {...rest}
    disabled={disabled || loading}
    className={`ap-btn${variant !== 'solid' ? ` ${variant}` : ''}${small ? ' sm' : ''}${grow ? ' grow' : ''}`}
  >
    {loading ? <span className="ap-spin" aria-label="Loading" /> : children}
  </button>
)

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
  const fail = (err: any) => toast.error(err.response?.data?.message ?? 'Failed')

  const review = useMutation({
    mutationFn: (id: string) => startLoanReview(id),
    onSuccess: () => { invalidate(); toast.success('Loan moved to review') },
    onError: fail,
  })
  const approve = useMutation({
    mutationFn: (id: string) => approveLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan approved') },
    onError: fail,
  })
  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => rejectLoan(id, reason),
    onSuccess: () => {
      invalidate()
      toast.success('Loan rejected')
      setRejectTarget(null)
      setRejectReason('')
    },
    onError: fail,
  })
  const disburse = useMutation({
    mutationFn: (id: string) => disburseLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan disbursed successfully') },
    onError: fail,
  })
  const close = useMutation({
    mutationFn: (id: string) => closeLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan closed') },
    onError: fail,
  })
  const markDefault = useMutation({
    mutationFn: (id: string) => defaultLoan(id),
    onSuccess: () => { invalidate(); toast.success('Loan marked as defaulted') },
    onError: fail,
  })

  // Spinner only on the row that was clicked, not on every row
  const busy = (m: { isPending: boolean; variables?: unknown }, id: string) => m.isPending && m.variables === id

  const closeReject = () => { setRejectTarget(null); setRejectReason('') }

  return (
    <AdminLayout  title="All Loan Applications" subtitle={`${loans.length} total`}>
      <div className="ap">
        

        {/* Summary */}
        <div className="ap-stats">
          {SUMMARY_STATUSES.map(s => {
            const pill = STATUS_PILL[s]
            const count = loans.filter((l: any) => l.status === s).length
            return (
              <div key={s} className="ap-card ap-sum">
                <small><i style={{ background: pill.color }} />{pill.label}</small>
                <strong style={{ color: pill.color }}>{count}</strong>
              </div>
            )
          })}
        </div>

        {/* Loans */}
        {isLoading ? (
          <div className="ap-list">
            {[1, 2, 3].map(i => <Skeleton key={i} style={{ height: 92, borderRadius: 16 }} />)}
          </div>
        ) : loans.length === 0 ? (
          <div className="ap-card ap-none" style={{ padding: 52, textAlign: 'center', color: 'var(--faint)' }}>
            No loan applications yet.
          </div>
        ) : (
          <div className="ap-list">
            {loans.map((loan: any, i: number) => {
              const pill = STATUS_PILL[loan.status] ?? STATUS_PILL.CLOSED
              const ac = AVATAR_COLORS[i % AVATAR_COLORS.length]
              const borrower: string = loan.user?.name ?? 'Borrower'
              return (
                <div key={loan.id} className="ap-card ap-loan">
                  <div className="a" style={{ background: ac.bg, color: ac.color }}>{getInitials(borrower)}</div>

                  <div className="mid">
                    <div className="top">
                      <span className="amt">{formatCurrency(Number(loan.amount))}</span>
                      <span className="ap-pill" style={{ background: pill.bg, color: pill.color }}>{pill.label}</span>
                    </div>
                    <p className="pur">{loan.purpose}</p>
                    <p className="meta">
                      {loan.user && <b>{loan.user.name}</b>}
                      <span>{loan.termValue}{loan.termUnit === 'MONTHS' ? 'mo' : 'wk'} · {Number(loan.interestRate)}%</span>
                      <span>{formatDate(loan.createdAt)}</span>
                    </p>
                  </div>

                  <div className="acts">
                    {loan.status === 'PENDING' && (
                      <Btn small variant="ghost" loading={busy(review, loan.id)} onClick={() => review.mutate(loan.id)}>
                        Start review
                      </Btn>
                    )}
                    {loan.status === 'UNDER_REVIEW' && (
                      <>
                        <Btn small loading={busy(approve, loan.id)} onClick={() => approve.mutate(loan.id)}>Approve</Btn>
                        <Btn small variant="danger" onClick={() => { setRejectTarget(loan); setRejectReason('') }}>Reject</Btn>
                      </>
                    )}
                    {loan.status === 'APPROVED' && (
                      <Btn small loading={busy(disburse, loan.id)} onClick={() => disburse.mutate(loan.id)}>Disburse</Btn>
                    )}
                    {loan.status === 'DISBURSED' && (
                      <>
                        <Btn small variant="ghost" loading={busy(close, loan.id)} onClick={() => close.mutate(loan.id)}>Close</Btn>
                        <Btn small variant="danger" loading={busy(markDefault, loan.id)} onClick={() => markDefault.mutate(loan.id)}>Default</Btn>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Reject modal: requires a reason */}
        <Modal isOpen={!!rejectTarget} onClose={closeReject} title="Reject loan application">
          {rejectTarget && (
            <div className="ap-modal">
              <div className="sum">
                <small>Loan</small>
                <b>{formatCurrency(Number(rejectTarget.amount))}</b>
                <p>{rejectTarget.purpose}</p>
              </div>
              <div>
                <label className="ap-label" htmlFor="reject-reason">Rejection reason *</label>
                <textarea
                  id="reject-reason"
                  className="ap-textarea"
                  rows={3}
                  placeholder="Explain why this loan is being rejected…"
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                />
              </div>
              <div className="ap-row">
                <Btn variant="ghost" grow onClick={closeReject}>Cancel</Btn>
                <Btn
                  variant="danger-solid" grow
                  loading={reject.isPending}
                  disabled={!rejectReason.trim()}
                  onClick={() => reject.mutate({ id: rejectTarget.id, reason: rejectReason })}
                >
                  Confirm rejection
                </Btn>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  )
}