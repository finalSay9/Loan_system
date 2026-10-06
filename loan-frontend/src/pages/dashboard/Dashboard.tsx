import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusCircle, TrendingUp, Clock, CheckCircle, ArrowRight, Star, CreditCard, Check, Banknote } from 'lucide-react'
import { Skeleton, Modal } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getMyLoans } from '@/api'
import { formatCurrency, formatDate } from '@/utils'
import api from '@/api/client'
import toast from 'react-hot-toast'
import './dashboard.css'

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

// Small button used by this page (native <button>, so no dependency on the shared Button styles)
const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'ghost'; small?: boolean; grow?: boolean; loading?: boolean
}> = ({ variant = 'solid', small, grow, loading, children, disabled, ...rest }) => (
  <button
    {...rest}
    disabled={disabled || loading}
    className={`db-btn${variant === 'ghost' ? ' ghost' : ''}${small ? ' sm' : ''}${grow ? ' grow' : ''}`}
  >
    {loading ? <span className="db-spin" aria-label="Loading" /> : children}
  </button>
)

// ── Feedback Modal ────────────────────────────────────────
const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const qc = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post('/feedback', { rating, comment: comment || undefined }),
    onSuccess: () => {
      toast.success('Thank you for your feedback!')
      qc.invalidateQueries({ queryKey: ['satisfaction'] })
      setRating(0)
      setComment('')
      onClose()
    },
    onError: () => toast.error('Failed to submit feedback'),
  })

  const labels: Record<number, string> = {
    1: 'Poor: very unsatisfied',
    2: 'Neutral: could be better',
    3: 'Good: satisfied',
    4: 'Excellent: very satisfied',
  }
  const shown = hovered || rating

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share your feedback">
      <div className="db-modal">
        <p className="intro">How would you rate your experience with LoanFlow? Your feedback helps us improve.</p>

        <div className="db-stars">
          <div className="s">
            {[1, 2, 3, 4].map(s => (
              <button
                key={s} type="button" aria-label={`${s} star${s > 1 ? 's' : ''}`}
                className={`db-star${shown >= s ? ' on' : ''}`}
                onClick={() => setRating(s)}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
              >
                <Star size={34} strokeWidth={1.6}
                  fill={shown >= s ? '#F5B83D' : 'none'}
                  color={shown >= s ? '#F5B83D' : '#B9CFCC'} />
              </button>
            ))}
          </div>
          <p>{shown > 0 ? labels[shown] : ''}</p>
        </div>

        <div className="db-field">
          <label className="db-label" htmlFor="fb-comment">Comment (optional)</label>
          <textarea id="fb-comment" className="db-textarea" rows={3} value={comment}
            onChange={e => setComment(e.target.value)} placeholder="Tell us more about your experience…" />
        </div>

        <div className="db-row">
          <Btn variant="ghost" grow onClick={onClose}>Cancel</Btn>
          <Btn grow loading={isPending} disabled={rating === 0} onClick={() => mutate()}>Submit feedback</Btn>
        </div>
      </div>
    </Modal>
  )
}

