import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import {
  formatCurrency,
  formatDate,
  getInitials,
  loanStatusConfig,
} from "@/utils";
import api from "@/api/client";
import type { LoanStatus } from "@/types";

// ── API helpers ──────────────────────────────────────────
const fetchBorrowers = (search: string) =>
  api
    .get("/users", { params: { search: search || undefined, limit: 100 } })
    .then((r) => r.data);

const fetchBorrower = (id: string) =>
  api.get(`/users/${id}`).then((r) => r.data);

// ── Sidebar nav (same as AdminDashboard) ─────────────────
const NAV_ITEMS = [
  { icon: "ti-layout-dashboard", label: "Dashboard", to: "/admin/dashboard" },
  { icon: "ti-chart-bar", label: "Analytics", to: "/admin/analytics" },
  { icon: "ti-file-text", label: "My loans", to: "/loans" },
  { icon: "ti-files", label: "All loans", to: "/admin/loans" },
  { icon: "ti-users", label: "Borrowers", to: "/admin/borrowers" },
  { icon: "ti-receipt", label: "Invoices", to: "/admin/invoices" },
  {
    icon: "ti-arrows-right-left",
    label: "Transactions",
    to: "/admin/transactions",
  },
];
const NAV_BOTTOM = [
  { icon: "ti-settings", label: "Settings", to: "/admin/settings" },
  { icon: "ti-help-circle", label: "Help desk", to: "/admin/help" },
];

const AVATAR_COLORS = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FBEAF0", color: "#993556" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#E1F5EE", color: "#0F6E56" },
];

const STATUS_PILL: Record<
  string,
  { label: string; style: React.CSSProperties }
> = {
  PENDING: {
    label: "Pending",
    style: {
      background: "#FFF8E1",
      color: "#92620A",
      border: "1px solid #FAAD1440",
    },
  },
  UNDER_REVIEW: {
    label: "Under review",
    style: {
      background: "#E8F5F2",
      color: "#007A66",
      border: "1px solid rgba(0,201,167,.3)",
    },
  },
  APPROVED: {
    label: "Approved",
    style: {
      background: "#EAF3DE",
      color: "#3B6D11",
      border: "1px solid #C0DD97",
    },
  },
  DISBURSED: {
    label: "Disbursed",
    style: {
      background: "#E6F1FB",
      color: "#185FA5",
      border: "1px solid #B5D4F4",
    },
  },
  CLOSED: {
    label: "Closed",
    style: {
      background: "#F3F4F6",
      color: "#6B7280",
      border: "1px solid #E5E7EB",
    },
  },
  DEFAULTED: {
    label: "Defaulted",
    style: {
      background: "#FCEBEB",
      color: "#A32D2D",
      border: "1px solid #F7C1C1",
    },
  },
};

const KYC_STYLE: Record<string, React.CSSProperties> = {
  VERIFIED: {
    background: "#DCFCE7",
    color: "#16A34A",
    border: "1px solid #BBF7D0",
  },
  PENDING: {
    background: "#FEF9C3",
    color: "#92620A",
    border: "1px solid #FDE68A",
  },
  REJECTED: {
    background: "#FEE2E2",
    color: "#DC2626",
    border: "1px solid #FCA5A5",
  },
};

// ── Shared sidebar ────────────────────────────────────────
const Sidebar: React.FC<{
  user: any;
  logout: () => void;
  onClose?: () => void;
}> = ({ user, logout, onClose }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "18px 16px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#00C9A7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#0a1420", fontWeight: 900, fontSize: 11 }}>
            LF
          </span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            LoanFlow
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
            Admin portal
          </div>
        </div>
      </div>
      <nav
        style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "all .15s",
              color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            })}
          >
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />
            {label}
          </NavLink>
        ))}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.1)",
            margin: "8px 10px",
          }}
        />
        {NAV_BOTTOM.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
              background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
            })}
          >
            <i className={`ti ${icon}`} style={{ fontSize: 16, width: 18 }} />
            {label}
          </NavLink>
        ))}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.1)",
            margin: "8px 10px",
          }}
        />
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 7,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontWeight: 500,
          }}
        >
          <i className="ti ti-logout" style={{ fontSize: 16, width: 18 }} />
          Log out
        </button>
      </nav>
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>
              {getInitials(user?.name ?? "A")}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
              {user?.role?.replace(/_/g, " ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Topbar ────────────────────────────────────────────────
const Topbar: React.FC<{
  user: any;
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}> = ({ user, onMenuClick, title, subtitle }) => (
  <header
    style={{
      padding: "12px 24px",
      borderBottom: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 20,
      flexShrink: 0,
    }}
  >
    <button
      className="menu-btn-admin"
      onClick={onMenuClick}
      style={{
        display: "none",
        background: "none",
        border: "none",
        color: "#6B7280",
        cursor: "pointer",
        padding: 4,
      }}
    >
      <i className="ti ti-menu-2" style={{ fontSize: 22 }} />
    </button>
    <div>
      <h1
        style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 12, color: "#6B7280", margin: 0, marginTop: 1 }}>
          {subtitle}
        </p>
      )}
    </div>
    <div style={{ flex: 1 }} />
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#1a3a6b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
        {getInitials(user?.name ?? "A")}
      </span>
    </div>
  </header>
);

