export type Role = 'BORROWER' | 'LOAN_OFFICER' | 'ACCOUNTANT' | 'COMPLIANCE_OFFICER' | 'SUPER_ADMIN'
export type KycStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'
export type LoanStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'DISBURSED' | 'CLOSED' | 'DEFAULTED'


export interface User {
  id: string
  name: string
  phone: string
  email?: string
  address: string
  occupation: string
  role: Role
  kycStatus: KycStatus
  createdAt: string
}

export interface Loan {
  id: string
  userId: string
  amount: number
  purpose: string
  notes?: string
  status: LoanStatus
  interestRate: number
  termMonths: number
  rejectionReason?: string
  disbursedAt?: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface RepaymentSchedule {
  id: string
  loanId: string
  installmentNumber: number
  dueDate: string
  principalAmount: number
  interestAmount: number
  amountDue: number
  amountPaid: number
  remainingBalance: number
  penalty: number
  status: 'PENDING' | 'PAID' | 'OVERDUE'
}

export interface AuthResponse {
  message: string
  access_token: string
  data: User
}

export interface ApiError {
  message: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { page: number; limit: number; count: number }
}
