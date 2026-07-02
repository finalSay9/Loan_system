import api from './client'
import type { AuthResponse, Loan, User, RepaymentSchedule } from '@/types'

// Auth
export const registerUser = (data: {
  name: string; phone: string; email?: string
  password: string; address: string; occupation: string
}) => api.post<AuthResponse>('/users/register', data).then(r => r.data)

export const loginUser = (data: { phone: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', data).then(r => r.data)

export const getMe = () =>
  api.get<User>('/auth/me').then(r => r.data)

// Loans
export const applyForLoan = (data: {
  amount: number; termMonths: number; purpose: string; notes?: string
}) => api.post<Loan>('/loans', data).then(r => r.data)

export const getMyLoans = (params?: { status?: string; page?: number; limit?: number }) =>
  api.get<{ data: Loan[]; meta: any }>('/loans/my', { params }).then(r => r.data)

export const getMyLoanById = (id: string) =>
  api.get<Loan>(`/loans/my/${id}`).then(r => r.data)

export const getLoanSchedule = (id: string) =>
  api.get<RepaymentSchedule[]>(`/loans/${id}/schedule`).then(r => r.data)

// Admin
export const getAllLoans = (params?: any) =>
  api.get<{ data: Loan[]; meta: any }>('/loans', { params }).then(r => r.data)

export const updateLoanStatus = (id: string, data: { status: string; reason?: string }) =>
  api.patch(`/loans/${id}/status`, data).then(r => r.data)

export const disburseLoan = (id: string) =>
  api.post(`/loans/${id}/disburse-loan`).then(r => r.data)
