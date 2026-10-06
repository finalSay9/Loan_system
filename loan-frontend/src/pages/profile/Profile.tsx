import React from 'react'
import { Phone, Mail, MapPin, Briefcase, Calendar, Shield, ShieldCheck, ShieldAlert, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { getInitials, formatDate } from '@/utils'
import './profile.css'

const KYC_CFG: Record<string, { label: string; Icon: React.ElementType }> = {
  PENDING:  { label: 'Verification pending', Icon: Shield },
  VERIFIED: { label: 'Verified',             Icon: ShieldCheck },
  REJECTED: { label: 'Verification failed',  Icon: ShieldAlert },
}

export const Profile: React.FC = () => {
  const { user } = useAuthStore()
  if (!user) return null

  const kycKey = KYC_CFG[user.kycStatus] ? user.kycStatus : 'PENDING'
  const { label, Icon: KycIcon } = KYC_CFG[kycKey]

  const fields = [
    { icon: Phone,     label: 'Phone',        value: user.phone },
    { icon: Mail,      label: 'Email',        value: user.email ?? '—' },
    { icon: MapPin,    label: 'Address',      value: user.address },
    { icon: Briefcase, label: 'Occupation',   value: user.occupation },
    { icon: Calendar,  label: 'Member since', value: formatDate(user.createdAt) },
  ]

  return (
    <div className="pf fade-in">
      <h1>Profile</h1>

      <div className="pf-card">
        <div className="pf-banner" />
        <div className="pf-id">
          <div className="pf-avatar">{getInitials(user.name)}</div>
          <div className="pf-id-text">
            <p className="pf-name">{user.name}</p>
            <p className="pf-role">{user.role.replace(/_/g, ' ').toLowerCase()}</p>
          </div>
          <span className={`pf-kyc ${kycKey}`}>
            <KycIcon size={14} />
            {label}
          </span>
        </div>
      </div>

      <div className="pf-card">
        <p className="pf-head">Account information</p>
        {fields.map(({ icon: Icon, label, value }) => (
          <div key={label} className="pf-row">
            <div className="pf-ico" style={{ flex: '0 0 40px' }}><Icon size={17} /></div>
            <div>
              <small>{label}</small>
              <span title={String(value)}>{value}</span>
            </div>
          </div>
        ))}
      </div>

      {user.kycStatus === 'PENDING' && (
        <div className="pf-note" role="status">
          <div className="pf-ico" style={{ flex: '0 0 40px' }}><Clock size={17} /></div>
          <div>
            <b>Identity verification in progress</b>
            <p>
              Our team is reviewing your details. You'll get an SMS once you're verified.
              Loan disbursements are held until this is complete.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}