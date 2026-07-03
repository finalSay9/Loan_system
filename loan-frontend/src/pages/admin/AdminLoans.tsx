import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Shield, ChevronDown } from 'lucide-react'
import { Badge, Skeleton, Button, Modal } from '@/components/ui'
import { getAllLoans, updateLoanStatus, disburseLoan } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { Loan, LoanStatus } from '@/types'
import toast from 'react-hot-toast'

const TRANSITIONS: Record<string, string[]> = {
  PENDING: ['UNDER_REVIEW'], UNDER_REVIEW: ['APPROVED','PENDING'],
  APPROVED: ['DISBURSED'], DISBURSED: ['CLOSED','DEFAULTED'],
}

export const AdminLoans: React.FC = () => {
  const qc = useQueryClient()
  const [selected, setSelected] = useState<Loan | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [reason, setReason] = useState('')

  const { data, isLoading } = useQuery({ queryKey: ['admin-loans'], queryFn: () => getAllLoans() })
  const loans = data?.data ?? []

  const { mutate: changeStatus, isPending: changing } = useMutation({
    mutationFn: () => updateLoanStatus(selected!.id, { status: newStatus, reason: reason || undefined }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-loans'] }); toast.success('Status updated'); setSelected(null); setNewStatus(''); setReason('') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })
  const { mutate: disburse, isPending: disbursing } = useMutation({
    mutationFn: (id: string) => disburseLoan(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-loans'] }); toast.success('Loan disbursed') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const transitions = selected ? TRANSITIONS[selected.status] ?? [] : []

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
          const count = loans.filter(l => l.status === s).length
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
          {loans.map(loan => {
            const cfg = loanStatusConfig[loan.status as LoanStatus]
            const canTransition = (TRANSITIONS[loan.status] ?? []).length > 0
            return (
              <div key={loan.id} className="loan-card loan-card-left" style={{ borderLeftColor: cfg.color }}>
                <div className="flex items-start justify-between gap-3 wrap">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2 wrap mb-1">
                      <span className="font-bold text-text" style={{ fontSize: 16 }}>{formatCurrency(Number(loan.amount))}</span>
                      <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                    </div>
                    <p className="text-sm text-silver truncate">{loan.purpose}</p>
                    <div className="flex gap-3 mt-1 wrap">
                      <span className="text-xs text-dim">{loan.termMonths}mo · {Number(loan.interestRate)}%</span>
                      <span className="text-xs text-dim">{formatDate(loan.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 wrap" style={{ flexShrink: 0 }}>
                    {loan.status === 'APPROVED' && (
                      <Button size="sm" loading={disbursing} onClick={() => disburse(loan.id)}>Disburse</Button>
                    )}
                    {canTransition && loan.status !== 'APPROVED' && (
                      <Button size="sm" variant="outline"
                        onClick={() => { setSelected(loan); setNewStatus(TRANSITIONS[loan.status][0]) }}>
                        Update <ChevronDown size={12} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => { setSelected(null); setNewStatus('') }} title="Update Loan Status">
        {selected && (
          <>
            <div>
              <p className="text-xs text-silver mb-1">Loan</p>
              <p className="font-semibold text-text">{formatCurrency(Number(selected.amount))}</p>
              <p className="text-sm text-silver mt-1">{selected.purpose}</p>
            </div>
            <div className="field">
              <label className="field-label">New Status</label>
              <div className="flex gap-2 wrap">
                {transitions.map(s => {
                  const cfg = loanStatusConfig[s as LoanStatus]
                  return (
                    <button key={s} onClick={() => setNewStatus(s)}
                      className="badge" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: 13,
                        color: newStatus === s ? cfg.color : 'var(--silver)',
                        backgroundColor: newStatus === s ? cfg.bg : 'transparent',
                        borderColor: newStatus === s ? cfg.border : 'var(--navy-lighter)' }}>
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>
            {(newStatus === 'PENDING' || newStatus === 'DEFAULTED') && (
              <div className="field">
                <label className="field-label">Reason</label>
                <textarea className="input" rows={3} placeholder="Explain the reason…"
                  value={reason} onChange={e => setReason(e.target.value)} />
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setSelected(null); setNewStatus('') }} style={{ flex: 1 }}>Cancel</Button>
              <Button loading={changing} onClick={() => changeStatus()} disabled={!newStatus} style={{ flex: 1 }}>Confirm</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
