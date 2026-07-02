import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F1B2D]'
  const variants = {
    primary: 'bg-[#00C9A7] hover:bg-[#00A888] text-[#0F1B2D] focus:ring-[#00C9A7] active:scale-95',
    ghost: 'text-[#8899AA] hover:text-[#F0F4F8] hover:bg-[#1E2D3D]',
    danger: 'bg-[#FF4D4F20] hover:bg-[#FF4D4F30] text-[#FF4D4F] border border-[#FF4D4F40]',
    outline: 'border border-[#243447] hover:border-[#00C9A7] hover:text-[#00C9A7] text-[#8899AA]',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; icon?: React.ReactNode
}
export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-medium text-[#8899AA] uppercase tracking-wider">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]">{icon}</span>}
      <input className={`w-full bg-[#1E2D3D] border ${error ? 'border-[#FF4D4F]' : 'border-[#243447]'} rounded-lg px-4 py-3 text-[#F0F4F8] text-sm placeholder:text-[#4A6080] focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A720] transition-all ${icon ? 'pl-10' : ''} ${className}`} {...props} />
    </div>
    {error && <span className="text-xs text-[#FF4D4F]">{error}</span>}
  </div>
)

interface BadgeProps { status: string; label: string; color: string; bg: string; border: string }
export const Badge: React.FC<BadgeProps> = ({ label, color, bg, border }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}>
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </span>
)

interface CardProps { children: React.ReactNode; className?: string; style?: React.CSSProperties }
export const Card: React.FC<CardProps> = ({ children, className = '', style }) => (
  <div className={`bg-[#1E2D3D] border border-[#243447] rounded-xl p-5 ${className}`} style={style}>{children}</div>
)

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} />
)

interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#1E2D3D] border border-[#243447] rounded-2xl w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#243447]">
          <h2 className="font-semibold text-[#F0F4F8]">{title}</h2>
          <button onClick={onClose} className="text-[#8899AA] hover:text-[#F0F4F8] transition-colors">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export const StatCard: React.FC<{ label: string; value: string; sub?: string; accent?: string; icon?: React.ReactNode }> = ({ label, value, sub, accent = '#00C9A7', icon }) => (
  <Card className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-[#8899AA] uppercase tracking-wider">{label}</span>
      {icon && <span style={{ color: accent }}>{icon}</span>}
    </div>
    <div>
      <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
      {sub && <p className="text-xs text-[#8899AA] mt-0.5">{sub}</p>}
    </div>
  </Card>
)
