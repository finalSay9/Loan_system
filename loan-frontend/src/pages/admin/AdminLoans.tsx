import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Shield, ChevronDown } from 'lucide-react'
import { Card, Badge, Skeleton, Button, Modal } from '@/components/ui'
import { getAllLoans, updateLoanStatus, disburseLoan } from '@/api'
import { formatCurrency, formatDate, loanStatusConfig } from '@/utils'
import type { Loan, LoanStatus } from '@/types'
import toast from 'react-hot-toast'

const STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING:      ['UNDER_REVIEW'],
  UNDER_REVIEW: ['APPROVED', 'PENDING'],
  APPROVED:     ['DISBURSED'],
  DISBURSED:    ['CLOSED', 'DEFAULTED'],
}

export const AdminLoans: React.FC = () => {
  const qc = useQueryClient()
  const [selected, setSelected] = useState<Loan | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [reason, setReason] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-loans'],
    queryFn: () => getAllLoans(),
  })
  const loans = data?.data ?? []

  const { mutate: changeStatus, isPending: changingStatus } = useMutation({
    mutationFn: () => updateLoanStatus(selected!.id, { status: newStatus, reason: reason || undefined }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-loans'] })
      toast.success(`Loan status updated to ${newStatus}`)
      setSelected(null)
      setNewStatus('')
      setReason('')
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Update failed'),
  })

  const { mutate: disburse, isPending: disbursing } = useMutation({
    mutationFn: (id: string) => disburseLoan(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-loans'] })
      toast.success('Loan disbursed successfully')
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Disbursement failed'),
  })

  const transitions = selected ? STATUS_TRANSITIONS[selected.status] ?? [] : []

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Shield size={20} className="text-[#00C9A7]" />
        <div>
          <h1 className="text-2xl font-bold text-[#F0F4F8]">All Loan Applications</h1>
          <p className="text-sm text-[#8899AA] mt-0.5">{loans.length} total</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'DISBURSED'] as LoanStatus[]).map(s => {
          const cfg = loanStatusConfig[s]
          const count = loans.filter(l => l.status === s).length
          return (
            <div key={s} className="bg-[#1E2D3D] border border-[#243447] rounded-xl p-3" style={{ borderTop: `2px solid ${cfg.color}` }}>
              <p className="text-xs text-[#8899AA]">{cfg.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: cfg.color }}>{count}</p>
            </div>
          )
        })}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {loans.map(loan => {
            const cfg = loanStatusConfig[loan.status as LoanStatus]
            const canTransition = (STATUS_TRANSITIONS[loan.status] ?? []).length > 0
            return (
              <Card key={loan.id} className="hover:border-[#243447]" style={{ borderLeft: `3px solid ${cfg.color}` } as React.CSSProperties}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-bold text-[#F0F4F8]">{formatCurrency(Number(loan.amount))}</p>
                      <Badge status={loan.status} label={cfg.label} color={cfg.color} bg={cfg.bg} border={cfg.border} />
                    </div>
                    <p className="text-sm text-[#8899AA] truncate">{loan.purpose}</p>
                    <div className="flex gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-[#4A6080]">{loan.termMonths}mo · {Number(loan.interestRate)}%</span>
                      <span className="text-xs text-[#4A6080]">{formatDate(loan.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 flex-wrap">
                    {loan.status === 'APPROVED' && (
                      <Button size="sm" loading={disbursing} onClick={() => disburse(loan.id)}>
                        Disburse
                      </Button>
                    )}
                    {canTransition && loan.status !== 'APPROVED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setSelected(loan); setNewStatus(STATUS_TRANSITIONS[loan.status][0]) }}
                      >
                        Update <ChevronDown size={12} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Status update modal */}
      <Modal isOpen={!!selected} onClose={() => { setSelected(null); setNewStatus('') }} title="Update Loan Status">
        {selected && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-[#8899AA] mb-1">Loan</p>
              <p className="font-semibold text-[#F0F4F8]">{formatCurrency(Number(selected.amount))}</p>
              <p className="text-sm text-[#8899AA]">{selected.purpose}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider">New Status</label>
              <div className="flex gap-2 flex-wrap">
                {transitions.map(s => {
                  const cfg = loanStatusConfig[s as LoanStatus]
                  return (
                    <button
                      key={s}
                      onClick={() => setNewStatus(s)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                      style={{
                        color: newStatus === s ? cfg.color : '#8899AA',
                        backgroundColor: newStatus === s ? cfg.bg : 'transparent',
                        borderColor: newStatus === s ? cfg.border : '#243447',
                      }}
                    >
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>
            {(newStatus === 'PENDING' || newStatus === 'DEFAULTED') && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider">Reason</label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Explain the reason for this decision…"
                  rows={3}
                  className="w-full bg-[#243447] border border-[#243447] rounded-lg px-3 py-2 text-sm text-[#F0F4F8] placeholder:text-[#4A6080] focus:outline-none focus:border-[#00C9A7] resize-none"
                />
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" onClick={() => { setSelected(null); setNewStatus('') }} className="flex-1">Cancel</Button>
              <Button loading={changingStatus} onClick={() => changeStatus()} disabled={!newStatus} className="flex-1">
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
