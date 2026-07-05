
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllLoans } from "@/api";
import { useAuthStore } from "@/store/auth.store";
import { formatCurrency, formatDate, getInitials } from "@/utils";
import api from "@/api/client";

// ── Constants ────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "ti-layout-dashboard", label: "Dashboard",    to: "/admin/dashboard" },
  { icon: "ti-chart-bar",        label: "Analytics",    to: "/admin/analytics" },
  { icon: "ti-file-text",        label: "My loans",     to: "/loans" },
  { icon: "ti-files",            label: "All loans",    to: "/admin/loans" },
  { icon: "ti-receipt",          label: "Invoices",     to: "/admin/invoices" },
  { icon: "ti-arrows-right-left",label: "Transactions", to: "/admin/transactions" },
];
const NAV_BOTTOM = [
  { icon: "ti-settings",    label: "Settings",  to: "/admin/settings" },
  { icon: "ti-help-circle", label: "Help desk", to: "/admin/help" },
];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const STATUS_PILL: Record<string, { label: string; style: React.CSSProperties }> = {
  PENDING:      { label: "Pending",      style: { background: "#FFF8E1", color: "#92620A", border: "1px solid #FAAD1440" } },
  UNDER_REVIEW: { label: "Under review", style: { background: "#E8F5F2", color: "#007A66", border: "1px solid rgba(0,201,167,.3)" } },
  APPROVED:     { label: "Approved",     style: { background: "#EAF3DE", color: "#3B6D11", border: "1px solid #C0DD97" } },
  DISBURSED:    { label: "Disbursed",    style: { background: "#E6F1FB", color: "#185FA5", border: "1px solid #B5D4F4" } },
  CLOSED:       { label: "Closed",       style: { background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" } },
  DEFAULTED:    { label: "Defaulted",    style: { background: "#FCEBEB", color: "#A32D2D", border: "1px solid #F7C1C1" } },
};

const AVATAR_COLORS = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FBEAF0", color: "#993556" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#E1F5EE", color: "#0F6E56" },
];

// ── Component ─────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ── Data fetching ──
  const { data: loansData } = useQuery({
    queryKey: ["admin-loans"],
    queryFn: () => getAllLoans(),
  });
  const loans = loansData?.data ?? [];

  const { data: statsData } = useQuery({
    queryKey: ["monthly-stats"],
    queryFn: () => api.get("/loans/stats/monthly").then((r) => r.data),
  });

  const { data: satisfactionData } = useQuery({
    queryKey: ["satisfaction"],
    queryFn: () => api.get("/feedback/stats").then((r) => r.data),
  });

  // ── Derived stats ──
  const totalBorrowed = loans.reduce((s, l) => s + Number(l.amount), 0);
  const activeLoans   = loans.filter((l) => l.status === "DISBURSED").length;
  const pendingLoans  = loans.filter((l) => ["PENDING", "UNDER_REVIEW"].includes(l.status)).length;
  const uniqueBorrowers = new Set(loans.map((l) => l.userId)).size;

  // ── Bar chart heights from real data ──
  const rawMonths: { month: number; count: number }[] = statsData?.data ?? [];
  const maxCount = Math.max(...rawMonths.map((m) => m.count), 1);
  const barHeights = MONTHS.map((_, i) => {
    const found = rawMonths.find((m) => m.month === i + 1);
    return found ? Math.round((found.count / maxCount) * 100) : 0;
  });

  // ── Satisfaction from real data ──
  const satRows: { label: string; percentage: number; color: string }[] = satisfactionData?.data
    ? satisfactionData.data.map((r: any, idx: number) => ({
        label: r.label,
        percentage: r.percentage,
        color: ["#1baf7a", "#2a78d6", "#eda100", "#e34948"][idx] ?? "#ccc",
      }))
    : [
        { label: "Excellent", percentage: 0, color: "#1baf7a" },
        { label: "Good",      percentage: 0, color: "#2a78d6" },
        { label: "Neutral",   percentage: 0, color: "#eda100" },
        { label: "Poor",      percentage: 0, color: "#e34948" },
      ];
  const overallPct: number = satisfactionData?.overallPercentage ?? 0;
  const totalResponses: number = satisfactionData?.total ?? 0;

  // ── Filtered table rows ──
  const filtered = loans
    .filter((l) =>
      search === "" || JSON.stringify(l).toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);
  const tableRows = filtered.length > 0 ? filtered : loans.slice(0, 6);

  // ── Sidebar ──────────────────────────────────────────────
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#00C9A7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#0a1420", fontWeight: 900, fontSize: 11 }}>LF</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>LoanFlow</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Admin portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
              borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all .15s",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "8px 10px" }} />
        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink key={to} to={to} onClick={onClose}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
              borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: "none",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            })}>
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "8px 10px" }} />
        <button onClick={() => { logout(); navigate("/login"); }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 7, fontSize: 13, color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", width: "100%", fontWeight: 500 }}>
          <i className="ti ti-logout" style={{ fontSize: 16, width: 18 }} aria-hidden="true" />
          Log out
        </button>
      </nav>

      {/* User footer */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#ffffff", fontSize: 11, fontWeight: 700 }}>{getInitials(user?.name ?? "A")}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{user?.role?.replace(/_/g, " ")}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FA" }}>

      {/* Desktop sidebar */}
      <aside className="hide-mobile" style={{ width: 220, background: "#191970", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 30 }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)" }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: "relative", width: 240, background: "#1a3a6b", display: "flex", flexDirection: "column" }}>
            <button onClick={() => setSidebarOpen(false)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 20 }}>✕</button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="main-shift" style={{ flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Top bar */}
        <header style={{ padding: "12px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12, background: "#ffffff", position: "sticky", top: 0, zIndex: 20, flexShrink: 0 }}>
          <button className="menu-btn-admin" onClick={() => setSidebarOpen(true)}
            style={{ display: "none", background: "none", border: "none", color: "#6B7280", cursor: "pointer", padding: 4 }}>
            <i className="ti ti-menu-2" style={{ fontSize: 22 }} />
          </button>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <i className="ti ti-search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", fontSize: 15 }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search loans, borrowers…"
              style={{ width: "100%", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px 8px 34px", fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit" }} />
          </div>

          <div style={{ flex: 1 }} />

          {/* 4-dot grid */}
          <div title="Overview" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 7, borderRadius: 7, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer" }}>
            {[0,1,2,3].map((k) => <div key={k} style={{ width: 5, height: 5, borderRadius: 1, background: "#9CA3AF" }} />)}
          </div>

          {/* Messages */}
          <button aria-label="Messages" style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#6B7280", cursor: "pointer", fontSize: 17 }}>
            <i className="ti ti-message-circle" />
          </button>

          {/* Notifications */}
          <button aria-label="Notifications" style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#6B7280", cursor: "pointer", fontSize: 17, position: "relative" }}>
            <i className="ti ti-bell" />
            <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#EF4444", border: "1.5px solid #ffffff" }} />
          </button>

          {/* Avatar */}
          <div title="Profile" style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a3a6b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>{getInitials(user?.name ?? "A")}</span>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Page heading */}
          <div>
            <h1 style={{ fontSize: 25, fontWeight: 700, color: "#111827", margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>
              Welcome back, {user?.name?.split(" ")[0]}. Here's what's happening today.
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {/* Card 1 — Yellow, bold */}
            <div style={{ background: "#ffff00", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 8px rgba(250,173,20,0.35)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#78490A", textTransform: "uppercase", letterSpacing: ".04em" }}>Total borrowed</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-coin" style={{ fontSize: 16, color: "#1a0e00" }} />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1a0e00", marginBottom: 6 }}>{formatCurrency(totalBorrowed)}</div>
              <div style={{ fontSize: 11, color: "#78490A", display: "flex", alignItems: "center", gap: 3 }}>
                <i className="ti ti-trending-up" style={{ fontSize: 12 }} /> +12% this month
              </div>
            </div>

            {/* Card 2 — White */}
            <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".04em" }}>Active loans</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-check-circle" style={{ fontSize: 16, color: "#16A34A" }} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{activeLoans}</div>
              <div style={{ fontSize: 11, color: "#16A34A", display: "flex", alignItems: "center", gap: 3 }}>
                <i className="ti ti-trending-up" style={{ fontSize: 12 }} /> Currently disbursed
              </div>
            </div>

            {/* Card 3 — White */}
            <div style={{ background: "#00ffff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".04em" }}>Pending review</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-clock" style={{ fontSize: 16, color: "#2563EB" }} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{pendingLoans}</div>
              <div style={{ fontSize: 11, color: "#6B7280", display: "flex", alignItems: "center", gap: 3 }}>
                <i className="ti ti-clock" style={{ fontSize: 12 }} /> Awaiting officer action
              </div>
            </div>

            {/* Card 4 — White */}
            <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".04em" }}>Total borrowers</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-users" style={{ fontSize: 16, color: "#7C3AED" }} />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{uniqueBorrowers}</div>
              <div style={{ fontSize: 11, color: "#7C3AED", display: "flex", alignItems: "center", gap: 3 }}>
                <i className="ti ti-trending-up" style={{ fontSize: 12 }} /> Registered users
              </div>
            </div>
          </div>

          {/* ── Charts row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Bar chart — real data */}
            <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#000000" }}>Borrow statistics</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Loan applications per month — {new Date().getFullYear()}</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 110 }} role="img" aria-label="Monthly loan applications bar chart">
                {MONTHS.map((m, i) => (
                  <div key={m} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                    <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: "#4b0082", opacity: barHeights[i] === 0 ? 0.15 : 0.85, height: `${Math.max(barHeights[i], barHeights[i] === 0 ? 4 : 4)}%`, minHeight: 4, transition: "height .4s ease" }} />
                    <span style={{ fontSize: 9, color: "#9CA3AF" }}>{m}</span>
                  </div>
                ))}
              </div>
              {rawMonths.length === 0 && (
                <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>No data yet for this year</p>
              )}
            </div>

            {/* Satisfaction — real data */}
            <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Customer satisfaction</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Based on borrower feedback</div>
                </div>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#16A34A" }}>
                  {totalResponses > 0 ? `${overallPct}%` : "—"}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {satRows.map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#374151", width: 60, flexShrink: 0 }}>{row.label}</span>
                    <div style={{ flex: 1, height: 7, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: row.color, width: `${row.percentage}%`, transition: "width .5s ease" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#6B7280", width: 32, textAlign: "right", flexShrink: 0 }}>{row.percentage}%</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                  {totalResponses > 0 ? `${totalResponses} responses total` : "No feedback yet"}
                </span>
                <NavLink to="/admin/loans" style={{ fontSize: 11, color: "#1a3a6b", textDecoration: "none", fontWeight: 600 }}>View all ↗</NavLink>
              </div>
            </div>
          </div>

          {/* ── Recent loans table ── */}
          <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Recent loan applications</span>
              <NavLink to="/admin/loans" style={{ fontSize: 12, color: "#1a3a6b", textDecoration: "none", fontWeight: 600 }}>View all ↗</NavLink>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    {["Borrower", "Amount", "Purpose", "Term", "Date applied", "Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#6B7280", textAlign: "left", textTransform: "uppercase", letterSpacing: ".05em", borderBottom: "1px solid #F3F4F6", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "48px 16px", textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>
                        No loans yet
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((loan, i) => {
                      const loanAny = loan as any;
                      const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
                      const pill = STATUS_PILL[loan.status] ?? STATUS_PILL["CLOSED"];
                      const borrowerName: string = loanAny.user?.name ?? `Borrower ${i + 1}`;
                      const borrowerPhone: string = loanAny.user?.phone ?? "+265 9XX XXX XXX";
                      const avatarUrl: string | null = loanAny.user?.avatarUrl ?? null;

                      return (
                        <tr key={loan.id} style={{ borderBottom: "1px solid #F9FAFB", cursor: "pointer", transition: "background .1s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>

                          {/* Borrower cell */}
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {/* Avatar — real photo or coloured initials */}
                              {avatarUrl ? (
                                <img src={`http://localhost:3200${avatarUrl}`} alt={borrowerName}
                                  style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1.5px solid #E5E7EB" }} />
                              ) : (
                                <div style={{ width: 34, height: 34, borderRadius: "50%", background: ac.bg, color: ac.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, border: `1.5px solid ${ac.color}30` }}>
                                  {getInitials(borrowerName)}
                                </div>
                              )}
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{borrowerName}</div>
                                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{borrowerPhone}</div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap" }}>
                            {formatCurrency(Number(loan.amount))}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {loan.purpose}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>
                            {loan.termMonths} mo
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#6B7280", whiteSpace: "nowrap" }}>
                            {formatDate(loan.createdAt)}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, ...pill.style }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                              {pill.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .hide-mobile { display: none !important }
          .main-shift  { margin-left: 0 !important }
          .menu-btn-admin { display: flex !important }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important }
          .charts-grid { grid-template-columns: 1fr !important }
        }
      `}</style>
    </div>
  );
};
