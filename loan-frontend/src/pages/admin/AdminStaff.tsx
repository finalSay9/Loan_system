import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { getInitials } from '@/utils'
import backoffice from '@/api/backoffice'
import toast from 'react-hot-toast'

// ── Types ─────────────────────────────────────────────────
interface StaffMember {
  id: string
  name: string
  phone: string
  email: string | null
  role: string
  kyc_status: string
  address: string
  occupation: string
  avatar_url: string | null
  created_at: string
  deleted_at: string | null
  is_active: boolean
}

// ── Constants ─────────────────────────────────────────────
const STAFF_ROLES = ['SUPER_ADMIN', 'LOAN_OFFICER', 'ACCOUNTANT', 'COMPLIANCE_OFFICER']

const ROLE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  SUPER_ADMIN:          { color: '#7C3AED', bg: '#EDE9FE', border: '#C4B5FD' },
  LOAN_OFFICER:         { color: '#1D4ED8', bg: '#DBEAFE', border: '#93C5FD' },
  ACCOUNTANT:           { color: '#065F46', bg: '#D1FAE5', border: '#6EE7B7' },
  COMPLIANCE_OFFICER:   { color: '#92400E', bg: '#FEF3C7', border: '#FCD34D' },
}

const AVATAR_COLORS = [
  { bg: '#E6F1FB', color: '#185FA5' },
  { bg: '#EAF3DE', color: '#3B6D11' },
  { bg: '#FAEEDA', color: '#854F0B' },
  { bg: '#FBEAF0', color: '#993556' },
  { bg: '#EEEDFE', color: '#534AB7' },
  { bg: '#E1F5EE', color: '#0F6E56' },
]

const NAV_ITEMS = [
  { icon: 'ti-layout-dashboard', label: 'Dashboard',    to: '/admin/dashboard' },
  { icon: 'ti-chart-bar',        label: 'Analytics',    to: '/admin/analytics' },
  { icon: 'ti-file-text',        label: 'My loans',     to: '/loans' },
  { icon: 'ti-files',            label: 'All loans',    to: '/admin/loans' },
  { icon: 'ti-users',            label: 'Borrowers',    to: '/admin/borrowers' },
  { icon: 'ti-report-analytics', label: 'Reports',      to: '/admin/reports' },
  { icon: 'ti-user-shield',      label: 'Staff',        to: '/admin/staff' },
  { icon: 'ti-receipt',          label: 'Invoices',     to: '/admin/invoices' },
  { icon: 'ti-arrows-right-left',label: 'Transactions', to: '/admin/transactions' },
]
const NAV_BOTTOM = [
  { icon: 'ti-settings',    label: 'Settings',  to: '/admin/settings' },
  { icon: 'ti-help-circle', label: 'Help desk', to: '/admin/help' },
]

// ── API calls ─────────────────────────────────────────────
const getStaff = () => backoffice.get('/staff/').then(r => r.data)
const createStaff = (data: any) => backoffice.post('/staff/', data).then(r => r.data)
const updateStaffRole = (id: string, role: string) => backoffice.post(`/staff/${id}/role/`, { role }).then(r => r.data)
const deactivateStaff = (id: string) => backoffice.post(`/staff/${id}/deactivate/`).then(r => r.data)
const activateStaff = (id: string) => backoffice.post(`/staff/${id}/activate/`).then(r => r.data)

