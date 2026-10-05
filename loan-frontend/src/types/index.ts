import api from '@/api/client'

export type Role =
  | 'BORROWER'
  | 'LOAN_OFFICER'
  | 'ACCOUNTANT'
  | 'COMPLIANCE_OFFICER'
  | 'SUPER_ADMIN'

export type KycStatus =
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED'

export type LoanStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED'
  | 'CLOSED'
  | 'DEFAULTED'
  | 'CANCELLED'

export type TermUnit =
  | 'WEEKS'
  | 'MONTHS'

export type InterestType =
  | 'FLAT'
  | 'REDUCING_BALANCE'

export type RepaymentFrequency =
  | 'WEEKLY'
  | 'BIWEEKLY'
  | 'MONTHLY'

export type FeeType =
  | 'FIXED'
  | 'PERCENTAGE'

export type LateFeeType =
  | 'FIXED'
  | 'PERCENTAGE'

export type InstallmentStatus =
  | 'PENDING'
  | 'PARTIALLY_PAID'
  | 'PAID'
  | 'OVERDUE'
  | 'WAIVED'

export type TransactionType =
  | 'DISBURSEMENT'
  | 'REPAYMENT'
  | 'PENALTY'
  | 'FEE'
  | 'REFUND'
  | 'ADJUSTMENT'


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
  updatedAt?: string
}


export interface LoanProduct {
  id: string

  name: string
  description?: string

  minAmount: number
  maxAmount: number

  interestRate: number
  interestType: InterestType

  minTermValue: number
  maxTermValue: number
  termUnit: TermUnit

  repaymentFrequency: RepaymentFrequency

  processingFeeType: FeeType
  processingFeeAmount: number
  processingFeeRate: number

  lateFeeType: LateFeeType
  lateFeeAmount: number
  lateFeeRate: number

  gracePeriodDays: number

  isActive: boolean

  createdAt: string
  updatedAt: string
}



export interface Loan {
  id: string

  userId: string
  productId: string

  amount: number

  purpose: string
  notes?: string

  status: LoanStatus

  /*
   * Product configuration snapshot
   */
  interestRate: number
  interestType: InterestType

  termValue: number
  termUnit: TermUnit

  numberOfInstallments: number

  repaymentFrequency: RepaymentFrequency

  /*
   * Processing fee snapshot
   */
  processingFeeType: FeeType
  processingFeeAmount: number
  processingFeeRate: number

  /*
   * Late fee snapshot
   */
  lateFeeType: LateFeeType
  lateFeeAmount: number
  lateFeeRate: number

  gracePeriodDays: number

  /*
   * Loan totals
   */
  totalInterest: number
  totalFees: number
  totalPayable: number

  /*
   * Rejection
   */
  rejectionReason?: string

  /*
   * Approval
   */
  approvedAt?: string
  approvedById?: string

  /*
   * Disbursement
   */
  disbursedAt?: string
  disbursedById?: string

  /*
   * Repayment dates
   */
  firstPaymentDueAt?: string
  maturityDate?: string
  closedAt?: string

  /*
   * Optimistic locking
   */
  version: number

  createdAt: string
  updatedAt: string

  /*
   * Relations returned by the API
   */
  product?: LoanProduct

  repayments?: RepaymentSchedule[]

  transactions?: Transaction[]

  balance?: LoanBalance
}


/* ============================================================
 * REPAYMENT SCHEDULE
 * ============================================================ */

export interface RepaymentSchedule {
  id: string

  loanId: string

  installmentNumber: number

  dueDate: string

  /*
   * Amounts due
   */
  principalAmount: number
  interestAmount: number
  feeAmount: number
  penaltyAmount: number

  baseAmountDue: number
  amountDue: number

  /*
   * Amounts paid
   */
  amountPaid: number
  principalPaid: number
  interestPaid: number
  feePaid: number
  penaltyPaid: number

  /*
   * Remaining balance after this installment
   */
  remainingBalance: number

  status: InstallmentStatus

  paidAt?: string