// ══════════════════════════════════════════════════════════
// PAGE 1: Borrowers list
// ══════════════════════════════════════════════════════════
export const AdminBorrowers: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["borrowers", search],
    queryFn: () => fetchBorrowers(search),
    staleTime: 30000,
  });
  const borrowers: any[] = data?.data ?? [];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FA" }}>
      {/* Desktop sidebar */}
      <aside
        className="hide-mobile"
        style={{
          width: 220,
          background: "#1a3a6b",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30,
        }}
      >
        <Sidebar user={user} logout={logout} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.6)",
            }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            style={{
              position: "relative",
              width: 240,
              background: "#1a3a6b",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              ✕
            </button>
            <Sidebar
              user={user}
              logout={logout}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      <div
        className="main-shift"
        style={{
          flex: 1,
          marginLeft: 220,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Topbar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          title="Borrowers"
          subtitle={`${borrowers.length} registered borrowers`}
        />

        <main style={{ flex: 1, padding: 24 }}>
          {/* Search */}
          <div
            style={{ position: "relative", maxWidth: 380, marginBottom: 20 }}
          >
            <i
              className="ti ti-search"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
                fontSize: 15,
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone…"
              style={{
                width: "100%",
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                padding: "9px 12px 9px 34px",
                fontSize: 13,
                color: "#111827",
                outline: "none",
                fontFamily: "inherit",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* Grid */}
          {isLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 90,
                    borderRadius: 12,
                    background: "#E5E7EB",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ))}
            </div>
          ) : borrowers.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#9CA3AF",
              }}
            >
              <i
                className="ti ti-users"
                style={{
                  fontSize: 48,
                  display: "block",
                  marginBottom: 12,
                  opacity: 0.4,
                }}
              />
              <p style={{ fontSize: 14 }}>No borrowers found</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 14,
              }}
            >
              {borrowers.map((b: any, i: number) => {
                const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
                const totalLoans = b.loans?.length ?? 0;
                const totalBorrowed = (b.loans ?? []).reduce(
                  (s: number, l: any) => s + Number(l.amount),
                  0,
                );
                const kycStyle = KYC_STYLE[b.kycStatus] ?? KYC_STYLE["PENDING"];

                return (
                  <div
                    key={b.id}
                    onClick={() => navigate(`/admin/borrowers/${b.id}`)}
                    style={{
                      background: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      padding: "16px",
                      cursor: "pointer",
                      transition: "all .15s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "#1a3a6b";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.05)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "#E5E7EB";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      {b.avatarUrl ? (
                        <img
                          src={`http://localhost:3200${b.avatarUrl}`}
                          alt={b.name}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                            border: "2px solid #E5E7EB",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: ac.bg,
                            color: ac.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0,
                            border: `2px solid ${ac.color}30`,
                          }}
                        >
                          {getInitials(b.name)}
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#111827",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {b.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#6B7280",
                            marginTop: 2,
                          }}
                        >
                          {b.phone}
                        </div>
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 8px",
                          borderRadius: 99,
                          fontSize: 10,
                          fontWeight: 600,
                          flexShrink: 0,
                          ...kycStyle,
                        }}
                      >
                        {b.kycStatus}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        paddingTop: 12,
                        borderTop: "1px solid #F3F4F6",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#9CA3AF",
                            textTransform: "uppercase",
                            letterSpacing: ".04em",
                            marginBottom: 2,
                          }}
                        >
                          Total loans
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#1a3a6b",
                          }}
                        >
                          {totalLoans}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#9CA3AF",
                            textTransform: "uppercase",
                            letterSpacing: ".04em",
                            marginBottom: 2,
                          }}
                        >
                          Total borrowed
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          {formatCurrency(totalBorrowed)}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: 2,
                        }}
                      >
                        <i
                          className="ti ti-chevron-right"
                          style={{ fontSize: 16, color: "#9CA3AF" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{display:none!important}
          .main-shift{margin-left:0!important}
          .menu-btn-admin{display:flex!important}
        }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// PAGE 2: Single borrower detail
// ══════════════════════════════════════════════════════════
export const AdminBorrowerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: borrower, isLoading } = useQuery({
    queryKey: ["borrower", id],
    queryFn: () => fetchBorrower(id!),
    enabled: !!id,
  });

  const loans: any[] = borrower?.loans ?? [];
  const totalBorrowed = loans.reduce(
    (s: number, l: any) => s + Number(l.amount),
    0,
  );
  const totalRepaid = loans
    .filter((l: any) => l.status === "CLOSED")
    .reduce((s: number, l: any) => s + Number(l.amount), 0);
  const activeLoans = loans.filter((l: any) => l.status === "DISBURSED").length;
  const kycStyle = KYC_STYLE[borrower?.kycStatus] ?? KYC_STYLE["PENDING"];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FA" }}>
      {/* Desktop sidebar */}
      <aside
        className="hide-mobile"
        style={{
          width: 220,
          background: "#1a3a6b",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30,
        }}
      >
        <Sidebar user={user} logout={logout} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.6)",
            }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            style={{
              position: "relative",
              width: 240,
              background: "#1a3a6b",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              ✕
            </button>
            <Sidebar
              user={user}
              logout={logout}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      <div
        className="main-shift"
        style={{
          flex: 1,
          marginLeft: 220,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Topbar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          title="Borrower Profile"
          subtitle="Full borrower details and loan history"
        />

        <main style={{ flex: 1, padding: 24 }}>
          {/* Back button */}
          <button
            onClick={() => navigate("/admin/borrowers")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#6B7280",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 20,
              padding: 0,
            }}
          >
            <i className="ti ti-arrow-left" style={{ fontSize: 16 }} /> Back to
            borrowers
          </button>

          {isLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: 20,
              }}
            >
              <div
                style={{ height: 420, borderRadius: 12, background: "#E5E7EB" }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    height: 160,
                    borderRadius: 12,
                    background: "#E5E7EB",
                  }}
                />
                <div
                  style={{
                    height: 260,
                    borderRadius: 12,
                    background: "#E5E7EB",
                  }}
                />
              </div>
            </div>
          ) : !borrower ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#9CA3AF",
              }}
            >
              <p>Borrower not found</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: 20,
                alignItems: "start",
              }}
            >
              {/* ── LEFT: Profile card ── */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Header band */}
                  <div
                    style={{
                      height: 72,
                      background: "linear-gradient(135deg,#1a3a6b,#2563EB)",
                    }}
                  />

                  {/* Avatar */}
                  <div style={{ padding: "0 20px 20px", marginTop: -40 }}>
                    {borrower.avatarUrl ? (
                      <img
                        src={`http://localhost:3200${borrower.avatarUrl}`}
                        alt={borrower.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          display: "block",
                          marginBottom: 12,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "#1a3a6b",
                          border: "3px solid #fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: 800,
                          }}
                        >
                          {getInitials(borrower.name)}
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#111827",
                        marginBottom: 4,
                      }}
                    >
                      {borrower.name}
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "3px 10px",
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 600,
                        ...kycStyle,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "currentColor",
                        }}
                      />
                      KYC {borrower.kycStatus}
                    </span>

                    {/* Info rows */}
                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}
                    >
                      {[
                        {
                          icon: "ti-phone",
                          label: "Phone",
                          value: borrower.phone,
                        },
                        {
                          icon: "ti-mail",
                          label: "Email",
                          value: borrower.email ?? "—",
                        },
                        {
                          icon: "ti-map-pin",
                          label: "Address",
                          value: borrower.address,
                        },
                        {
                          icon: "ti-briefcase",
                          label: "Occupation",
                          value: borrower.occupation,
                        },
                        {
                          icon: "ti-calendar",
                          label: "Date joined",
                          value: formatDate(borrower.createdAt),
                        },
                      ].map(({ icon, label, value }) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "10px 0",
                            borderBottom: "1px solid #F9FAFB",
                          }}
                        >
                          <i
                            className={`ti ${icon}`}
                            style={{
                              fontSize: 15,
                              color: "#9CA3AF",
                              marginTop: 1,
                              flexShrink: 0,
                              width: 18,
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 10,
                                color: "#9CA3AF",
                                textTransform: "uppercase",
                                letterSpacing: ".04em",
                                marginBottom: 1,
                              }}
                            >
                              {label}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#111827",
                                fontWeight: 500,
                                wordBreak: "break-word",
                              }}
                            >
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Total amount borrowed card ── */}
                <div
                  style={{
                    background: "linear-gradient(135deg,#1a3a6b,#2563EB)",
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: "0 4px 12px rgba(26,58,107,0.35)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.65)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      marginBottom: 16,
                    }}
                  >
                    Financial Summary
                  </div>
                  {[
                    {
                      label: "Total Borrowed",
                      value: formatCurrency(totalBorrowed),
                      icon: "ti-coin",
                      accent: "#FAAD14",
                    },
                    {
                      label: "Total Repaid",
                      value: formatCurrency(totalRepaid),
                      icon: "ti-circle-check",
                      accent: "#4ADE80",
                    },
                    {
                      label: "Active Loans",
                      value: String(activeLoans),
                      icon: "ti-clock",
                      accent: "#60A5FA",
                    },
                    {
                      label: "Total Loans",
                      value: String(loans.length),
                      icon: "ti-files",
                      accent: "#C4B5FD",
                    },
                  ].map(({ label, value, icon, accent }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 7,
                            background: "rgba(255,255,255,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className={`ti ${icon}`}
                            style={{ fontSize: 14, color: accent }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 500,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <span
                        style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Loans list ── */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid #F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Loan History
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}
                    >
                      {loans.length} loan{loans.length !== 1 ? "s" : ""} total
                    </div>
                  </div>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#EEF2FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="ti ti-files"
                      style={{ fontSize: 18, color: "#4F46E5" }}
                    />
                  </div>
                </div>

                {loans.length === 0 ? (
                  <div
                    style={{
                      padding: "60px 20px",
                      textAlign: "center",
                      color: "#9CA3AF",
                    }}
                  >
                    <i
                      className="ti ti-file-off"
                      style={{
                        fontSize: 40,
                        display: "block",
                        marginBottom: 12,
                        opacity: 0.4,
                      }}
                    />
                    <p style={{ fontSize: 13 }}>No loans yet</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ background: "#F9FAFB" }}>
                          {[
                            "#",
                            "Date",
                            "Purpose",
                            "Amount",
                            "Term",
                            "Status",
                          ].map((h) => (
                            <th
                              key={h}
                              style={{
                                padding: "10px 16px",
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6B7280",
                                textAlign: "left",
                                textTransform: "uppercase",
                                letterSpacing: ".05em",
                                borderBottom: "1px solid #F3F4F6",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {loans.map((loan: any, idx: number) => {
                          const pill =
                            STATUS_PILL[loan.status] ?? STATUS_PILL["CLOSED"];
                          return (
                            <tr
                              key={loan.id}
                              style={{
                                borderBottom: "1px solid #F9FAFB",
                                transition: "background .1s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#F9FAFB")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  "transparent")
                              }
                            >
                              <td
                                style={{
                                  padding: "13px 16px",
                                  fontSize: 12,
                                  color: "#9CA3AF",
                                  fontWeight: 600,
                                }}
                              >
                                #{idx + 1}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  fontSize: 13,
                                  color: "#6B7280",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {formatDate(loan.createdAt)}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  fontSize: 13,
                                  color: "#374151",
                                  maxWidth: 200,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {loan.purpose}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "#111827",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {formatCurrency(Number(loan.amount))}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  fontSize: 13,
                                  color: "#374151",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {loan.termMonths} mo
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "4px 10px",
                                    borderRadius: 99,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    ...pill.style,
                                  }}
                                >
                                  <span
                                    style={{
                                      width: 5,
                                      height: 5,
                                      borderRadius: "50%",
                                      background: "currentColor",
                                    }}
                                  />
                                  {pill.label}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bottom summary bar */}
                {loans.length > 0 && (
                  <div
                    style={{
                      padding: "14px 20px",
                      borderTop: "1px solid #F3F4F6",
                      background: "#F9FAFB",
                      display: "flex",
                      gap: 24,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      {
                        label: "Total borrowed",
                        value: formatCurrency(totalBorrowed),
                        color: "#1a3a6b",
                      },
                      {
                        label: "Total repaid",
                        value: formatCurrency(totalRepaid),
                        color: "#16A34A",
                      },
                      {
                        label: "Outstanding",
                        value: formatCurrency(totalBorrowed - totalRepaid),
                        color: "#DC2626",
                      },
                    ].map(({ label, value, color }) => (
                      <div key={label}>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#9CA3AF",
                            textTransform: "uppercase",
                            letterSpacing: ".04em",
                            marginBottom: 2,
                          }}
                        >
                          {label}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{display:none!important}
          .main-shift{margin-left:0!important}
          .menu-btn-admin{display:flex!important}
          div[style*="grid-template-columns: 300px"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
};
