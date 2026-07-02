import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Lock, Mail, MapPin, Briefcase } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { registerUser } from '@/api'
import toast from 'react-hot-toast'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', address: '', occupation: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 2) e.name = 'Full name required (min 2 chars)'
    if (!form.phone.match(/^\+?[1-9]\d{1,14}$/)) e.phone = 'Valid phone required (e.g. +265991234567)'
    if (form.email && !form.email.includes('@')) e.email = 'Invalid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password))
      e.password = 'Must include upper, lower, number & special char'
    if (!form.address) e.address = 'Address is required'
    if (!form.occupation) e.occupation = 'Occupation is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setLoading(true)
    try {
      const payload = { ...form, email: form.email || undefined }
      const res = await registerUser(payload)
      setAuth(res.data, res.access_token)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1B2D] flex flex-col">
      <div className="h-1 bg-gradient-to-r from-[#00C9A7] to-[#1890FF]" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#00C9A7] flex items-center justify-center">
            <span className="text-[#0F1B2D] font-black text-sm">LF</span>
          </div>
          <div>
            <p className="font-bold text-[#F0F4F8] text-lg leading-none">LoanFlow</p>
            <p className="text-xs text-[#8899AA]">Financial Services</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                  s === step ? 'bg-[#00C9A7] text-[#0F1B2D]' : s < step ? 'bg-[#00C9A740] text-[#00C9A7]' : 'bg-[#243447] text-[#8899AA]'
                }`}>{s}</div>
                {s < 2 && <div className={`flex-1 h-0.5 transition-all ${s < step ? 'bg-[#00C9A7]' : 'bg-[#243447]'}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-[#1E2D3D] border border-[#243447] rounded-2xl p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-[#F0F4F8] mb-1">
              {step === 1 ? 'Create account' : 'Complete your profile'}
            </h1>
            <p className="text-sm text-[#8899AA] mb-6">
              {step === 1 ? 'Step 1 of 2 — Personal information' : 'Step 2 of 2 — Security & details'}
            </p>

            {step === 1 ? (
              <div className="flex flex-col gap-4">
                <Input label="Full Name" placeholder="John Banda" icon={<User size={15} />} value={form.name} onChange={update('name')} error={errors.name} />
                <Input label="Phone Number" type="tel" placeholder="+265991234567" icon={<Phone size={15} />} value={form.phone} onChange={update('phone')} error={errors.phone} />
                <Input label="Email (optional)" type="email" placeholder="john@example.com" icon={<Mail size={15} />} value={form.email} onChange={update('email')} error={errors.email} />
                <Button onClick={handleNext} className="w-full mt-2" size="lg">Continue →</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Password" type="password" placeholder="Min 8 chars, mixed case + symbols" icon={<Lock size={15} />} value={form.password} onChange={update('password')} error={errors.password} />
                <Input label="Address" placeholder="Area 49, Lilongwe" icon={<MapPin size={15} />} value={form.address} onChange={update('address')} error={errors.address} />
                <Input label="Occupation" placeholder="Business owner, Teacher…" icon={<Briefcase size={15} />} value={form.occupation} onChange={update('occupation')} error={errors.occupation} />
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" size="lg">← Back</Button>
                  <Button type="submit" loading={loading} className="flex-1" size="lg">Create account</Button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-[#8899AA] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#00C9A7] hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
