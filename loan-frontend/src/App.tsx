
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'

import { Dashboard } from '@/pages/dashboard/Dashboard'
import { LoansList } from '@/pages/loans/LoansList'
import { LoanDetail } from '@/pages/loans/LoanDetail'
import { ApplyLoan } from '@/pages/loans/ApplyLoan'
import { Profile } from '@/pages/profile/Profile'

import { AdminLoans } from '@/pages/admin/AdminLoans'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminReports } from '@/pages/admin/AdminReports'
import {
  AdminBorrowers,
  AdminBorrowerDetail,
} from '@/pages/admin/AdminBorrowers'
import { AdminStaff } from '@/pages/admin/AdminStaff'

import { Transactions } from '@/pages/transactions/Transactions'

import { useAuthStore } from '@/store/auth.store'
import { useSocket } from './hooks/useSocket'


const SocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useSocket()

  return <>{children}</>
}


const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30,
    },
  },
})


const AppLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
)


/**
 * General admin route.
 *
 * Loan officers can access normal admin operations,
 * but not necessarily sensitive staff-management operations.
 */
const AdminRoute = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <ProtectedRoute roles={['SUPER_ADMIN', 'LOAN_OFFICER']}>
    {children}
  </ProtectedRoute>
)


/**
 * Staff management is a privileged operation.
 *
 * Only SUPER_ADMIN should be able to:
 *
 * - create staff
 * - deactivate staff
 * - activate staff
 * - change staff roles
 */
const SuperAdminRoute = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <ProtectedRoute roles={['SUPER_ADMIN']}>
    {children}
  </ProtectedRoute>
)


const SmartRedirect = () => {
  const { user } = useAuthStore()

  const isAdmin =
    user?.role === 'SUPER_ADMIN' ||
    user?.role === 'LOAN_OFFICER'

  return (
    <Navigate
      to={isAdmin ? '/admin/dashboard' : '/dashboard'}
      replace
    />
  )
}


export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>

        <SocketProvider>

          <Routes>

            {/* =====================================================
                ADMIN DASHBOARD
            ===================================================== */}

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />


            {/* =====================================================
                ADMIN ANALYTICS
            ===================================================== */}

            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminReports />
                </AdminRoute>
              }
            />


            {/* =====================================================
                ADMIN LOANS
            ===================================================== */}

            <Route
              path="/admin/loans"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminLoans />
                  </Layout>
                </AdminRoute>
              }
            />


            {/* =====================================================
                BORROWERS
            ===================================================== */}

            <Route
              path="/admin/borrowers"
              element={
                <AdminRoute>
                  <AdminBorrowers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/borrowers/:id"
              element={
                <AdminRoute>
                  <AdminBorrowerDetail />
                </AdminRoute>
              }
            />


            {/* =====================================================
                REPORTS
            ===================================================== */}

            <Route
              path="/admin/reports"
              element={
                <AdminRoute>
                  <AdminReports />
                </AdminRoute>
              }
            />


            {/* =====================================================
                STAFF MANAGEMENT
                SUPER_ADMIN ONLY
            ===================================================== */}

            <Route
              path="/admin/staff"
              element={
                <SuperAdminRoute>
                  <AdminStaff />
                </SuperAdminRoute>
              }
            />


            {/* =====================================================
                FUTURE ADMIN SECTIONS
            ===================================================== */}

            <Route
              path="/admin/invoices"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/transactions"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/help"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />


            {/* =====================================================
                NORMAL USER TRANSACTIONS
            ===================================================== */}

            <Route
              path="/transactions"
              element={
                <AppLayout>
                  <Transactions />
                </AppLayout>
              }
            />


            {/* =====================================================
                AUTH
            ===================================================== */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />


            {/* =====================================================
                ROOT
            ===================================================== */}

            <Route
              path="/"
              element={<SmartRedirect />}
            />


            {/* =====================================================
                USER DASHBOARD
            ===================================================== */}

            <Route
              path="/dashboard"
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />


            {/* =====================================================
                USER LOANS
            ===================================================== */}

            <Route
              path="/loans"
              element={
                <AppLayout>
                  <LoansList />
                </AppLayout>
              }
            />

            <Route
              path="/loans/apply"
              element={
                <AppLayout>
                  <ApplyLoan />
                </AppLayout>
              }
            />

            <Route
              path="/loans/:id"
              element={
                <AppLayout>
                  <LoanDetail />
                </AppLayout>
              }
            />


            {/* =====================================================
                USER PROFILE
            ===================================================== */}

            <Route
              path="/profile"
              element={
                <AppLayout>
                  <Profile />
                </AppLayout>
              }
            />

          </Routes>

        </SocketProvider>

      </BrowserRouter>


      {/* =========================================================
          GLOBAL TOASTS
      ========================================================= */}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#25d415',
            color: '#f0f8f7',
            border: '1px solid #243447',
            borderRadius: '10px',
            fontSize: '14px',
          },

          success: {
            iconTheme: {
              primary: '#00C9A7',
              secondary: '#1E2D3D',
            },
          },

          error: {
            iconTheme: {
              primary: '#FF4D4F',
              secondary: '#1E2D3D',
            },
          },
        }}
      />

    </QueryClientProvider>
  )
}

