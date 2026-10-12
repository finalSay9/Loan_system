import type { AppNotification } from '@/api/notifications'

// Colour + icon per notification type. Unknown types fall back to "info".
export const NOTIFICATION_META: Record<string, { icon: string; color: string; bg: string }> = {
  LOAN_APPROVED:  { icon: 'ti-circle-check', color: '#16A34A', bg: '#DCFCE7' },
  LOAN_REJECTED:  { icon: 'ti-circle-x',     color: '#DC2626', bg: '#FEE2E2' },
  LOAN_DISBURSED: { icon: 'ti-cash',         color: '#2563EB', bg: '#DBEAFE' },
  info:           { icon: 'ti-bell',         color: '#6B7280', bg: '#F3F4F6' },
}

export const metaFor = (type: string) => NOTIFICATION_META[type] ?? NOTIFICATION_META.info

export const timeAgo = (iso: string) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (Number.isNaN(seconds)) return ''
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

// Where a notification should take the person when clicked.
export const targetFor = (n: AppNotification, isStaff: boolean) => {
  const loanId = n.data?.loanId
  if (!loanId) return null
  return isStaff ? '/admin/loans' : `/loans/${loanId}`
}