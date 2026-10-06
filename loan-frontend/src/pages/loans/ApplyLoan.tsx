
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

  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const [form, setForm] = useState({
    productId: '',
    amount: '',
    termValue: 12,
    purpose: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  /*
   * Load active loan products.
   *
   * getLoanProducts() already returns response.data,
   * so productsData is the array itself.
   */
  const {
    data: productsData,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ['loan-products'],
    queryFn: getLoanProducts,
  })

  const products = productsData ?? []

  /*
   * Submit loan application.
   */
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      applyForLoan({
        productId: form.productId,
        amount: Number(form.amount),
        termValue: form.termValue,
        purpose: form.purpose,
        notes: form.notes || undefined,
      }),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['my-loans'],
      })

      toast.success('Application submitted!')

      navigate('/loans')
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ?? 'Failed to submit loan application',
      )
    },
  })

  /*
   * Select a loan product.
   */
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product)

    setForm((current) => ({
      ...current,
      productId: product.id,
      amount: '',
      termValue: product.minTermValue ?? 12,
    }))

    setErrors({})
  }

  /*
   * Validate the loan application.
   */
  const validate = () => {
    const validationErrors: Record<string, string> = {}

    if (!form.productId) {
      validationErrors.product = 'Please select a loan product'
    }

    const amount = Number(form.amount)

    if (!form.amount || amount <= 0) {
      validationErrors.amount = 'Enter a valid amount'
    } else if (selectedProduct) {
      const minAmount = Number(selectedProduct.minAmount)
      const maxAmount = Number(selectedProduct.maxAmount)

      if (amount < minAmount) {
        validationErrors.amount = `Minimum is ${formatCurrency(minAmount)}`
      }

      if (amount > maxAmount) {
        validationErrors.amount = `Maximum is ${formatCurrency(maxAmount)}`
      }
    }

    if (!form.purpose || form.purpose.trim().length < 10) {
      validationErrors.purpose = 'Describe purpose (min 10 chars)'
    }

    setErrors(validationErrors)

    return Object.keys(validationErrors).length === 0
  }

  /*
   * Live repayment calculator.
   *
   * NOTE:
   * The backend remains the authoritative source for the actual
   * repayment schedule. This is only a frontend estimate.
   */
  const principal = Number(form.amount) || 0

  const annualRate = selectedProduct?.interestRate
    ? Number(selectedProduct.interestRate)
    : 0

  const monthlyRate = annualRate / 100 / 12

  const monthlyPayment =
    principal > 0 && monthlyRate > 0
      ? (principal *
          (monthlyRate *
            Math.pow(1 + monthlyRate, form.termValue))) /
        (Math.pow(1 + monthlyRate, form.termValue) - 1)
      : principal > 0
        ? principal / form.termValue
        : 0

  const estimatedTotal = monthlyPayment * form.termValue

  /*
   * Generate sensible term options.
   *
   * Example:
   * 3 - 24 months
   * might produce:
   * 3, 7, 11, 15, 19, 23
   *
   * We always include the minimum and maximum values.
   */
  const termOptions = selectedProduct
    ? (() => {
        const min = Number(selectedProduct.minTermValue)
        const max = Number(selectedProduct.maxTermValue)

        if (min >= max) {
          return [min]
        }

        const range = max - min
        const step = Math.max(1, Math.ceil(range / 6))

        const options: number[] = []

        for (let value = min; value <= max; value += step) {
          options.push(value)
        }

        if (options[options.length - 1] !== max) {
          options.push(max)
        }

        return [...new Set(options)]
      })()
    : [3, 6, 12, 24, 36, 48, 60]

  return (
    <div
      className="flex-col gap-6 fade-in"
      style={{
        display: 'flex',
        maxWidth: 520,
      }}
    >
      <div>
        <h1 className="page-title">Apply for a Loan</h1>

        <p className="page-subtitle">
          Fill in details — we'll review within 24 hours
        </p>
      </div>

      {/* Step 1 — Product selector */}
      <div className="field">
        <label className="field-label">
          Select loan product
        </label>

        {productsLoading ? (
          <div
            style={{
              height: 80,
              borderRadius: 10,
              background: 'var(--navy-lighter)',
              animation: 'pulse 1.5s infinite',
            }}
          />
        ) : products.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <p className="text-silver text-sm">
              No loan products available
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {products.map((product: any) => (
              <button
                key={product.id}
                type="button"
                onClick={() => handleProductSelect(product)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 10,
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  border: `1.5px solid ${
                    selectedProduct?.id === product.id
                      ? 'var(--teal)'
                      : 'var(--navy-lighter)'
                  }`,
                  background:
                    selectedProduct?.id === product.id
                      ? 'rgba(0,201,167,0.08)'
                      : 'var(--navy-lighter)',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text)',
                      margin: 0,
                    }}
                  >
                    {product.name}
                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--silver)',
                      margin: 0,
                      marginTop: 3,
                    }}
                  >
                    {formatCurrency(Number(product.minAmount))} –{' '}
                    {formatCurrency(Number(product.maxAmount))}
                    {' · '}
                    {product.interestRate}% p.a. ·{' '}
                    {product.interestType?.replace('_', ' ')}
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  style={{
                    color:
                      selectedProduct?.id === product.id
                        ? 'var(--teal)'
                        : 'var(--dim)',
                    flexShrink: 0,
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {errors.product && (
          <span className="field-error">
            {errors.product}
          </span>
        )}
      </div>

      {/* Step 2 — Form */}
      {selectedProduct && (
        <>
          {/* Live summary */}
          {principal > 0 && (
            <div className="alert alert-info fade-in">
              <div style={{ width: '100%' }}>
                <p
                  className="text-xs font-semibold mb-3"
                  style={{
                    color: 'var(--teal)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Loan Summary — {selectedProduct.name}
                </p>

                <div className="summary-grid">
                  {[
                    {
                      label: 'Estimated Monthly Payment',
                      val: formatCurrency(monthlyPayment),
                    },
                    {
                      label: 'Estimated Total Repayable',
                      val: formatCurrency(estimatedTotal),
                    },
                    {
                      label: 'Interest Rate',
                      val: `${annualRate}% p.a.`,
                    },
                    {
                      label: 'Estimated Total Interest',
                      val: formatCurrency(
                        Math.max(0, estimatedTotal - principal),
                      ),
                    },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-xs text-silver">
                        {label}
                      </p>

                      <p className="text-sm font-semibold text-text mt-1">
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault()

              if (validate()) {
                mutate()
              }
            }}
            className="flex-col gap-5"
            style={{
              display: 'flex',
            }}
          >
            {/* Loan amount */}
            <Input
              label={`Loan Amount (MWK ${formatCurrency(
                Number(selectedProduct.minAmount),
              )} – ${formatCurrency(
                Number(selectedProduct.maxAmount),
              )})`}
              type="number"
              placeholder={`e.g. ${formatCurrency(
                Number(selectedProduct.minAmount),
              )}`}
              icon={<DollarSign size={15} />}
              value={form.amount}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              error={errors.amount}
              min={Number(selectedProduct.minAmount)}
              max={Number(selectedProduct.maxAmount)}
            />

            {/* Loan term */}
            <div className="field">
              <label className="field-label">
                <Calendar
                  size={11}
                  style={{
                    display: 'inline',
                    marginRight: 4,
                  }}
                />

                Loan Term (
                {selectedProduct.termUnit?.toLowerCase()}
                )
              </label>

              <div className="term-grid">
                {termOptions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        termValue: term,
                      }))
                    }
                    className={`term-chip ${
                      form.termValue === term ? 'active' : ''
                    }`}
                  >
                    {term}
                    {selectedProduct.termUnit === 'MONTHS'
                      ? 'mo'
                      : 'wk'}
                  </button>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div className="field">
              <label className="field-label">
                <FileText
                  size={11}
                  style={{
                    display: 'inline',
                    marginRight: 4,
                  }}
                />

                Purpose
              </label>

              <textarea
                className={`input ${
                  errors.purpose ? 'input-error' : ''
                }`}
                rows={3}
                placeholder="Describe what you'll use this loan for (min 10 characters)"
                value={form.purpose}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    purpose: event.target.value,
                  }))
                }
              />

              {errors.purpose && (
                <span className="field-error">
                  {errors.purpose}
                </span>
              )}
            </div>

            {/* Notes */}
            <div className="field">
              <label className="field-label">
                Additional Notes (optional)
              </label>

              <textarea
                className="input"
                rows={2}
                placeholder="Extra info for the loan officer"
                value={form.notes}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
              />
            </div>

            {/* Actions */}
            <div
              className="flex gap-3"
              style={{
                paddingTop: 4,
              }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={isPending}
                style={{ flex: 1 }}
              >
                Submit Application
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
