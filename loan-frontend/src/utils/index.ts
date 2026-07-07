import type { LoanStatus } from '@/types'

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', maximumFractionDigits: 0 }).format(amount)

export const formatDate = (date: string | null | undefined) => {
  if (!date) return '—'
  const d = new Date(date)
  if (isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(d)
}
export const formatPhone = (phone: string) => phone

export const loanStatusConfig: Record<LoanStatus, { label: string; color: string; bg: string; border: string; step: number }> = {
  PENDING:      { label: 'Pending',      color: '#FAAD14', bg: '#FAAD1415', border: '#FAAD1440', step: 1 },
  UNDER_REVIEW: { label: 'Under Review', color: '#00C9A7', bg: '#00C9A715', border: '#00C9A740', step: 2 },
  APPROVED:     { label: 'Approved',     color: '#52C41A', bg: '#52C41A15', border: '#52C41A40', step: 3 },
  DISBURSED:    { label: 'Disbursed',    color: '#1890FF', bg: '#1890FF15', border: '#1890FF40', step: 4 },
  CLOSED:       { label: 'Closed',       color: '#8899AA', bg: '#8899AA15', border: '#8899AA40', step: 5 },
  DEFAULTED:    { label: 'Defaulted',    color: '#FF4D4F', bg: '#FF4D4F15', border: '#FF4D4F40', step: 5 },
}

export const LOAN_STEPS: LoanStatus[] = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'DISBURSED', 'CLOSED']

export const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
