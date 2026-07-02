import React from 'react'
import { Card, Badge } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { getInitials, formatDate } from '@/utils'
import { Phone, Mail, MapPin, Briefcase, Calendar, Shield } from 'lucide-react'

const KYC_CONFIG = {
  PENDING:  { label: 'Pending',  color: '#FAAD14', bg: '#FAAD1415', border: '#FAAD1440' },
  VERIFIED: { label: 'Verified', color: '#00C9A7', bg: '#00C9A715', border: '#00C9A740' },
  REJECTED: { label: 'Rejected', color: '#FF4D4F', bg: '#FF4D4F15', border: '#FF4D4F40' },
}

export const Profile: React.FC = () => {
  const { user } = useAuthStore()
  if (!user) return null

  const kyc = KYC_CONFIG[user.kycStatus]

  const fields = [
    { icon: Phone,    label: 'Phone',      value: user.phone },
    { icon: Mail,     label: 'Email',      value: user.email ?? '—' },
    { icon: MapPin,   label: 'Address',    value: user.address },
    { icon: Briefcase,label: 'Occupation', value: user.occupation },
    { icon: Calendar, label: 'Member since', value: formatDate(user.createdAt) },
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-lg">
      <h1 className="text-2xl font-bold text-[#F0F4F8]">Profile</h1>

      {/* Avatar card */}
      <Card className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#00C9A720] border-2 border-[#00C9A740] flex items-center justify-center shrink-0">
          <span className="text-[#00C9A7] text-xl font-black">{getInitials(user.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[#F0F4F8]">{user.name}</h2>
          <p className="text-sm text-[#8899AA]">{user.role.replace(/_/g, ' ')}</p>
          <div className="mt-2 flex items-center gap-2">
            <Shield size={12} className="text-[#8899AA]" />
            <span className="text-xs text-[#8899AA]">KYC:</span>
            <Badge status={user.kycStatus} label={kyc.label} color={kyc.color} bg={kyc.bg} border={kyc.border} />
          </div>
        </div>
      </Card>

      {/* Info fields */}
      <Card>
        <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-4">Account Information</h3>
        <div className="flex flex-col divide-y divide-[#243447]">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3">
              <Icon size={15} className="text-[#8899AA] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#8899AA]">{label}</p>
                <p className="text-sm text-[#F0F4F8] mt-0.5 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* KYC notice */}
      {user.kycStatus === 'PENDING' && (
        <div className="bg-[#FAAD1410] border border-[#FAAD1430] rounded-xl p-4">
          <p className="text-sm font-medium text-[#FAAD14] mb-1">Identity verification in progress</p>
          <p className="text-xs text-[#8899AA]">
            Our team is reviewing your details. You'll receive an SMS notification once your account is verified. Loan disbursements are held until this is complete.
          </p>
        </div>
      )}
    </div>
  )
}
