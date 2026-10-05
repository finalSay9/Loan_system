import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Calendar, FileText, ChevronRight } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { applyForLoan, getLoanProducts } from '@/api'
import { formatCurrency } from '@/utils'
import toast from 'react-hot-toast'

export const ApplyLoan: React.FC = () => {
  const navigate = useNavigate()
  const qc = useQueryClient()

  // All hooks at the top
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [form, setForm] = useState({
    productId: '',
    amount: '',
    termValue: 12,
    purpose: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['loan-products'],
    queryFn: getLoanProducts,
  })
  
  const products = productsData?.data ?? []

  const { mutate, isPending } = useMutation({
    mutationFn: () => applyForLoan({
      productId: form.productId,
      amount: Number(form.amount),
      termValue: form.termValue,
      purpose: form.purpose,
      notes: form.notes || undefined,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      toast.success('Application submitted!')
      navigate('/loans')
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product)
    setForm(f => ({
      ...f,
      productId: product.id,
      // Reset amount and term to product defaults
      amount: '',
      termValue: product.minTermValue ?? 12,
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.productId) e.product = 'Please select a loan product'
    const amt = Number(form.amount)
    if (!form.amount || amt <= 0) {
      e.amount = 'Enter a valid amount'
    } else if (selectedProduct) {
      if (amt < Number(selectedProduct.minAmount))
        e.amount = `Minimum is ${formatCurrency(Number(selectedProduct.minAmount))}`
      if (amt > Number(selectedProduct.maxAmount))
        e.amount = `Maximum is ${formatCurrency(Number(selectedProduct.maxAmount))}`
    }
    if (!form.purpose || form.purpose.length < 10)
      e.purpose = 'Describe purpose (min 10 chars)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Live calculator using selected product's rate
  const principal = Number(form.amount) || 0
  const annualRate = selectedProduct?.interestRate ? Number(selectedProduct.interestRate) : 0
  const mr = annualRate / 100 / 12
  const mp = principal > 0 && mr > 0
    ? (principal * (mr * Math.pow(1 + mr, form.termValue))) / (Math.pow(1 + mr, form.termValue) - 1)
    : principal > 0 ? principal / form.termValue : 0
  const total = mp * form.termValue

  // Term options from product or fallback
  const termOptions = selectedProduct
    ? Array.from(
        { length: selectedProduct.maxTermValue - selectedProduct.minTermValue + 1 },
        (_, i) => selectedProduct.minTermValue + i
      ).filter((_, i) => i % Math.ceil((selectedProduct.maxTermValue - selectedProduct.minTermValue) / 6) === 0)
    : [3, 6, 12, 24, 36, 48, 60]

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <div>
        <h1 className="page-title">Apply for a Loan</h1>
        <p className="page-subtitle">Fill in details — we'll review within 24 hours</p>
      </div>

      {/* Step 1 — Product selector */}
      <div className="field">
        <label className="field-label">Select loan product</label>
        {productsLoading ? (
          <div style={{ height: 80, borderRadius: 10, background: 'var(--navy-lighter)', animation: 'pulse 1.5s infinite' }} />
        ) : products.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p className="text-silver text-sm">No loan products available</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {products.map((product: any) => (
              <button key={product.id} type="button"
                onClick={() => handleProductSelect(product)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: 10, textAlign: 'left', width: '100%',
                  cursor: 'pointer', transition: 'all .15s',
                  border: `1.5px solid ${selectedProduct?.id === product.id ? 'var(--teal)' : 'var(--navy-lighter)'}`,
                  background: selectedProduct?.id === product.id ? 'rgba(0,201,167,0.08)' : 'var(--navy-lighter)',
                }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{product.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--silver)', margin: 0, marginTop: 3 }}>
                    {formatCurrency(Number(product.minAmount))} – {formatCurrency(Number(product.maxAmount))}
                    {' · '}{product.interestRate}% p.a. · {product.interestType?.replace('_', ' ')}
                  </p>
                </div>
                <ChevronRight size={16} style={{ color: selectedProduct?.id === product.id ? 'var(--teal)' : 'var(--dim)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}
        {errors.product && <span className="field-error">{errors.product}</span>}
      </div>

      {/* Step 2 — Form (shown only after product selected) */}
      {selectedProduct && (
        <>
          {/* Live summary */}
          {principal > 0 && (
            <div className="alert alert-info fade-in">
              <div style={{ width: '100%' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Loan Summary — {selectedProduct.name}
                </p>
                <div className="summary-grid">
                  {[
                    { label: 'Monthly Payment',  val: formatCurrency(mp) },
                    { label: 'Total Repayable',   val: formatCurrency(total) },
                    { label: 'Interest Rate',     val: `${annualRate}% p.a.` },
                    { label: 'Total Interest',    val: formatCurrency(total - principal) },
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
            <Input
              label={`Loan Amount (MWK ${formatCurrency(Number(selectedProduct.minAmount))} – ${formatCurrency(Number(selectedProduct.maxAmount))})`}
              type="number"
              placeholder={`e.g. ${formatCurrency(Number(selectedProduct.minAmount))}`}
              icon={<DollarSign size={15} />}
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              error={errors.amount}
              min={Number(selectedProduct.minAmount)}
              max={Number(selectedProduct.maxAmount)}
            />

            <div className="field">
              <label className="field-label">
                <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />
                Loan Term ({selectedProduct.termUnit?.toLowerCase()})
              </label>
              <div className="term-grid">
                {termOptions.map(t => (
                  <button key={t} type="button"
                    onClick={() => setForm(f => ({ ...f, termValue: t }))}
                    className={`term-chip ${form.termValue === t ? 'active' : ''}`}>
                    {t}{selectedProduct.termUnit === 'MONTHS' ? 'mo' : 'wk'}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">
                <FileText size={11} style={{ display: 'inline', marginRight: 4 }} />
                Purpose
              </label>
              <textarea
                className={`input ${errors.purpose ? 'input-error' : ''}`}
                rows={3}
                placeholder="Describe what you'll use this loan for (min 10 characters)"
                value={form.purpose}
                onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
              />
              {errors.purpose && <span className="field-error">{errors.purpose}</span>}
            </div>

            <div className="field">
              <label className="field-label">Additional Notes (optional)</label>
              <textarea
                className="input"
                rows={2}
                placeholder="Extra info for the loan officer"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <div className="flex gap-3" style={{ paddingTop: 4 }}>
              <Button type="button" variant="outline" onClick={() => navigate(-1)} style={{ flex: 1 }}>Cancel</Button>
              <Button type="submit" loading={isPending} style={{ flex: 1 }}>Submit Application</Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}