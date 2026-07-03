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
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', address: '', occupation: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [f]: e.target.value }))

  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 2) e.name = 'Full name required (min 2 chars)'
    if (!form.phone.match(/^\+?[1-9]\d{1,14}$/)) e.phone = 'Valid phone required (e.g. +265991234567)'
    if (form.email && !form.email.includes('@')) e.email = 'Invalid email'
    setErrors(e); return Object.keys(e).length === 0
  }
  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password)) e.password = 'Must include upper, lower, number & special char'
    if (!form.address) e.address = 'Address is required'
    if (!form.occupation) e.occupation = 'Occupation is required'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateStep2()) return
    setLoading(true)
    try {
      const res = await registerUser({ ...form, email: form.email || undefined })
      setAuth(res.data, res.access_token)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-shell">
      <div className="auth-bar" />
      <div className="auth-body">
        <div className="auth-logo">
          <div className="logo-mark" style={{ width: 40, height: 40, borderRadius: 10 }}><span style={{ fontSize: 13 }}>LF</span></div>
          <div>
            <div className="logo-name" style={{ fontSize: 18 }}>LoanFlow</div>
            <div className="logo-sub">Financial Services</div>
          </div>
        </div>

        <div className="auth-card fade-in">
          {/* Steps */}
          <div className="steps">
            <div className={`step-dot ${step > 1 ? 'done' : step === 1 ? 'active' : 'idle'}`}>1</div>
            <div className={`step-line ${step > 1 ? 'done' : 'idle'}`} />
            <div className={`step-dot ${step === 2 ? 'active' : 'idle'}`}>2</div>
          </div>

          <h1 className="font-black mb-1" style={{ fontSize: 20, color: 'var(--text)' }}>
            {step === 1 ? 'Create account' : 'Complete profile'}
          </h1>
          <p className="text-sm text-silver mb-4">
            {step === 1 ? 'Step 1 of 2 — Personal information' : 'Step 2 of 2 — Security & details'}
          </p>

          {step === 1 ? (
            <div className="flex-col gap-4" style={{ display: 'flex' }}>
              <Input label="Full Name" placeholder="John Banda" icon={<User size={15} />} value={form.name} onChange={up('name')} error={errors.name} />
              <Input label="Phone Number" type="tel" placeholder="+265991234567" icon={<Phone size={15} />} value={form.phone} onChange={up('phone')} error={errors.phone} />
              <Input label="Email (optional)" type="email" placeholder="john@example.com" icon={<Mail size={15} />} value={form.email} onChange={up('email')} error={errors.email} />
              <Button onClick={() => validateStep1() && setStep(2)} size="lg" style={{ marginTop: 8 }}>Continue →</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex' }}>
              <Input label="Password" type="password" placeholder="Min 8 chars, mixed case + symbols" icon={<Lock size={15} />} value={form.password} onChange={up('password')} error={errors.password} />
              <Input label="Address" placeholder="Area 49, Lilongwe" icon={<MapPin size={15} />} value={form.address} onChange={up('address')} error={errors.address} />
              <Input label="Occupation" placeholder="Business owner, Teacher…" icon={<Briefcase size={15} />} value={form.occupation} onChange={up('occupation')} error={errors.occupation} />
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px' }}>← Back</Button>
                <Button type="submit" loading={loading} style={{ flex: 1, padding: '12px' }}>Create account</Button>
              </div>
            </form>
          )}
        </div>

        <p className="text-sm text-silver" style={{ marginTop: 20, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
