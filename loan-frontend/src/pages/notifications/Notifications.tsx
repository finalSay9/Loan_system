import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import {
  getNotifications,
  isNotificationRead,
  markAllNotificationsRead,
  markNotificationRead,
  type AppNotification,
} from '@/api/notifications'
import { metaFor, targetFor, timeAgo } from '@/components/notifications/notificationMeta'

const PAGE_SIZE = 20

/**
 * Full notification history. Renders only its content, so wrap it:
 *  - borrowers:  <AppLayout><Notifications /></AppLayout>
 *  - staff:      <AdminLayout title="Notifications"><Notifications /></AdminLayout>
 * Staff content sits on a light background, borrower content on navy; `tone` handles both.
 */
export const Notifications: React.FC<{ tone?: 'dark' | 'light' }> = ({ tone = 'dark' }) => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { user } = useAuthStore()
  const isStaff = user?.role === 'SUPER_ADMIN' || user?.role === 'LOAN_OFFICER'
  const [unreadOnly, setUnreadOnly] = useState(false)

  const dark = tone === 'dark'
  const t = {
    card: dark ? 'var(--navy-light)' : '#ffffff',
    border: dark ? '1px solid var(--navy-lighter)' : '1px solid #E5E7EB',
    divider: dark ? 'var(--navy-lighter)' : '#F3F4F6',
    title: dark ? 'var(--text)' : '#111827',
    body: dark ? 'var(--silver)' : '#6B7280',
    muted: dark ? 'var(--dim)' : '#9CA3AF',
    unreadBg: dark ? 'rgba(0,201,167,0.07)' : '#F5F8FF',
    hover: dark ? 'rgba(255,255,255,0.04)' : '#F9FAFB',
    accent: dark ? 'var(--teal)' : '#1a3a6b',
    chipOn: dark ? 'var(--teal)' : '#1a3a6b',
    chipOnText: dark ? '#0a1420' : '#ffffff',
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['notifications', 'list', unreadOnly],
    queryFn: ({ pageParam }) => getNotifications({ page: pageParam, limit: PAGE_SIZE, unreadOnly }),
    initialPageParam: 1,
    getNextPageParam: last =>
      last.meta && last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined,
  })

  const items: AppNotification[] = data?.pages.flatMap(p => p.data) ?? []
  const refresh = () => qc.invalidateQueries({ queryKey: ['notifications'] })

  const { mutate: markRead } = useMutation({ mutationFn: markNotificationRead, onSuccess: refresh })
  const { mutate: markAll, isPending: markingAll } = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: refresh,
  })

  const open = (n: AppNotification) => {
    if (!isNotificationRead(n)) markRead(n.id)
    const target = targetFor(n, isStaff)
    if (target) navigate(target)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{ label: 'All', value: false }, { label: 'Unread', value: true }].map(f => (
            <button key={f.label} onClick={() => setUnreadOnly(f.value)}
              style={{ padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: unreadOnly === f.value ? 'none' : t.border,
                background: unreadOnly === f.value ? t.chipOn : 'transparent',
                color: unreadOnly === f.value ? t.chipOnText : t.body }}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => markAll()} disabled={markingAll}
          style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 600, color: t.accent, cursor: 'pointer' }}>
          Mark all as read
        </button>
      </div>

      <div style={{ background: t.card, border: t.border, borderRadius: 12, overflow: 'hidden' }}>
        {isLoading ? (
          <p style={{ padding: 32, textAlign: 'center', fontSize: 13, color: t.muted, margin: 0 }}>Loading notifications…</p>
        ) : items.length === 0 ? (
          <div style={{ padding: '56px 20px', textAlign: 'center' }}>
            <i className="ti ti-bell-off" style={{ fontSize: 34, color: t.muted, display: 'block', marginBottom: 10 }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: t.title, margin: 0 }}>
              {unreadOnly ? 'No unread notifications' : 'No notifications yet'}
            </p>
            <p style={{ fontSize: 12, color: t.muted, margin: '4px 0 0' }}>
              Loan approvals, rejections and disbursements will appear here.
            </p>
          </div>
        ) : (
          items.map((n, i) => {
            const meta = metaFor(n.type)
            const read = isNotificationRead(n)
            return (
              <button key={n.id} onClick={() => open(n)}
                style={{ display: 'flex', gap: 12, width: '100%', textAlign: 'left', padding: '14px 18px', background: read ? 'transparent' : t.unreadBg, border: 'none', borderBottom: i === items.length - 1 ? 'none' : `1px solid ${t.divider}`, cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = t.hover)}
                onMouseLeave={e => (e.currentTarget.style.background = read ? 'transparent' : t.unreadBg)}>
                <span style={{ width: 36, height: 36, borderRadius: 9, background: meta.bg, color: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>
                  <i className={`ti ${meta.icon}`} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: read ? 500 : 700, color: t.title }}>{n.title}</span>
                    {!read && <span aria-label="Unread" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />}
                  </span>
                  <span style={{ display: 'block', fontSize: 13, color: t.body, marginTop: 3, lineHeight: 1.45 }}>{n.message}</span>
                </span>
                <span style={{ fontSize: 11, color: t.muted, flexShrink: 0, paddingTop: 2 }}>{timeAgo(n.createdAt)}</span>
              </button>
            )
          })
        )}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}
          style={{ alignSelf: 'center', padding: '8px 20px', borderRadius: 8, border: t.border, background: 'transparent', color: t.body, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          {isFetchingNextPage ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  )
}