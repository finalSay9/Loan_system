import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/auth.store'

let socket: Socket | null = null

export const useSocket = () => {
  const { user } = useAuthStore()
  const qc = useQueryClient()
  const initialized = useRef(false)

  useEffect(() => {
    if (!user || initialized.current) return
    initialized.current = true

    socket = io('http://localhost:3200', { transports: ['websocket'] })

    socket.on('connect', () => socket?.emit('join', user.id))

    socket.on('payment:updated', (data: { loanId: string }) => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      qc.invalidateQueries({ queryKey: ['loan-balance', data.loanId] })
      qc.invalidateQueries({ queryKey: ['loan', data.loanId] })
      qc.invalidateQueries({ queryKey: ['my-transactions'] })
    })

    socket.on('loan:status:updated', (data: { loanId: string }) => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      qc.invalidateQueries({ queryKey: ['loan', data.loanId] })
    })

    socket.on('admin:loan:updated', () => {
      qc.invalidateQueries({ queryKey: ['admin-loans'] })
    })

    // NEW — the event name must match what your notifications gateway emits.
    socket.on('notification:new', (n: { title?: string; message?: string }) => {
  // Refresh the unread badge.
  void qc.invalidateQueries({
    queryKey: ['notifications', 'unread-count'],
  })

  // Refresh the notification list if it has been fetched.
  void qc.invalidateQueries({
    queryKey: ['notifications', 'recent'],
  })

  // Refresh the full notifications page as well.
  void qc.invalidateQueries({
    queryKey: ['notifications'],
  })

  if (n?.title) {
    toast(n.title, { icon: '🔔' })
  }
})

    return () => {
      socket?.disconnect()
      socket = null
      initialized.current = false
    }
  }, [user?.id])
}