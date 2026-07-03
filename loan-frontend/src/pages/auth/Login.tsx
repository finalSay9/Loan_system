import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth.store'
import { loginUser } from '@/api'
import toast from 'react-hot-toast'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.phone) e.phone = 'Phone number is required'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await loginUser(form)
      setAuth(res.data, res.access_token)
      toast.success(`Welcome back, ${res.data.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
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
          <h1 className="font-black mb-1" style={{ fontSize: 22, color: 'var(--text)' }}>Sign in</h1>
          <p className="text-sm text-silver mb-4">Enter your registered phone number to continue</p>

          <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex' }}>
            <Input label="Phone Number" type="tel" placeholder="+265991234567"
              icon={<Phone size={15} />}
              value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              error={errors.phone} />

            <div className="field">
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon"><Lock size={15} /></span>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`input input-with-icon ${errors.password ? 'input-error' : ''}`}
                  style={{ paddingRight: 40 }}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--silver)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <Button type="submit" loading={loading} size="lg" style={{ marginTop: 8 }}>Sign in</Button>
          </form>
        </div>

        <p className="text-sm text-silver" style={{ marginTop: 20, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  )
}