  createdAt: string
  updatedAt: string

  allocations?: PaymentAllocation[]
}


/* ============================================================
 * PAYMENT ALLOCATION
 * ============================================================ */

export interface PaymentAllocation {
  id: string

  transactionId: string
  scheduleId: string

  principalAmount: number
  interestAmount: number
  feeAmount: number
  penaltyAmount: number

  createdAt: string
}


/* ============================================================
 * TRANSACTION
 * ============================================================ */

export interface Transaction {
  id: string

  loanId: string

  type: TransactionType

  amount: number

  reference: string

  providerRef?: string

  principalAmount?: number
  interestAmount?: number
  feeAmount?: number
  penaltyAmount?: number

  idempotencyKey?: string

  metadata?: Record<string, unknown>

  createdAt: string

  allocations?: PaymentAllocation[]
}


/* ============================================================
 * LOAN BALANCE
 * ============================================================ */

export interface LoanBalance {
  totalDue: number
  totalPaid: number
  outstanding: number

  progressPercent: number
}


/* ============================================================
 * AUTH
 * ============================================================ */

export interface AuthResponse {
  message: string

  access_token: string

  data: User
}


/* ============================================================
 * API ERROR
 * ============================================================ */

export interface ApiError {
  message: string
  statusCode: number
}


/* ============================================================
 * PAGINATION
 * ============================================================ */

export interface PaginationMeta {
  page: number
  limit: number
  count: number
  total?: number
  totalPages?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}


/* ============================================================
 * LOAN APPLICATION
 * ============================================================ */

export interface ApplyForLoanRequest {
  productId: string
  amount: number
  termValue: number
  purpose: string
  notes?: string
}


/* ============================================================
 * API FUNCTIONS
 * ============================================================ */

/**
 * Apply for a new loan
 */
export const applyForLoan = (
  data: ApplyForLoanRequest,
) =>
  api
    .post('/loans', data)
    .then((response) => response.data)


/**
 * Get authenticated user's loans
 */
export const getMyLoans = (
  params?: Record<string, unknown>,
) =>
  api
    .get('/loans/my', { params })
    .then((response) => response.data)


/**
 * Get authenticated user's loan details
 */
export const getMyLoanById = (
  loanId: string,
) =>
  api
    .get(`/loans/my/${loanId}`)
    .then((response) => response.data)


/**
 * Get all loans for staff
 */
export const getAllLoans = (
  params?: Record<string, unknown>,
) =>
  api
    .get('/loans', { params })
    .then((response) => response.data)


/**
 * Get detailed loan information for staff
 */
export const getAdminLoanById = (
  loanId: string,
) =>
  api
    .get(`/loans/admin/${loanId}`)
    .then((response) => response.data)


/**
 * Start loan review
 */
export const startLoanReview = (
  loanId: string,
) =>
  api
    .patch(`/loans/${loanId}/review`)
    .then((response) => response.data)


/**
 * Approve loan
 */
export const approveLoan = (
  loanId: string,
) =>
  api
    .patch(`/loans/${loanId}/approve`)
    .then((response) => response.data)


/**
 * Reject loan
 */
export const rejectLoan = (
  loanId: string,
  reason: string,
) =>
  api
    .patch(`/loans/${loanId}/reject`, { reason })
    .then((response) => response.data)


/**
 * Disburse loan
 */
export const disburseLoan = (
  loanId: string,
) =>
  api
    .post(`/loans/${loanId}/disburse`)
    .then((response) => response.data)


/**
 * Close fully repaid loan
 */
export const closeLoan = (
  loanId: string,
) =>
  api
    .patch(`/loans/${loanId}/close`)
    .then((response) => response.data)


/**
 * Mark loan as defaulted
 */
export const defaultLoan = (
  loanId: string,
) =>
  api
    .patch(`/loans/${loanId}/default`)
    .then((response) => response.data)


/**
 * Monthly loan statistics
 */
export const getMonthlyLoanStats = () =>
  api
    .get('/loans/stats/monthly')
    .then((response) => response.data)

