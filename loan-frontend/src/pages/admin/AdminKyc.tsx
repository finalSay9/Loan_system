
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { getInitials, formatDate } from '@/utils'
import api from '@/api/client'
import toast from 'react-hot-toast'

// ── Types ─────────────────────────────────────────────────

interface BorrowerKYC {
  id: string
  name: string
  phone: string
  email: string | null
  address: string
  occupation: string
  avatar_url: string | null
  kyc_status: 'PENDING' | 'VERIFIED' | 'REJECTED'
  created_at: string
}

// ── API calls ──────────────────────────────────────────────

const getPendingKYC = () =>
  api.get('/users/kyc/pending').then(r => r.data)

const getAllKYC = () =>
  api.get('/users/kyc/all').then(r => r.data)

const approveKYC = (id: string) =>
  api.post(`/users/${id}/kyc/approve`).then(r => r.data)

const rejectKYC = (id: string, reason: string) =>
  api.post(`/users/${id}/kyc/reject`, { reason }).then(r => r.data)

// ── Navigation ────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard', to: '/admin/dashboard' },
  { icon: 'ti-chart-bar', label: 'Analytics', to: '/admin/analytics' },
  { icon: 'ti-file-text', label: 'My loans', to: '/loans' },
  { icon: 'ti-files', label: 'All loans', to: '/admin/loans' },
  { icon: 'ti-users', label: 'Borrowers', to: '/admin/borrowers' },
  { icon: 'ti-shield-check', label: 'KYC', to: '/admin/kyc' },
  { icon: 'ti-report-analytics', label: 'Reports', to: '/admin/reports' },
  { icon: 'ti-user-shield', label: 'Staff', to: '/admin/staff' },
]

