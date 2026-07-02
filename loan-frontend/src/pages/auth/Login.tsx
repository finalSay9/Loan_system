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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    <div className="min-h-screen bg-[#0F1B2D] flex flex-col">
      {/* Header accent */}
      <div className="h-1 bg-gradient-to-r from-[#00C9A7] to-[#1890FF]" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
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
          <div className="bg-[#1E2D3D] border border-[#243447] rounded-2xl p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-[#F0F4F8] mb-1">Sign in</h1>
            <p className="text-sm text-[#8899AA] mb-6">Enter your registered phone number to continue</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+265991234567"
                icon={<Phone size={15} />}
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                error={errors.phone}
              />
              <div className="flex flex-col gap-1.5">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter your password"
                    icon={<Lock size={15} />}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-[38px] text-[#8899AA] hover:text-[#F0F4F8] transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
                Sign in
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-[#8899AA] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#00C9A7] hover:underline font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
