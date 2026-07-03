import React from 'react'
import { Phone, Mail, MapPin, Briefcase, Calendar, Shield } from 'lucide-react'
import { Badge } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getInitials, formatDate } from '@/utils'

const KYC_CFG = {
  PENDING:  { label: 'Pending',  color: '#FAAD14', bg: '#FAAD1415', border: '#FAAD1440' },
  VERIFIED: { label: 'Verified', color: '#00C9A7', bg: '#00C9A715', border: '#00C9A740' },
  REJECTED: { label: 'Rejected', color: '#FF4D4F', bg: '#FF4D4F15', border: '#FF4D4F40' },
}

export const Profile: React.FC = () => {
  const { user } = useAuthStore()
  if (!user) return null
  const kyc = KYC_CFG[user.kycStatus]

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: 'flex', maxWidth: 520 }}>
      <h1 className="page-title">Profile</h1>

      <div className="card flex items-center gap-4">
        <div className="avatar-lg"><span>{getInitials(user.name)}</span></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-bold text-text" style={{ fontSize: 17 }}>{user.name}</p>
          <p className="text-sm text-silver mt-1">{user.role.replace(/_/g, ' ')}</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield size={12} style={{ color: 'var(--silver)' }} />
            <span className="text-xs text-silver">KYC:</span>
            <Badge status={user.kycStatus} label={kyc.label} color={kyc.color} bg={kyc.bg} border={kyc.border} />
          </div>
        </div>
      </div>

      <div className="card">
        <p className="section-label">Account Information</p>
        {[
          { icon: Phone,     label: 'Phone',        value: user.phone },
          { icon: Mail,      label: 'Email',        value: user.email ?? '—' },
          { icon: MapPin,    label: 'Address',      value: user.address },
          { icon: Briefcase, label: 'Occupation',   value: user.occupation },
          { icon: Calendar,  label: 'Member since', value: formatDate(user.createdAt) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="profile-field">
            <Icon size={15} style={{ color: 'var(--silver)', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="text-xs text-silver">{label}</p>
              <p className="text-sm text-text mt-1 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {user.kycStatus === 'PENDING' && (
        <div className="alert alert-warning">
          <div>
            <p className="text-sm font-semibold mb-1">Identity verification in progress</p>
            <p className="text-xs text-silver">Our team is reviewing your details. You'll be notified by SMS once verified. Loan disbursements are held until complete.</p>
          </div>
        </div>
      )}
    </div>
  )
}
