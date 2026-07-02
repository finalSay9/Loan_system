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

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 30 } }
})

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
)

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/loans" element={<AppLayout><LoansList /></AppLayout>} />
          <Route path="/loans/apply" element={<AppLayout><ApplyLoan /></AppLayout>} />
          <Route path="/loans/:id" element={<AppLayout><LoanDetail /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/admin/loans" element={
            <ProtectedRoute roles={['SUPER_ADMIN', 'LOAN_OFFICER']}>
              <Layout><AdminLoans /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1E2D3D', color: '#F0F4F8', border: '1px solid #243447', borderRadius: '10px', fontSize: '14px' },
          success: { iconTheme: { primary: '#00C9A7', secondary: '#1E2D3D' } },
          error: { iconTheme: { primary: '#FF4D4F', secondary: '#1E2D3D' } },
        }}
      />
    </QueryClientProvider>
  )
}
