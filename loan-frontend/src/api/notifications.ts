import api from '@/api/client'

export interface AppNotification {
  id: string
  type: string
  title: string
  message: string
  data?: Record<string, string> | null
  readAt?: string | null
  isRead?: boolean
  createdAt: string
}

export interface NotificationPage {
  data: AppNotification[]
  meta?: { page: number; limit: number; total: number; totalPages: number; unreadCount?: number }
}

export const isNotificationRead = (n: AppNotification) =>
  n.isRead === true || (n.readAt !== null && n.readAt !== undefined)

export const getNotifications = (params?: { page?: number; limit?: number; unreadOnly?: boolean }) =>
  api.get<NotificationPage>('/notifications', { params }).then(r => r.data)

export const getUnreadCount = () =>
  api.get<{ unreadCount: number }>('/notifications/unread-count').then(r => r.data.unreadCount)

export const markNotificationRead = (id: string) =>
  api.patch(`/notifications/${id}/read`).then(r => r.data)

export const markAllNotificationsRead = () =>
  api.patch('/notifications/read-all').then(r => r.data)