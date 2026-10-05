import axios from 'axios';
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

export const getLoanProducts = () =>
  api.get('/loan-products').then(r => r.data)


export interface ApplyForLoanRequest {
  productId: string
  amount: number
  termValue: number
  purpose: string
  notes?: string
}

export const applyForLoan = (data: ApplyForLoanRequest) =>
  api.post<Loan>('/loans', data).then(r => r.data)

export const getMyLoans = (params?: { status?: string; page?: number; limit?: number }) =>
  api.get<{ data: Loan[]; meta: any }>('/loans/my', { params }).then(r => r.data)

export const getMyLoanById = (id: string) =>
  api.get<Loan>(`/loans/my/${id}`).then(r => r.data)

export const getLoanSchedule = (id: string) =>
  api.get<RepaymentSchedule[]>(`/loans/${id}/schedule`).then(r => r.data)

// Admin
export const getAllLoans = (params?: any) =>
  api.get<{ data: any[]; meta: any }>('/loans', { params }).then(r => r.data)


export const updateLoanStatus = (id: string, data: { status: string; reason?: string }) =>
  api.patch(`/loans/${id}/status`, data).then(r => r.data)


export const adminGetLoanById = (id: string) =>
  api.get<any>(`/loans/admin/${id}`).then(r => r.data)



export const getAllUsers = (params?: { search?: string }) =>
  api.get<{ data: any[]; meta: any }>("/users", { params }).then((r) => r.data);

export const getUserById = (id: string) =>
  api.get<any>(`/users/${id}`).then((r) => r.data);

export const getLoanBalance = (loanId: string) =>
  api.get(`/payments/balance/${loanId}`).then(r => r.data)


// Explicit lifecycle actions — replace the old updateLoanStatus
export const startLoanReview = (id: string) =>
  api.patch(`/loans/${id}/review`).then(r => r.data)

export const approveLoan = (id: string) =>
  api.patch(`/loans/${id}/approve`).then(r => r.data)

export const rejectLoan = (id: string, reason: string) =>
  api.patch(`/loans/${id}/reject`, { reason }).then(r => r.data)

export const disburseLoan = (id: string) =>
  api.post(`/loans/${id}/disburse`).then(r => r.data)

export const closeLoan = (id: string) =>
  api.patch(`/loans/${id}/close`).then(r => r.data)

export const defaultLoan = (id: string) =>
  api.patch(`/loans/${id}/default`).then(r => r.data)





// Backoffice API — hits Django on port 8000
const backoffice = axios.create({ baseURL: '/backoffice/api' })

backoffice.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getReportSummary = () =>
  backoffice.get('/reports/summary/').then(r => r.data)

export const getDisbursementReport = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/disbursements/', { params }).then(r => r.data)

export const getCollectionsReport = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/collections/', { params }).then(r => r.data)

export const getDelinquencyReport = () =>
  backoffice.get('/reports/delinquency/').then(r => r.data)
