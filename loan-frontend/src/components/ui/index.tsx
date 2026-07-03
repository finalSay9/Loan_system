import React from 'react'
import { Loader2 } from 'lucide-react'

// ── Button ──────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props
}) => {
  const v = { primary: 'btn-primary', ghost: 'btn-ghost', danger: 'btn-danger', outline: 'btn-outline' }
  const s = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' }
  return (
    <button className={`btn ${v[variant]} ${s[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  )
}

// ── Input ────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; icon?: React.ReactNode
}
export const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => (
  <div className="field">
    {label && <label className="field-label">{label}</label>}
    <div className="input-wrap">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''}`}
        {...props}
      />
    </div>
    {error && <span className="field-error">{error}</span>}
  </div>
)

// ── Badge ────────────────────────────────────────────────
interface BadgeProps { status: string; label: string; color: string; bg: string; border: string }
export const Badge: React.FC<BadgeProps> = ({ label, color, bg, border }) => (
  <span className="badge" style={{ color, backgroundColor: bg, borderColor: border }}>
    <span className="badge-dot" style={{ backgroundColor: color }} />
    {label}
  </span>
)

// ── Card ─────────────────────────────────────────────────
interface CardProps { children: React.ReactNode; className?: string; style?: React.CSSProperties }
export const Card: React.FC<CardProps> = ({ children, className = '', style }) => (
  <div className={`card ${className}`} style={style}>{children}</div>
)

// ── Skeleton ─────────────────────────────────────────────
export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div className={`skeleton ${className}`} style={style} />
)

// ── Modal ────────────────────────────────────────────────
interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-bg" />
      <div className="modal-box fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="font-semibold text-text">{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--silver)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

// ── StatCard ─────────────────────────────────────────────
export const StatCard: React.FC<{ label: string; value: string; sub?: string; accent?: string; icon?: React.ReactNode }> = ({
  label, value, sub, accent = 'var(--teal)', icon
}) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <span className="field-label">{label}</span>
      {icon && <span style={{ color: accent }}>{icon}</span>}
    </div>
    <div>
      <p style={{ fontSize: 24, fontWeight: 800, color: accent }}>{value}</p>
      {sub && <p className="text-xs text-silver mt-1">{sub}</p>}
    </div>
  </div>
)
