import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Calendar, FileText } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { applyForLoan } from '@/api'
import { formatCurrency } from '@/utils'
import toast from 'react-hot-toast'

const TERMS = [3, 6, 12, 24, 36, 48, 60]
const RATE = 10.5

export const ApplyLoan: React.FC = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [form, setForm] = useState({ amount: '', termMonths: 12, purpose: '', notes: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate, isPending } = useMutation({
    mutationFn: () => applyForLoan({ amount: Number(form.amount), termMonths: form.termMonths, purpose: form.purpose, notes: form.notes || undefined }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['my-loans'] }); toast.success('Application submitted!'); navigate('/loans') },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.amount || Number(form.amount) < 1000) e.amount = 'Minimum is MWK 1,000'
    if (Number(form.amount) > 5000000) e.amount = 'Maximum is MWK 5,000,000'
    if (!form.purpose || form.purpose.length < 10) e.purpose = 'Describe purpose (min 10 chars)'
    setErrors(e); return Object.keys(e).length === 0
  }

  const principal = Number(form.amount) || 0
  const mr = RATE / 100 / 12
  const mp = principal > 0 ? (principal * (mr * Math.pow(1 + mr, form.termMonths))) / (Math.pow(1 + mr, form.termMonths) - 1) : 0
  const total = mp * form.termMonths

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <div>
        <h1 className="page-title">Apply for a Loan</h1>
        <p className="page-subtitle">Fill in details — we'll review within 24 hours</p>
      </div>

      {/* Live summary */}
      {principal > 0 && (
        <div className="alert alert-info fade-in">
          <div style={{ width: '100%' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Loan Summary</p>
            <div className="summary-grid">
              {[
                { label: 'Monthly Payment', val: formatCurrency(mp) },
                { label: 'Total Repayable', val: formatCurrency(total) },
                { label: 'Interest Rate', val: `${RATE}% p.a.` },
                { label: 'Total Interest', val: formatCurrency(total - principal) },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-xs text-silver">{label}</p>
                  <p className="text-sm font-semibold text-text mt-1">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={e => { e.preventDefault(); validate() && mutate() }} className="flex-col gap-5" style={{ display: 'flex' }}>
        <Input label="Loan Amount (MWK)" type="number" placeholder="e.g. 50000"
          icon={<DollarSign size={15} />}
          value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          error={errors.amount} />

        <div className="field">
          <label className="field-label"><Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />Loan Term</label>
          <div className="term-grid">
            {TERMS.map(t => (
              <button key={t} type="button" onClick={() => setForm(f => ({ ...f, termMonths: t }))}
                className={`term-chip ${form.termMonths === t ? 'active' : ''}`}>
                {t}mo
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label"><FileText size={11} style={{ display: 'inline', marginRight: 4 }} />Purpose</label>
          <textarea className={`input ${errors.purpose ? 'input-error' : ''}`} rows={3}
            placeholder="Describe what you'll use this loan for (min 10 characters)"
            value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} />
          {errors.purpose && <span className="field-error">{errors.purpose}</span>}
        </div>

        <div className="field">
          <label className="field-label">Additional Notes (optional)</label>
          <textarea className="input" rows={2} placeholder="Extra info for the loan officer"
            value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
        </div>

        <div className="flex gap-3" style={{ paddingTop: 4 }}>
          <Button type="button" variant="outline" onClick={() => navigate(-1)} style={{ flex: 1 }}>Cancel</Button>
          <Button type="submit" loading={isPending} style={{ flex: 1 }}>Submit Application</Button>
        </div>
      </form>
    </div>
  )
}
