import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'

let socket: Socket | null = null

export const useSocket = () => {
  const { user } = useAuthStore()
  const qc = useQueryClient()
  const initialized = useRef(false)

  useEffect(() => {
    if (!user || initialized.current) return
    initialized.current = true

    socket = io('http://localhost:3200', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      // Join the user's own room
      socket?.emit('join', user.id)
    })

    // Payment updated — invalidate loan and balance data
    socket.on('payment:updated', (data: { loanId: string }) => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      qc.invalidateQueries({ queryKey: ['loan-balance', data.loanId] })
      qc.invalidateQueries({ queryKey: ['my-transactions'] })
    })

    // Loan status changed (approved, disbursed etc)
    socket.on('loan:status:updated', (data: { loanId: string }) => {
      qc.invalidateQueries({ queryKey: ['my-loans'] })
      qc.invalidateQueries({ queryKey: ['loan', data.loanId] })
    })

    // Admin events
    socket.on('admin:loan:updated', () => {
      qc.invalidateQueries({ queryKey: ['admin-loans'] })
    })

    return () => {
      socket?.disconnect()
      socket = null
      initialized.current = false
    }
  }, [user?.id])
}