import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Calendar, FileText, Info } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { applyForLoan } from '@/api'
import { formatCurrency } from '@/utils'
import toast from 'react-hot-toast'

const TERM_OPTIONS = [3, 6, 12, 24, 36, 48, 60]
const INTEREST_RATE = 10.5
const MIN_AMOUNT = 1000
const MAX_AMOUNT = 5000000

export const ApplyLoan: React.FC = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [form, setForm] = useState({ amount: '', termMonths: 12, purpose: '', notes: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate, isPending } = useMutation({
    mutationFn: () => applyForLoan({ amount: Number(form.amount), termMonths: form.termMonths, purpose: form.purpose, notes: form.notes || undefined }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      toast.success('Loan application submitted!')
      navigate('/loans')
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Application failed'),
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.amount || Number(form.amount) < MIN_AMOUNT) e.amount = `Minimum is ${formatCurrency(MIN_AMOUNT)}`
    if (Number(form.amount) > MAX_AMOUNT) e.amount = `Maximum is ${formatCurrency(MAX_AMOUNT)}`
    if (!form.purpose || form.purpose.length < 10) e.purpose = 'Please describe the purpose (min 10 chars)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) mutate()
  }

  // Live calculation
  const principal = Number(form.amount) || 0
  const monthlyRate = INTEREST_RATE / 100 / 12
  const months = form.termMonths
  const monthlyPayment = principal > 0 && months > 0
    ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
    : 0
  const totalRepayable = monthlyPayment * months

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-[#F0F4F8]">Apply for a Loan</h1>
        <p className="text-sm text-[#8899AA] mt-0.5">Fill in the details below — we'll review within 24 hours</p>
      </div>

      {/* Live summary card */}
      {principal > 0 && (
        <div className="bg-[#00C9A710] border border-[#00C9A730] rounded-xl p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Info size={14} className="text-[#00C9A7]" />
            <span className="text-xs font-medium text-[#00C9A7] uppercase tracking-wider">Loan Summary</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Monthly Payment', value: formatCurrency(monthlyPayment) },
              { label: 'Total Repayable', value: formatCurrency(totalRepayable) },
              { label: 'Interest Rate', value: `${INTEREST_RATE}% p.a.` },
              { label: 'Total Interest', value: formatCurrency(totalRepayable - principal) },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-[#8899AA]">{label}</p>
                <p className="text-sm font-semibold text-[#F0F4F8] mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Loan Amount (MWK)"
          type="number"
          placeholder="e.g. 50000"
          icon={<DollarSign size={15} />}
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          error={errors.amount}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
        />

        {/* Term selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={12} />
            Loan Term
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TERM_OPTIONS.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setForm(f => ({ ...f, termMonths: t }))}
                className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                  form.termMonths === t
                    ? 'bg-[#00C9A720] text-[#00C9A7] border-[#00C9A740]'
                    : 'text-[#8899AA] border-[#243447] hover:border-[#8899AA]'
                }`}
              >
                {t}mo
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={12} />
            Purpose
          </label>
          <textarea
            placeholder="Describe what you'll use this loan for (e.g. business capital to stock my shop)"
            rows={3}
            value={form.purpose}
            onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
            className={`w-full bg-[#1E2D3D] border ${errors.purpose ? 'border-[#FF4D4F]' : 'border-[#243447]'} rounded-lg px-4 py-3 text-[#F0F4F8] text-sm placeholder:text-[#4A6080] focus:outline-none focus:border-[#00C9A7] resize-none transition-all`}
          />
          {errors.purpose && <span className="text-xs text-[#FF4D4F]">{errors.purpose}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider">Additional Notes (optional)</label>
          <textarea
            placeholder="Any extra information for the loan officer"
            rows={2}
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            className="w-full bg-[#1E2D3D] border border-[#243447] rounded-lg px-4 py-3 text-[#F0F4F8] text-sm placeholder:text-[#4A6080] focus:outline-none focus:border-[#00C9A7] resize-none transition-all"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">Cancel</Button>
          <Button type="submit" loading={isPending} className="flex-1">Submit Application</Button>
        </div>
      </form>
    </div>
  )
}