const NAV_BOTTOM = [
  { icon: 'ti-settings', label: 'Settings', to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]

// ── Avatar colors ──────────────────────────────────────────

const AVATAR_COLORS = [
  { bg: '#E6F1FB', color: '#185FA5' },
  { bg: '#EAF3DE', color: '#3B6D11' },
  { bg: '#FAEEDA', color: '#854F0B' },
  { bg: '#FBEAF0', color: '#993556' },
  { bg: '#EEEDFE', color: '#534AB7' },
  { bg: '#E1F5EE', color: '#0F6E56' },
]

// ── KYC configuration ─────────────────────────────────────

const KYC_CFG = {
  PENDING: {
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FDE68A',
    icon: 'ti-clock',
  },
  VERIFIED: {
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#BBF7D0',
    icon: 'ti-circle-check',
  },
  REJECTED: {
    color: '#DC2626',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    icon: 'ti-circle-x',
  },
} as const

// ── Normalize API status ──────────────────────────────────

const normalizeKycStatus = (
  status: unknown,
): keyof typeof KYC_CFG => {
  const normalized = String(status ?? '').toUpperCase()

  if (normalized in KYC_CFG) {
    return normalized as keyof typeof KYC_CFG
  }

  return 'PENDING'
}

// ── Sidebar ────────────────────────────────────────────────

const Sidebar: React.FC<{
  user: any
  logout: () => void
  onClose?: () => void
}> = ({ user, logout, onClose }) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          padding: '18px 16px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#00C9A7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: '#0a1420',
              fontWeight: 900,
              fontSize: 11,
            }}
          >
            LF
          </span>
        </div>

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            LoanFlow
          </div>

          <div
            style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Admin portal
          </div>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all .15s',
              color: isActive
                ? '#fff'
                : 'rgba(255,255,255,0.6)',
              background: isActive
                ? 'rgba(255,255,255,0.15)'
                : 'transparent',
            })}
          >
            <i
              className={`ti ${icon}`}
              style={{
                fontSize: 16,
                width: 18,
              }}
            />
            {label}
          </NavLink>
        ))}

        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.1)',
            margin: '8px 10px',
          }}
        />

        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              color: isActive
                ? '#fff'
                : 'rgba(255,255,255,0.6)',
              background: isActive
                ? 'rgba(255,255,255,0.15)'
                : 'transparent',
            })}
          >
            <i
              className={`ti ${icon}`}
              style={{
                fontSize: 16,
                width: 18,
              }}
            />
            {label}
          </NavLink>
        ))}

        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.1)',
            margin: '8px 10px',
          }}
        />

        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 12px',
            borderRadius: 7,
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 500,
          }}
        >
          <i
            className="ti ti-logout"
            style={{
              fontSize: 16,
              width: 18,
            }}
          />
          Log out
        </button>
      </nav>

      <div
        style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 10px',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {getInitials(user?.name ?? 'A')}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.name}
            </div>

            <div
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {user?.role?.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Reject modal ───────────────────────────────────────────

const RejectModal: React.FC<{
  borrower: BorrowerKYC
  onClose: () => void
  onConfirm: (reason: string) => void
  isPending: boolean
}> = ({
  borrower,
  onClose,
  onConfirm,
  isPending,
}) => {
  const [reason, setReason] = useState('')

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 14,
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px',
            borderBottom: '1px solid #F3F4F6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i
                className="ti ti-circle-x"
                style={{
                  fontSize: 16,
                  color: '#DC2626',
                }}
              />
            </div>

            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#111827',
              }}
            >
              Reject KYC
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              background: '#F9FAFB',
              borderRadius: 10,
              border: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#E6F1FB',
                color: '#185FA5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(borrower.name)}
            </div>

            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                }}
              >
                {borrower.name}
              </p>

              <p
                style={{
                  fontSize: 11,
                  color: '#6B7280',
                  margin: 0,
                  marginTop: 2,
                }}
              >
                {borrower.phone}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '.05em',
              }}
            >
              Rejection reason *
            </label>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="Explain why this KYC application is being rejected..."
              style={{
                width: '100%',
                background: '#F9FAFB',
                border: '1.5px solid #E5E7EB',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 13,
                color: '#111827',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />

            <p
              style={{
                fontSize: 11,
                color: '#9CA3AF',
                margin: 0,
              }}
            >
              Common reasons: Blurry ID photo, expired ID,
              name mismatch, missing documents.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #E5E7EB',
                background: '#fff',
                color: '#374151',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => onConfirm(reason)}
              disabled={!reason.trim() || isPending}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                background:
                  !reason.trim() || isPending
                    ? '#FCA5A5'
                    : '#DC2626',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor:
                  !reason.trim() || isPending
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {isPending
                ? 'Rejecting…'
                : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────

export const AdminKYC: React.FC = () => {
  const { user, logout } = useAuthStore()
  const qc = useQueryClient()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] =
    useState<'PENDING' | 'ALL'>('PENDING')
  const [search, setSearch] = useState('')
  const [rejectTarget, setRejectTarget] =
    useState<BorrowerKYC | null>(null)

  // ── Queries ─────────────────────────────────────────────

  const {
    data: pendingData,
    isLoading: pendingLoading,
  } = useQuery({
    queryKey: ['kyc-pending'],
    queryFn: getPendingKYC,
    refetchInterval: 30000,
  })

  const {
    data: allData,
    isLoading: allLoading,
  } = useQuery({
    queryKey: ['kyc-all'],
    queryFn: getAllKYC,
    enabled: filter === 'ALL',
  })

  const isLoading =
    filter === 'PENDING'
      ? pendingLoading
      : allLoading

  /*
   * Your API functions already return r.data.
   *
   * Therefore don't do:
   * pendingData?.data
   *
   * Use pendingData directly.
   */
  const rawList: BorrowerKYC[] =
  filter === 'PENDING'
    ? (pendingData?.data ?? [])
    : (allData?.data ?? [])

  // ── Search ──────────────────────────────────────────────

  const normalizedSearch = search
    .trim()
    .toLowerCase()

  const list = rawList.filter(borrower => {
    if (!normalizedSearch) return true

    return (
      borrower.name
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      borrower.phone
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      borrower.email
        ?.toLowerCase()
        .includes(normalizedSearch)
    )
  })

  const pendingCount = pendingData?.data?.length ?? 0

  // ── Invalidate queries ─────────────────────────────────

  const invalidate = () => {
    qc.invalidateQueries({
      queryKey: ['kyc-pending'],
    })

    qc.invalidateQueries({
      queryKey: ['kyc-all'],
    })

    qc.invalidateQueries({
      queryKey: ['borrowers'],
    })
  }

  // ── Approve ─────────────────────────────────────────────

  const {
    mutate: approve,
    isPending: approving,
    variables: approvingId,
  } = useMutation({
    mutationFn: (id: string) => approveKYC(id),

    onSuccess: (_, id) => {
      invalidate()

      const name =
        list.find(b => b.id === id)?.name ??
        'Borrower'

      toast.success(`${name} KYC approved`)
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ??
          'Approval failed',
      )
    },
  })

  // ── Reject ──────────────────────────────────────────────

  const {
    mutate: reject,
    isPending: rejecting,
  } = useMutation({
    mutationFn: ({
      id,
      reason,
    }: {
      id: string
      reason: string
    }) => rejectKYC(id, reason),

    onSuccess: () => {
      invalidate()
      toast.success('KYC application rejected')
      setRejectTarget(null)
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ??
          'Rejection failed',
      )
    },
  })

  // ── Render ──────────────────────────────────────────────

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F4F6FA',
      }}
    >
      {/* Desktop sidebar */}

      <aside
        className="hide-mobile"
        style={{
          width: 220,
          background: '#1a3a6b',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30,
        }}
      >
        <Sidebar
          user={user}
          logout={logout}
        />
      </aside>

      {/* Mobile sidebar */}

      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,.6)',
            }}
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            style={{
              position: 'relative',
              width: 240,
              background: '#1a3a6b',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: 20,
                zIndex: 2,
              }}
            >
              ✕
            </button>

            <Sidebar
              user={user}
              logout={logout}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main content */}

      <div
        className="main-shift"
        style={{
          flex: 1,
          marginLeft: 220,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Topbar */}

        <header
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}
        >
          <button
            className="menu-btn-admin"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <i
              className="ti ti-menu-2"
              style={{ fontSize: 22 }}
            />
          </button>

          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#111827',
                margin: 0,
              }}
            >
              KYC Verification
            </h1>

            <p
              style={{
                fontSize: 12,
                color: '#6B7280',
                margin: '2px 0 0',
              }}
            >
              Review borrower identity verification
            </p>
          </div>

          <div style={{ flex: 1 }} />

          {pendingCount > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#D97706',
                }}
              />

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#D97706',
                }}
              >
                {pendingCount} pending
              </span>
            </div>
          )}

          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#1a3a6b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {getInitials(user?.name ?? 'A')}
            </span>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            padding: 24,
          }}
        >
          {/* Toolbar */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 18,
              flexWrap: 'wrap',
            }}
          >
            {/* Filter */}

            <div
              style={{
                display: 'flex',
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                padding: 3,
                gap: 2,
              }}
            >
              {(['PENDING', 'ALL'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 15px',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    background:
                      filter === f
                        ? '#1a3a6b'
                        : 'transparent',
                    color:
                      filter === f
                        ? '#fff'
                        : '#6B7280',
                  }}
                >
                  {f === 'PENDING'
                    ? `Pending${pendingCount > 0 ? ` (${pendingCount})` : ''}`
                    : 'All'}
                </button>
              ))}
            </div>

            {/* Search */}

            <div
              style={{
                position: 'relative',
                flex: 1,
                maxWidth: 360,
              }}
            >
              <i
                className="ti ti-search"
                style={{
                  position: 'absolute',
                  left: 11,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  fontSize: 15,
                }}
              />

              <input
                value={search}
                onChange={e =>
                  setSearch(e.target.value)
                }
                placeholder="Search borrowers..."
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  padding: '8px 12px 8px 34px',
                  fontSize: 13,
                  color: '#111827',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Loading */}

          {isLoading && (
            <div
              style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    height: 72,
                    borderBottom:
                      '1px solid #F3F4F6',
                    background:
                      'linear-gradient(90deg,#fff,#F9FAFB,#fff)',
                    animation:
                      'pulse 1.5s infinite',
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty state */}

          {!isLoading && list.length === 0 && (
            <div
              style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                padding: '55px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                }}
              >
                <i
                  className="ti ti-shield-check"
                  style={{
                    fontSize: 25,
                    color: '#16A34A',
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                }}
              >
                {filter === 'PENDING'
                  ? 'No pending KYC applications'
                  : 'No borrowers found'}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: '#6B7280',
                  margin: '5px 0 0',
                }}
              >
                {search
                  ? 'Try changing your search.'
                  : filter === 'PENDING'
                    ? 'All applications have been reviewed.'
                    : 'There are no KYC records yet.'}
              </p>
            </div>
          )}

          {/* User list */}

          {!isLoading && list.length > 0 && (
            <div
              style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {/* Desktop table header */}

              <div
                className="kyc-list-header"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'minmax(230px, 2fr) minmax(150px, 1fr) minmax(130px, 1fr) 110px 180px',
                  alignItems: 'center',
                  padding: '11px 18px',
                  background: '#F9FAFB',
                  borderBottom: '1px solid #E5E7EB',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '.04em',
                }}
              >
                <span>Borrower</span>
                <span>Contact</span>
                <span>Occupation</span>
                <span>Status</span>
                <span style={{ textAlign: 'right' }}>
                  Actions
                </span>
              </div>

              {/* Rows */}

              {list.map((borrower, i) => {
                const ac =
                  AVATAR_COLORS[
                    i % AVATAR_COLORS.length
                  ]

                const kycStatus =
                  normalizeKycStatus(
                    borrower.kyc_status,
                  )

                const kyc = KYC_CFG[kycStatus]

                const isApprovingThis =
                  approving &&
                  approvingId === borrower.id

                return (
                  <div
                    key={borrower.id}
                    className="kyc-list-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'minmax(230px, 2fr) minmax(150px, 1fr) minmax(130px, 1fr) 110px 180px',
                      alignItems: 'center',
                      padding: '13px 18px',
                      borderBottom:
                        '1px solid #F3F4F6',
                      minHeight: 68,
                      transition:
                        'background .12s',
                    }}
                  >
                    {/* Borrower */}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        minWidth: 0,
                      }}
                    >
                      {borrower.avatar_url ? (
                        <img
                          src={`http://localhost:3200${borrower.avatar_url}`}
                          alt={borrower.name}
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            background: ac.bg,
                            color: ac.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:
                              'center',
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(
                            borrower.name,
                          )}
                        </div>
                      )}

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#111827',
                            overflow: 'hidden',
                            textOverflow:
                              'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {borrower.name}
                        </div>

                        <div
                          style={{
                            fontSize: 11,
                            color: '#9CA3AF',
                            marginTop: 2,
                          }}
                        >
                          Joined{' '}
                          {formatDate(
                            borrower.created_at,
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact */}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: '#374151',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {borrower.phone}
                      </div>

                      {borrower.email && (
                        <div
                          style={{
                            fontSize: 11,
                            color: '#9CA3AF',
                            overflow: 'hidden',
                            textOverflow:
                              'ellipsis',
                            whiteSpace: 'nowrap',
                            marginTop: 2,
                            maxWidth: 170,
                          }}
                        >
                          {borrower.email}
                        </div>
                      )}
                    </div>

                    {/* Occupation */}

                    <div
                      style={{
                        fontSize: 12,
                        color: '#6B7280',
                        overflow: 'hidden',
                        textOverflow:
                          'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingRight: 10,
                      }}
                    >
                      {borrower.occupation ||
                        '—'}
                    </div>

                    {/* Status */}

                    <div>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding:
                            '4px 8px',
                          borderRadius: 999,
                          fontSize: 10,
                          fontWeight: 600,
                          color: kyc.color,
                          background: kyc.bg,
                          border:
                            `1px solid ${kyc.border}`,
                        }}
                      >
                        <i
                          className={`ti ${kyc.icon}`}
                          style={{
                            fontSize: 11,
                          }}
                        />

                        {kycStatus}
                      </span>
                    </div>

                    {/* Actions */}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'flex-end',
                        gap: 6,
                      }}
                    >
                      {kycStatus ===
                        'PENDING' ? (
                        <>
                          <button
                            onClick={() =>
                              approve(
                                borrower.id,
                              )
                            }
                            disabled={
                              isApprovingThis
                            }
                            title="Approve KYC"
                            style={{
                              display: 'inline-flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'center',
                              gap: 5,
                              padding:
                                '7px 10px',
                              borderRadius: 6,
                              border: 'none',
                              background:
                                isApprovingThis
                                  ? '#BBF7D0'
                                  : '#16A34A',
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: 600,
                              cursor:
                                isApprovingThis
                                  ? 'not-allowed'
                                  : 'pointer',
                            }}
                          >
                            <i
                              className="ti ti-check"
                              style={{
                                fontSize: 13,
                              }}
                            />

                            {isApprovingThis
                              ? '...'
                              : 'Approve'}
                          </button>

                          <button
                            onClick={() =>
                              setRejectTarget(
                                borrower,
                              )
                            }
                            title="Reject KYC"
                            style={{
                              display: 'inline-flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'center',
                              gap: 5,
                              padding:
                                '7px 10px',
                              borderRadius: 6,
                              border:
                                '1px solid #FCA5A5',
                              background:
                                '#FEF2F2',
                              color:
                                '#DC2626',
                              fontSize: 11,
                              fontWeight: 600,
                              cursor:
                                'pointer',
                            }}
                          >
                            <i
                              className="ti ti-x"
                              style={{
                                fontSize: 13,
                              }}
                            />

                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          style={{
                            fontSize: 11,
                            color: '#9CA3AF',
                          }}
                        >
                          Reviewed
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* Reject modal */}

      {rejectTarget && (
        <RejectModal
          borrower={rejectTarget}
          onClose={() =>
            setRejectTarget(null)
          }
          onConfirm={reason =>
            reject({
              id: rejectTarget.id,
              reason,
            })
          }
          isPending={rejecting}
        />
      )}

      {/* Responsive styles */}

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{
            display:none!important;
          }

          .main-shift{
            margin-left:0!important;
          }

          .menu-btn-admin{
            display:flex!important;
          }
        }

        @media(max-width:800px){
          .kyc-list-header{
            display:none!important;
          }

          .kyc-list-row{
            display:flex!important;
            flex-wrap:wrap;
            gap:12px;
            padding:14px!important;
          }

          .kyc-list-row > div:nth-child(1){
            width:100%;
          }

          .kyc-list-row > div:nth-child(2){
            flex:1;
            min-width:130px;
          }

          .kyc-list-row > div:nth-child(3){
            flex:1;
            min-width:100px;
          }

          .kyc-list-row > div:nth-child(4){
            width:auto;
          }

          .kyc-list-row > div:nth-child(5){
            width:100%;
            justify-content:flex-start!important;
            padding-top:8px;
            border-top:1px solid #F3F4F6;
          }
        }

        @keyframes pulse{
          0%,100%{opacity:1}
          50%{opacity:.5}
        }
      `}</style>
    </div>
  )
}
