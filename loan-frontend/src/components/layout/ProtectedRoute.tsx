import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import type { Role } from '@/types'

const ADMIN_ROLES: Role[] = ['SUPER_ADMIN', 'LOAN_OFFICER']

interface Props {
  children: React.ReactNode
  roles?: Role[]
}

export const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}