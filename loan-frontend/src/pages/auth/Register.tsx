import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Lock, Mail, MapPin, Briefcase } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { registerUser } from '@/api'
import toast from 'react-hot-toast'
import { AuthLayout } from './AuthLayout'



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
    <AuthLayout>
      <div className="auth-progress" aria-label={`Step ${step} of 2`}>
        <i className="on" />
        <i className={step === 2 ? 'on' : ''} />
      </div>

      <h1>{step === 1 ? 'Create your account' : 'Finish your profile'}</h1>
      <p className="lead">
        {step === 1 ? 'Step 1 of 2: your personal details' : 'Step 2 of 2: security and background'}
      </p>

      {step === 1 ? (
        <div className="auth-stack">
          <Input label="Full name" placeholder="John Banda" icon={<User size={16} />} value={form.name} onChange={up('name')} error={errors.name} />
          <Input label="Phone number" type="tel" placeholder="+265991234567" icon={<Phone size={16} />} value={form.phone} onChange={up('phone')} error={errors.phone} />
          <Input label="Email (optional)" type="email" placeholder="john@example.com" icon={<Mail size={16} />} value={form.email} onChange={up('email')} error={errors.email} />
          <div className="auth-actions">
            <Button onClick={() => validateStep1() && setStep(2)}>Continue</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-stack">
          <Input label="Password" type="password" placeholder="Min 8 chars, mixed case + symbols" icon={<Lock size={16} />} value={form.password} onChange={up('password')} error={errors.password} />
          <Input label="Address" placeholder="Area 49, Lilongwe" icon={<MapPin size={16} />} value={form.address} onChange={up('address')} error={errors.address} />
          <Input label="Occupation" placeholder="Business owner, Teacher…" icon={<Briefcase size={16} />} value={form.occupation} onChange={up('occupation')} error={errors.occupation} />
          <div className="auth-actions">
            <Button type="button" variant="outline" className="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button type="submit" loading={loading}>Create account</Button>
          </div>
        </form>
      )}

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}