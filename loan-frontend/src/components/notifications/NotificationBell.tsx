import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import {
  getNotifications,
  getUnreadCount,
  isNotificationRead,
  markAllNotificationsRead,
  markNotificationRead,
  type AppNotification,
} from '@/api/notifications'
import { metaFor, targetFor, timeAgo } from './notificationMeta'

/**
 * Bell + dropdown. `tone` matches the surface it sits on:
 *  - "dark"  → borrower layout (navy)
 *  - "light" → admin topbar (white)
 */
export const NotificationBell: React.FC<{ tone?: 'dark' | 'light' }> = ({ tone = 'light' }) => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { user } = useAuthStore()
  const isStaff = user?.role === 'SUPER_ADMIN' || user?.role === 'LOAN_OFFICER'
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const dark = tone === 'dark'
  const t = {
    btnBg: dark ? 'var(--navy-lighter)' : '#F9FAFB',
    btnBorder: dark ? 'none' : '1px solid #E5E7EB',
    btnColor: dark ? 'var(--silver)' : '#6B7280',
    ring: dark ? 'var(--navy-light)' : '#ffffff',
    panelBg: dark ? 'var(--navy-light)' : '#ffffff',
    panelBorder: dark ? '1px solid var(--navy-lighter)' : '1px solid #E5E7EB',
    title: dark ? 'var(--text)' : '#111827',
    body: dark ? 'var(--silver)' : '#6B7280',
    muted: dark ? 'var(--dim)' : '#9CA3AF',
    divider: dark ? 'var(--navy-lighter)' : '#F3F4F6',
    unreadBg: dark ? 'rgba(0,201,167,0.07)' : '#F5F8FF',
    hover: dark ? 'rgba(255,255,255,0.04)' : '#F9FAFB',
    accent: dark ? 'var(--teal)' : '#1a3a6b',
  }

  const { data: unread = 0 } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadCount,
    refetchInterval: 60_000, // safety net if the socket drops
  })

  const { data: recent, isLoading } = useQuery({
    queryKey: ['notifications', 'recent'],
    queryFn: () => getNotifications({ page: 1, limit: 8 }),
    enabled: open,
  })
  const items = recent?.data ?? []

  const refresh = () => qc.invalidateQueries({ queryKey: ['notifications'] })

  const { mutate: markRead } = useMutation({ mutationFn: markNotificationRead, onSuccess: refresh })
  const { mutate: markAll, isPending: markingAll } = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: refresh,
  })

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleOpenItem = (n: AppNotification) => {
    if (!isNotificationRead(n)) markRead(n.id)
    const target = targetFor(n, isStaff)
    setOpen(false)
    if (target) navigate(target)
  }

  const viewAllPath = isStaff ? '/admin/notifications' : '/notifications'

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.btnBg, border: t.btnBorder, color: t.btnColor, cursor: 'pointer', fontSize: 17, position: 'relative' }}>
        <i className="ti ti-bell" />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 99, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${t.ring}`, boxSizing: 'border-box' }}>
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div role="dialog" aria-label="Notifications"
          style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 360, maxWidth: 'calc(100vw - 24px)', background: t.panelBg, border: t.panelBorder, borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.18)', zIndex: 60, overflow: 'hidden' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${t.divider}` }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.title }}>Notifications</span>
            <button onClick={() => markAll()} disabled={unread === 0 || markingAll}
              style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 600, color: unread === 0 ? t.muted : t.accent, cursor: unread === 0 ? 'default' : 'pointer', padding: 0 }}>
              Mark all as read
            </button>
          </div>

          <div style={{ maxHeight: 380, overflowY: 'auto' }}>
            {isLoading ? (
              <p style={{ padding: 24, textAlign: 'center', fontSize: 13, color: t.muted, margin: 0 }}>Loading…</p>
            ) : items.length === 0 ? (
              <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                <i className="ti ti-bell-off" style={{ fontSize: 28, color: t.muted, display: 'block', marginBottom: 8 }} />
                <p style={{ fontSize: 13, color: t.body, margin: 0 }}>You're all caught up</p>
                <p style={{ fontSize: 12, color: t.muted, margin: '4px 0 0' }}>Updates about your loans will show up here.</p>
              </div>
            ) : (
              items.map(n => {
                const meta = metaFor(n.type)
                const read = isNotificationRead(n)
                return (
                  <button key={n.id} onClick={() => handleOpenItem(n)}
                    style={{ display: 'flex', gap: 10, width: '100%', textAlign: 'left', padding: '12px 16px', background: read ? 'transparent' : t.unreadBg, border: 'none', borderBottom: `1px solid ${t.divider}`, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = t.hover)}
                    onMouseLeave={e => (e.currentTarget.style.background = read ? 'transparent' : t.unreadBg)}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: meta.bg, color: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                      <i className={`ti ${meta.icon}`} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: read ? 500 : 700, color: t.title, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</span>
                        {!read && <span aria-label="Unread" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0 }} />}
                      </span>
                      <span style={{ fontSize: 12, color: t.body, marginTop: 2, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{n.message}</span>
                      <span style={{ display: 'block', fontSize: 11, color: t.muted, marginTop: 4 }}>{timeAgo(n.createdAt)}</span>
                    </span>
                  </button>
                )
              })
            )}
          </div>

          <button onClick={() => { setOpen(false); navigate(viewAllPath) }}
            style={{ width: '100%', padding: '11px 16px', background: 'none', border: 'none', borderTop: `1px solid ${t.divider}`, fontSize: 12, fontWeight: 600, color: t.accent, cursor: 'pointer' }}>
            View all notifications
          </button>
        </div>
      )}
    </div>
  )
}