// ── Payment Modal ─────────────────────────────────────────
const PaymentModal: React.FC<{ isOpen: boolean; onClose: () => void; loans: any[] }> = ({ isOpen, onClose, loans }) => {
  const qc = useQueryClient()
  const [selectedLoan, setSelectedLoan] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState(`REF-${Date.now()}`)

  const activeLoans = loans.filter(l => l.status === 'DISBURSED')

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post('/payments/repay', { loanId: selectedLoan, amount: Number(amount), reference }),
    onSuccess: (response: any) => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      qc.invalidateQueries({ queryKey: ['my-transactions'] })
      qc.invalidateQueries({ queryKey: ['loan-balance', selectedLoan] })
      qc.invalidateQueries({ queryKey: ['admin-loans'] })

      const balance = response?.balance
      if (balance) {
        if (balance.outstanding === 0) toast.success('Loan fully repaid! Your account is clear.')
        else toast.success(`Payment recorded. Outstanding: ${formatCurrency(balance.outstanding)}`)
      } else {
        toast.success('Payment recorded successfully!')
      }

      setSelectedLoan('')
      setAmount('')
      setReference(`REF-${Date.now()}`)
      onClose()
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Payment failed'),
  })

  const selected = loans.find(l => l.id === selectedLoan)
  const outstanding: number | undefined = selected?.balance?.outstanding

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Make a repayment">
      <div className="db-modal">
        <p className="intro">Select an active loan and enter the amount you want to repay.</p>

        {activeLoans.length === 0 ? (
          <div className="db-none">
            <CreditCard size={26} />
            <div>No active loans to repay</div>
          </div>
        ) : (
          <>
            <div className="db-field">
              <span className="db-label">Select loan</span>
              <div className="db-opts">
                {activeLoans.map(loan => (
                  <button key={loan.id} type="button"
                    className={`db-opt${selectedLoan === loan.id ? ' sel' : ''}`}
                    aria-pressed={selectedLoan === loan.id}
                    onClick={() => setSelectedLoan(loan.id)}>
                    <div>
                      <b>{formatCurrency(Number(loan.amount))}</b>
                      <small>{loan.purpose}</small>
                    </div>
                    {selectedLoan === loan.id && <span className="db-tick"><Check size={13} strokeWidth={3} /></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="db-field">
              <label className="db-label" htmlFor="pay-amount">Amount (MWK)</label>
              <input id="pay-amount" className="db-input" type="number" inputMode="numeric" value={amount}
                onChange={e => setAmount(e.target.value)} placeholder="Enter amount to repay" />
              {selected && (
                <p className="db-hint">
                  Loan amount: {formatCurrency(Number(selected.amount))}
                  {outstanding !== undefined && <> · Outstanding: {formatCurrency(outstanding)}</>}
                </p>
              )}
            </div>

            <div className="db-field">
              <label className="db-label" htmlFor="pay-ref">Payment reference</label>
              <input id="pay-ref" className="db-input" value={reference} onChange={e => setReference(e.target.value)} />
            </div>

            <div className="db-row">
              <Btn variant="ghost" grow onClick={onClose}>Cancel</Btn>
              <Btn grow loading={isPending} disabled={!selectedLoan || !amount || Number(amount) <= 0} onClick={() => mutate()}>
                <CreditCard size={15} /> Pay now
              </Btn>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

// ── Dashboard ─────────────────────────────────────────────
export const Dashboard: React.FC = () => {
  const { user } = useAuthStore()
  const { data, isLoading } = useQuery({ queryKey: ['my-loans'], queryFn: () => getMyLoans() })
  const loans = data?.data ?? []
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  // Active = DISBURSED and still has an outstanding balance
  const activeLoans = loans.filter(l => l.status === 'DISBURSED' && (l as any).balance?.outstanding > 0).length
  // Outstanding = what is still owed on disbursed loans
  const totalOutstanding = loans
    .filter(l => l.status === 'DISBURSED')
    .reduce((s, l) => s + ((l as any).balance?.outstanding ?? 0), 0)
  // Repaid across all loans
  const totalRepaid = loans.reduce((s, l) => s + ((l as any).balance?.totalPaid ?? 0), 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="db fade-in">
      {/* Header */}
      <div className="db-head">
        <div>
          <small>{greeting}</small>
          <h1>{user?.name?.split(' ')[0]}</h1>
        </div>
        <div className="db-actions">
          <Btn small variant="ghost" onClick={() => setFeedbackOpen(true)}><Star size={14} /> Feedback</Btn>
          <Link to="/loans/apply" className="db-btn sm"><PlusCircle size={14} /> Apply</Link>
        </div>
      </div>

      {/* KYC warning */}
      {user?.kycStatus === 'PENDING' && (
        <div className="db-banner warn" role="status">
          <div className="ico"><Clock size={18} /></div>
          <div>
            <b>KYC verification pending</b>
            <p>Your identity is being verified. Disbursements are on hold until it is complete.</p>
          </div>
        </div>
      )}

      {/* Repayment prompt */}
      {activeLoans > 0 && (
        <div className="db-banner pay">
          <div className="l">
            <div className="ico"><CreditCard size={18} /></div>
            <div>
              <b>You have {activeLoans} active loan{activeLoans > 1 ? 's' : ''}</b>
              <p>Make a repayment to keep your account in good standing</p>
            </div>
          </div>
          <Btn small onClick={() => setPaymentOpen(true)}><CreditCard size={14} /> Make payment</Btn>
        </div>
      )}

      {/* Stats */}
      <div className="db-stats">
        <div className="db-card db-stat hero">
          <div className="db-stat-top"><span>Outstanding balance</span><div className="db-chip"><TrendingUp size={18} /></div></div>
          <strong>{totalOutstanding > 0 ? formatCurrency(totalOutstanding) : 'MWK 0'}</strong>
          <em>What you still owe</em>
        </div>
        <div className="db-card db-stat">
          <div className="db-stat-top"><span>Total repaid</span><div className="db-chip"><CheckCircle size={18} /></div></div>
          <strong>{formatCurrency(totalRepaid)}</strong>
          <em>Across all loans</em>
        </div>
        <div className="db-card db-stat">
          <div className="db-stat-top"><span>Active loans</span><div className="db-chip"><Clock size={18} /></div></div>
          <strong>{activeLoans}</strong>
          <em>With outstanding balance</em>
        </div>
      </div>

      {/* Recent loans */}
      <section>
        <div className="db-sec-head">
          <h2>Recent loans</h2>
          <Link to="/loans" className="db-more">View all <ArrowRight size={13} /></Link>
        </div>

        {isLoading ? (
          <div className="db-list">
            {[1, 2, 3].map(i => <Skeleton key={i} style={{ height: 78, borderRadius: 18 }} />)}
          </div>
        ) : loans.length === 0 ? (
          <div className="db-card db-empty">
            <div className="ico"><Banknote size={24} /></div>
            <b>No loans yet</b>
            <p>Apply for your first loan to get started</p>
            <Link to="/loans/apply" className="db-btn sm"><PlusCircle size={14} /> Apply now</Link>
          </div>
        ) : (
          <div className="db-list">
            {loans.slice(0, 5).map(loan => {
              const pill = STATUS_PILL[loan.status] ?? STATUS_PILL.CLOSED
              return (
                <Link key={loan.id} to={`/loans/${loan.id}`} className="db-card db-loan">
                  <div className="ico"><Banknote size={20} /></div>
                  <div className="mid">
                    <p className="amt">{formatCurrency(Number(loan.amount))}</p>
                    <p className="pur">{loan.purpose}</p>
                    <p className="dt">{formatDate(loan.createdAt)}</p>
                  </div>
                  <div className="end">
                    <span className="db-pill" style={{ background: pill.bg, color: pill.color }}>{pill.label}</span>
                    <span className="term">{loan.termValue}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Transactions link */}
      <Link to="/transactions" className="db-card db-tx">
        <div className="l">
          <div className="ico"><CreditCard size={18} /></div>
          <div>
            <b>Transaction history</b>
            <small>View all your payments and repayments</small>
          </div>
        </div>
        <ArrowRight size={16} className="arr" />
      </Link>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <PaymentModal isOpen={paymentOpen} onClose={() => setPaymentOpen(false)} loans={loans} />
    </div>
  )
}