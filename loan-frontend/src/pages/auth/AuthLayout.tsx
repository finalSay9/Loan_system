import React from 'react'
import './auth.css'

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="auth-page">
    <aside className="auth-brand">
      <div className="brand-row">
        <div className="brand-mark">LF</div>
        <div>
          <div className="brand-name">LoanFlow</div>
          <div className="brand-sub">Financial Services</div>
        </div>
      </div>
      <div className="brand-copy">
        <h2>Borrow with clarity. Repay with ease.</h2>
        <p>Apply for a loan, track every payment and see what you owe, all from your phone.</p>
      </div>
      <div className="brand-foot">Secure, regulated lending in Malawi</div>
    </aside>

    <main className="auth-main">
      <div className="auth-wrap">
        <div className="auth-mobile-logo">
          <div className="brand-mark">LF</div>
          <div className="brand-name">LoanFlow</div>
        </div>
        {children}
      </div>
    </main>
  </div>
)