// ── Sidebar ───────────────────────────────────────────────
const Sidebar: React.FC<{ user: any; logout: () => void; onClose?: () => void }> = ({ user, logout, onClose }) => {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#00C9A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#0a1420', fontWeight: 900, fontSize: 11 }}>LF</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>LoanFlow</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Admin portal</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .15s', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent' })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />{label}
          </NavLink>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 10px' }} />
        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: 'none', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent' })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />{label}
          </NavLink>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 10px' }} />
        <button onClick={() => { logout(); navigate('/login') }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 7, fontSize: 13, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontWeight: 500 }}>
          <i className="ti ti-logout" style={{ fontSize: 16, width: 18 }} />Log out
        </button>
      </nav>
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{getInitials(user?.name ?? 'A')}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{user?.role?.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Create staff modal ────────────────────────────────────
const CreateStaffModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', role: 'LOAN_OFFICER', address: '', occupation: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate, isPending } = useMutation({
    mutationFn: () => createStaff(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['staff'] })
      toast.success('Staff member created successfully')
      onClose()
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed to create staff'),
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name) e.name = 'Name is required'
    if (!form.phone) e.phone = 'Phone is required'
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
    if (!form.role) e.role = 'Role is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }))

  const inputStyle: React.CSSProperties = { width: '100%', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 7, padding: '9px 12px', fontSize: 13, color: '#111827', outline: 'none', fontFamily: 'inherit' }
  const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4, display: 'block' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 16, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Add staff member</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={labelStyle}>Full name *</label><input style={inputStyle} value={form.name} onChange={up('name')} placeholder="Jane Banda" />{errors.name && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 3 }}>{errors.name}</p>}</div>
            <div><label style={labelStyle}>Phone *</label><input style={inputStyle} value={form.phone} onChange={up('phone')} placeholder="+265991234567" />{errors.phone && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 3 }}>{errors.phone}</p>}</div>
          </div>
          <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={up('email')} placeholder="jane@loanflow.mw" /></div>
          <div><label style={labelStyle}>Password *</label><input style={inputStyle} type="password" value={form.password} onChange={up('password')} placeholder="Min 8 characters" />{errors.password && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 3 }}>{errors.password}</p>}</div>
          <div>
            <label style={labelStyle}>Role *</label>
            <select style={inputStyle} value={form.role} onChange={up('role')}>
              {STAFF_ROLES.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={labelStyle}>Address</label><input style={inputStyle} value={form.address} onChange={up('address')} placeholder="Area 3, Lilongwe" /></div>
            <div><label style={labelStyle}>Occupation</label><input style={inputStyle} value={form.occupation} onChange={up('occupation')} placeholder="Loan Officer" /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 7, border: '1px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => validate() && mutate()} disabled={isPending}
              style={{ flex: 1, padding: '10px', borderRadius: 7, border: 'none', background: '#1a3a6b', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: isPending ? 0.7 : 1 }}>
              {isPending ? 'Creating…' : 'Create staff member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Role change modal ─────────────────────────────────────
const RoleModal: React.FC<{ staff: StaffMember; onClose: () => void }> = ({ staff, onClose }) => {
  const qc = useQueryClient()
  const [role, setRole] = useState(staff.role)

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateStaffRole(staff.id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['staff'] })
      toast.success('Role updated successfully')
      onClose()
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Failed'),
  })

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 16, width: '100%', maxWidth: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Change role</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: 20 }}>✕</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Changing role for <strong>{staff.name}</strong></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STAFF_ROLES.map(r => {
              const cfg = ROLE_CONFIG[r]
              return (
                <button key={r} onClick={() => setRole(r)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${role === r ? cfg.border : '#E5E7EB'}`, background: role === r ? cfg.bg : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all .15s' }}>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: role === r ? cfg.color : '#374151' }}>{r.replace(/_/g, ' ')}</span>
                  {role === r && <i className="ti ti-check" style={{ color: cfg.color, fontSize: 16 }} />}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 7, border: '1px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => mutate()} disabled={isPending || role === staff.role}
              style={{ flex: 1, padding: '10px', borderRadius: 7, border: 'none', background: '#1a3a6b', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: isPending || role === staff.role ? 0.6 : 1 }}>
              {isPending ? 'Saving…' : 'Save role'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────
export const AdminStaff: React.FC = () => {
  const { user, logout } = useAuthStore()
  const qc = useQueryClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [roleTarget, setRoleTarget] = useState<StaffMember | null>(null)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({ queryKey: ['staff'], queryFn: getStaff })
  const staff: StaffMember[] = data?.data ?? []

  const filtered = staff.filter(s =>
    search === '' ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  )

  const { mutate: toggleActive } = useMutation({
    mutationFn: (s: StaffMember) => s.is_active ? deactivateStaff(s.id) : activateStaff(s.id),
    onSuccess: (_, s) => {
      qc.invalidateQueries({ queryKey: ['staff'] })
      toast.success(s.is_active ? `${s.name} deactivated` : `${s.name} activated`)
    },
    onError: (err: any) => toast.error(err.response?.data?.message ?? 'Action failed'),
  })

  const activeCount = staff.filter(s => s.is_active).length
  const roleCount = (role: string) => staff.filter(s => s.role === role).length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F6FA' }}>
      {/* Desktop sidebar */}
      <aside className="hide-mobile" style={{ width: 220, background: '#1a3a6b', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30 }}>
        <Sidebar user={user} logout={logout} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'relative', width: 240, background: '#1a3a6b', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            <Sidebar user={user} logout={logout} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="main-shift" style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Topbar */}
        <header style={{ padding: '12px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', position: 'sticky', top: 0, zIndex: 20, flexShrink: 0 }}>
          <button className="menu-btn-admin" onClick={() => setSidebarOpen(true)} style={{ display: 'none', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4 }}>
            <i className="ti ti-menu-2" style={{ fontSize: 22 }} />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Staff Management</h1>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0, marginTop: 1 }}>{activeCount} active staff members</p>
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={() => setCreateOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <i className="ti ti-user-plus" style={{ fontSize: 15 }} /> Add staff
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{getInitials(user?.name ?? 'A')}</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Role summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {STAFF_ROLES.map(role => {
              const cfg = ROLE_CONFIG[role]
              return (
                <div key={role} style={{ background: '#fff', border: `1px solid ${cfg.border}`, borderRadius: 10, padding: '14px 16px', borderTop: `3px solid ${cfg.color}` }}>
                  <p style={{ fontSize: 11, color: cfg.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', margin: 0, marginBottom: 6 }}>{role.replace(/_/g, ' ')}</p>
                  <p style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>{roleCount(role)}</p>
                </div>
              )
            })}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 360 }}>
            <i className="ti ti-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 15 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone or role…"
              style={{ width: '100%', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '9px 12px 9px 34px', fontSize: 13, color: '#111827', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          {/* Staff table */}
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {isLoading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                <i className="ti ti-loader" style={{ fontSize: 28, display: 'block', marginBottom: 8 }} />
                Loading staff…
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#9CA3AF' }}>
                <i className="ti ti-users" style={{ fontSize: 40, display: 'block', marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: 14, margin: 0 }}>No staff members found</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['Staff member', 'Role', 'Phone', 'Email', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6B7280', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => {
                      const ac = AVATAR_COLORS[i % AVATAR_COLORS.length]
                      const roleCfg = ROLE_CONFIG[s.role] ?? { color: '#6B7280', bg: '#F3F4F6', border: '#E5E7EB' }
                      const isSelf = s.id === user?.id

                      return (
                        <tr key={s.id} style={{ borderBottom: '1px solid #F9FAFB', opacity: s.is_active ? 1 : 0.55 }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                          {/* Name + avatar */}
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              {s.avatar_url ? (
                                <img src={`http://localhost:3200${s.avatar_url}`} alt={s.name}
                                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1.5px solid #E5E7EB' }} />
                              ) : (
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: ac.bg, color: ac.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, border: `1.5px solid ${ac.color}30` }}>
                                  {getInitials(s.name)}
                                </div>
                              )}
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                                  {s.name}
                                  {isSelf && <span style={{ marginLeft: 6, fontSize: 10, background: '#EDE9FE', color: '#7C3AED', padding: '2px 6px', borderRadius: 99, fontWeight: 600 }}>You</span>}
                                </div>
                                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{s.occupation ?? '—'}</div>
                              </div>
                            </div>
                          </td>

                          {/* Role badge */}
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, color: roleCfg.color, background: roleCfg.bg, border: `1px solid ${roleCfg.border}` }}>
                              {s.role.replace(/_/g, ' ')}
                            </span>
                          </td>

                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{s.phone}</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#6B7280' }}>{s.email ?? '—'}</td>

                          {/* Status */}
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                              color: s.is_active ? '#16A34A' : '#DC2626',
                              background: s.is_active ? '#DCFCE7' : '#FEE2E2',
                              border: `1px solid ${s.is_active ? '#BBF7D0' : '#FCA5A5'}` }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                              {s.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {/* Change role — not for self */}
                              {!isSelf && (
                                <button onClick={() => setRoleTarget(s)}
                                  style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <i className="ti ti-shield" style={{ fontSize: 13 }} /> Role
                                </button>
                              )}
                              {/* Activate / Deactivate — not for self */}
                              {!isSelf && (
                                <button onClick={() => toggleActive(s)}
                                  style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${s.is_active ? '#FCA5A5' : '#BBF7D0'}`, background: s.is_active ? '#FEF2F2' : '#F0FDF4', color: s.is_active ? '#DC2626' : '#16A34A', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <i className={`ti ${s.is_active ? 'ti-user-off' : 'ti-user-check'}`} style={{ fontSize: 13 }} />
                                  {s.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {createOpen && <CreateStaffModal onClose={() => setCreateOpen(false)} />}
      {roleTarget && <RoleModal staff={roleTarget} onClose={() => setRoleTarget(null)} />}

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{display:none!important}
          .main-shift{margin-left:0!important}
          .menu-btn-admin{display:flex!important}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </div>
  )
}