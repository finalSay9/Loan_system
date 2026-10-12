import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { Layout } from '@/components/layout/Layout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'

import { Dashboard } from '@/pages/dashboard/Dashboard'
import { LoansList } from '@/pages/loans/LoansList'
import { LoanDetail } from '@/pages/loans/LoanDetail'
import { ApplyLoan } from '@/pages/loans/ApplyLoan'
import { Profile } from '@/pages/profile/Profile'
import { Transactions } from '@/pages/transactions/Transactions'
import { NotificationBell } from '@/components/notifications/NotificationBell'

import { AdminLoans } from '@/pages/admin/AdminLoans'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminReports } from '@/pages/admin/AdminReports'
import { AdminBorrowers, AdminBorrowerDetail } from '@/pages/admin/AdminBorrowers'
import { AdminStaff } from '@/pages/admin/AdminStaff'
import { AdminKYC } from '@/pages/admin/AdminKyc'

import { useAuthStore } from '@/store/auth.store'
import { useSocket } from './hooks/useSocket'

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useSocket()
  return <>{children}</>
}

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 30 } },
})

/** Borrower pages: protected + borrower layout. */
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
)

/** Staff pages: SUPER_ADMIN and LOAN_OFFICER. */
const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute roles={['SUPER_ADMIN', 'LOAN_OFFICER']}>{children}</ProtectedRoute>
)

/** Staff management: SUPER_ADMIN only. */
const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute roles={['SUPER_ADMIN']}>{children}</ProtectedRoute>
)

const SmartRedirect = () => {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'LOAN_OFFICER'
  return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            {/* ── Auth ───────────────────────────────────────── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SmartRedirect />} />

            {/* ── Borrower ───────────────────────────────────── */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/loans" element={<AppLayout><LoansList /></AppLayout>} />
            <Route path="/loans/apply" element={<AppLayout><ApplyLoan /></AppLayout>} />
            <Route path="/loans/:id" element={<AppLayout><LoanDetail /></AppLayout>} />
            <Route path="/transactions" element={<AppLayout><Transactions /></AppLayout>} />
            <Route path="/notifications" element={<AppLayout><NotificationBell tone="dark" /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />

            {/* ── Admin ──────────────────────────────────────── */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

            {/* AdminLoans has no shell of its own, so it gets the ADMIN layout (not the borrower one). */}
            <Route
              path="/admin/loans"
              element={
                <AdminRoute>
                  <AdminLayout title="Loans">
                    <AdminLoans />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            <Route path="/admin/kyc" element={<AdminRoute><AdminKYC /></AdminRoute>} />
            <Route path="/admin/borrowers" element={<AdminRoute><AdminBorrowers /></AdminRoute>} />
            <Route path="/admin/borrowers/:id" element={<AdminRoute><AdminBorrowerDetail /></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><AdminReports /></AdminRoute>} />

            <Route
              path="/admin/notifications"
              element={
                <AdminRoute>
                  <AdminLayout title="Notifications">
                    <NotificationBell tone="light" />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            <Route path="/admin/staff" element={<SuperAdminRoute><AdminStaff /></SuperAdminRoute>} />

            {/* Placeholders until these pages exist */}
            <Route path="/admin/invoices" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/transactions" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/help" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

            {/* Anything unknown → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E2D3D',
            color: '#F0F4F8',
            border: '1px solid #243447',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#00C9A7', secondary: '#1E2D3D' } },
          error: { iconTheme: { primary: '#FF4D4F', secondary: '#1E2D3D' } },
        }}
      />
    </QueryClientProvider>
  )
}