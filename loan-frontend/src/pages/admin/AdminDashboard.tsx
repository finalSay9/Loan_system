import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllLoans } from "@/api";
import { useAuthStore } from "@/store/auth.store";
import {
  formatCurrency,
  formatDate,
  loanStatusConfig,
  getInitials,
} from "@/utils";
import type { LoanStatus } from "@/types";

const NAV_ITEMS = [
  { icon: "ti-layout-dashboard", label: "Dashboard", to: "/admin/dashboard" },
  { icon: "ti-chart-bar", label: "Analytics", to: "/admin/analytics" },
  { icon: "ti-file-text", label: "My loans", to: "/loans" },
  { icon: "ti-files", label: "All loans", to: "/admin/loans" },
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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const BAR_HEIGHTS = [45, 62, 38, 80, 55, 90, 70, 48, 66, 200, 85, 72];

const STATUS_PILL: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Pending", cls: "pill-pending" },
  UNDER_REVIEW: { label: "Under review", cls: "pill-review" },
  APPROVED: { label: "Approved", cls: "pill-approved" },
  DISBURSED: { label: "Disbursed", cls: "pill-disbursed" },
  CLOSED: { label: "Closed", cls: "pill-closed" },
  DEFAULTED: { label: "Defaulted", cls: "pill-danger" },
};

const AVATAR_COLORS = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FBEAF0", color: "#e20e55" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#E1F5EE", color: "#0F6E56" },
];

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["admin-loans"],
    queryFn: () => getAllLoans(),
  });
  const loans = data?.data ?? [];

  const totalBorrowed = loans.reduce((s, l) => s + Number(l.amount), 0);
  const activeLoans = loans.filter((l) => l.status === "DISBURSED").length;
  const pendingLoans = loans.filter((l) =>
    ["PENDING", "UNDER_REVIEW"].includes(l.status),
  ).length;
  const uniqueBorrowers = new Set(loans.map((l) => l.userId)).size;

  const filtered = loans
    .filter(
      (l) =>
        search === "" ||
        JSON.stringify(l).toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 8);

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "18px 16px 14px",
          borderBottom: "0.5px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            background: "#044ce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#0a1420", fontWeight: 900, fontSize: 10 }}>
            LF
          </span>
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            LoanFlow
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
            Admin portal
          </div>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
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
              gap: 8,
              padding: "8px 10px",
              borderRadius: 7,
              fontSize: 14,
              textDecoration: "none",
              transition: "all .15s",
              color: isActive ? "#00A888" : "var(--text-secondary)",
              background: isActive ? "rgba(23, 102, 93, 0.77)" : "transparent",
            })}
          >
            <i
              className={`ti ${icon}`}
              style={{ fontSize: 15, width: 16 }}
              aria-hidden="true"
            />
            {label}
          </NavLink>
        ))}
        <div
          style={{
            height: "0.5px",
            background: "var(--border)",
            margin: "6px 10px",
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
              gap: 8,
              padding: "8px 10px",
              borderRadius: 7,
              fontSize: 12,
              textDecoration: "none",
              color: isActive ? "#00A888" : "var(--text-secondary)",
              background: isActive ? "rgba(0,201,167,.1)" : "transparent",
            })}
          >
            <i
              className={`ti ${icon}`}
              style={{ fontSize: 15, width: 16 }}
              aria-hidden="true"
            />
            {label}
          </NavLink>
        ))}
        <div
          style={{
            height: "0.5px",
            background: "var(--border)",
            margin: "6px 10px",
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
            gap: 8,
            padding: "8px 10px",
            borderRadius: 7,
            fontSize: 12,
            color: "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <i
            className="ti ti-logout"
            style={{ fontSize: 15, width: 16 }}
            aria-hidden="true"
          />
          Log out
        </button>
      </nav>

      <div
        style={{ padding: "12px 10px", borderTop: "0.5px solid var(--border)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,201,167,.12)",
              border: "1.5px solid rgba(0,201,167,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#00A888", fontSize: 10, fontWeight: 700 }}>
              {getInitials(user?.name ?? "A")}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 23,
                fontWeight: 500,
                color: "var(--text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name}
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
              {user?.role?.replace(/_/g, " ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "rgba(255, 255, 255)",
        fontSize: 23,
      }}
    >
      {/* Desktop sidebar */}
      <aside
        style={{
          width: 200,
          background: "#191970",
          borderRight: "0.5px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,

          bottom: 0,
          left: 0,
          zIndex: 30,
        }}
        className="hide-mobile"
      >
        <SidebarContent />
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
              width: 220,
              background: "var(--surface-1)",
              borderRight: "0.5px solid var(--border)",
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
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✕
            </button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div
        style={{
          flex: 1,
          marginLeft: 200,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        className="main-shift"
      >
        {/* Topbar */}
        <header
          style={{
            padding: "10px 24px",
            borderBottom: "0.5px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface-1)",
            position: "sticky",
            top: 0,
            zIndex: 20,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
            className="menu-btn-admin"
          >
            <i
              className="ti ti-menu-2"
              style={{ fontSize: 20 }}
              aria-label="Open menu"
            />
          </button>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
            <i
              className="ti ti-search"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                fontSize: 14,
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search loans, borrowers…"
              aria-label="Search"
              style={{
                width: "100%",
                background: "#000000",
                border: "0.5px solid var(--border)",
                borderRadius: 7,
                padding: "7px 10px 7px 32px",
                fontSize: 14,
                color: "#FFFFFF",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* 4-dot overview */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              padding: 6,
              borderRadius: 6,
              border: "0.5px solid var(--border)",
              background: "#8b8383",
              cursor: "pointer",
            }}
            title="Overview"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 1,
                  background: "var(--text-muted)",
                }}
              />
            ))}
          </div>

          {/* Messages */}
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              border: "none",
              color: "#000000",
              cursor: "pointer",
              fontSize: 25,
            }}
            aria-label="Messages"
          >
            <i className="ti ti-message-circle" aria-hidden="true" />
          </button>

          {/* Notifications */}
          <button
            style={{
              width: 40,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              border: "none",
              color: "#000000",
              cursor: "pointer",
              fontSize: 25,
              position: "relative",
            }}
            aria-label="Notifications"
          >
            <i className="ti ti-bell" aria-hidden="true" />
            <span
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#e34948",
                border: "1.5px solid var(--surface-1)",
              }}
            />
          </button>

          {/* Avatar */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(231, 224, 224, 0.88)",
              border: "1.5px solid rgba(0,201,167,.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Profile"
          >
            <span style={{ fontSize: 11, fontWeight: 500, color: "#00A888" }}>
              {getInitials(user?.name ?? "A")}
            </span>
          </div>
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflowY: "auto",
          }}
        >
          {/* Page title */}
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Dashboard
            </h1>
            <p style={{ fontSize: 12, color: "#000000", marginTop: 2 }}>
              Welcome back, {user?.name?.split(" ")[0]}. Here's what's
              happening.
            </p>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
            }}
          >
            {[
              {
                label: "Total borrowed",
                value: formatCurrency(totalBorrowed),
                delta: "+12% this month",
                icon: "ti-coin",
                bg: "#ffff00",
                border: "#FAAD1440",
                labelColor: "#000000",
                valColor: "#000000",
                iconBg: "#050401ef",
                iconColor: "#9400D3",
                deltaColor: "#000000",
              },
              {
                label: "Active loans",
                value: String(activeLoans),
                delta: "Currently disbursed",
                icon: "ti-check-circle",
                bg: "rgb(255, 255, 255)",
                border: "rgba(0, 0, 0, 0.25)",
                labelColor: "#000000",
                valColor: "#000000",
                iconBg: "rgba(0, 0, 0, 0.81)",
                iconColor: "#00FF00",
                deltaColor: "#000000",
              },
              {
                label: "Pending review",
                value: String(pendingLoans),
                delta: "Awaiting action",
                icon: "ti-clock",
                bg: "#00FF00",
                border: "#00FF00",
                labelColor: "#03070a",
                valColor: "#02060a",
                iconBg: "rgb(255,255,255)",
                iconColor: "#020202",
                deltaColor: "#000000",
              },
              {
                label: "Total borrowers",
                value: String(uniqueBorrowers),
                delta: "Registered users",
                icon: "ti-users",
                bg: "#00FFFF",
                border: "rgba(0, 0, 0, 0.94)",
                labelColor: "#020105",
                valColor: "#352A90",
                iconBg: "rgb(3, 3, 3)",
                iconColor: "#FFFFFF",
                deltaColor: "#030303",
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: card.bg,
                  border: `0.5px solid ${card.border}`,
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      color: card.labelColor,
                    }}
                  >
                    {card.label}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: card.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={`ti ${card.icon}`}
                      style={{ fontSize: 14, color: card.iconColor }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: card.valColor,
                    marginBottom: 6,
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: card.deltaColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <i
                    className="ti ti-trending-up"
                    style={{ fontSize: 11 }}
                    aria-hidden="true"
                  />
                  {card.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {/* Bar chart */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "14px 16px",
                boxShadow: "1 3px 3px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      color: "#000000",
                    }}
                  >
                    Borrow statistics
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#000000",
                      marginTop: 2,
                    }}
                  >
                    Monthly disbursements — 2025
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                  height: 100,
                }}
                role="img"
                aria-label="Monthly disbursements bar chart"
              >
                {MONTHS.map((m, i) => (
                  <div
                    key={m}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        borderRadius: "3px 3px 0 0",
                        background: "#00FF00",
                        opacity: i === 11 ? 0.45 : 0.8,
                        height: `${BAR_HEIGHTS[i]}%`,
                        minHeight: 4,
                        transition: "opacity .2s",
                      }}
                    />
                    <span style={{ fontSize: 11, color: "#000000" }}>
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction */}
            <div
              style={{
                background: "#800000",
                border: "0.5px solid var(--border)",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Customer satisfaction
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Based on borrower feedback
                  </div>
                </div>
                <span
                  style={{ fontSize: 20, fontWeight: 500, color: "#1baf7a" }}
                >
                  91%
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  { label: "Excellent", pct: 68, color: "#1baf7a" },
                  { label: "Good", pct: 23, color: "#2a78d6" },
                  { label: "Neutral", pct: 6, color: "#eda100" },
                  { label: "Poor", pct: 3, color: "#e34948" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-secondary)",
                        width: 56,
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        background: "var(--surface-0)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 3,
                          background: row.color,
                          width: `${row.pct}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        width: 28,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: "0.5px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  284 responses this month
                </span>
                <span
                  style={{ fontSize: 14, color: "#1baf7a", cursor: "pointer" }}
                >
                  View all ↗
                </span>
              </div>
            </div>
          </div>

          {/* Recent loans table */}
          <div
            style={{
              background: "#ffff",
              border: "0.5px solid var(--border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                Recent loan applications
              </span>
              <NavLink
                to="/admin/loans"
                style={{
                  fontSize: 11,
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                View all ↗
              </NavLink>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--surface-1)" }}>
                    {[
                      "Borrower",
                      "Amount",
                      "Purpose",
                      "Term",
                      "Date applied",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "8px 16px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#000000",
                          textAlign: "left",
                          textTransform: "uppercase",
                          letterSpacing: ".04em",
                          borderBottom: "0.5px solid var(--border)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(filtered.length > 0 ? filtered : loans.slice(0, 6)).map(
                    (loan, i) => {
                      const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
                      const pill = STATUS_PILL[loan.status] ?? {
                        label: loan.status,
                        cls: "pill-closed",
                      };
                      const pillStyles: Record<string, React.CSSProperties> = {
                        "pill-pending": {
                          background: "#FAAD1415",
                          color: "#92620A",
                          border: "0.5px solid #FAAD1440",
                        },
                        "pill-review": {
                          background: "rgba(0,201,167,.1)",
                          color: "#007A66",
                          border: "0.5px solid rgba(0,201,167,.3)",
                        },
                        "pill-approved": {
                          background: "#EAF3DE",
                          color: "#3B6D11",
                          border: "0.5px solid #C0DD97",
                        },
                        "pill-disbursed": {
                          background: "#E6F1FB",
                          color: "#185FA5",
                          border: "0.5px solid #B5D4F4",
                        },
                        "pill-closed": {
                          background: "var(--surface-1)",
                          color: "var(--text-muted)",
                          border: "0.5px solid var(--border)",
                        },
                        "pill-danger": {
                          background: "#FCEBEB",
                          color: "#A32D2D",
                          border: "0.5px solid #F7C1C1",
                        },
                      };
                      return (
                        <tr
                          key={loan.id}
                          style={{
                            borderBottom: "0.5px solid var(--border)",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "var(--surface-1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <td style={{ padding: "10px 16px" }}>
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
                                  borderRadius: "50%",
                                  background: "#ffff",
                                  color: '#000000',
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 10,
                                  fontWeight: 500,
                                  flexShrink: 0,
                                }}
                              >
                                {getInitials(`User ${i + 1}`)}
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#000000",
                                  }}
                                >
                                  Borrower {i + 1}
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "#000000",
                                  }}
                                >
                                  +265 9XX XXX XXX
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: 12,
                              fontWeight: 500,
                              color: "#000000",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatCurrency(Number(loan.amount))}
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: 12,
                              color: "var(--text-secondary)",
                              maxWidth: 140,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {loan.purpose}
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: 12,
                              color: "#000000",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {loan.termMonths} mo
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: 12,
                              color: "#000000",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatDate(loan.createdAt)}
                          </td>
                          <td style={{ padding: "10px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "3px 8px",
                                borderRadius: 99,
                                fontSize: 10,
                                fontWeight: 500,
                                ...pillStyles[pill.cls],
                              }}
                            >
                              <span
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: "50%",
                                  background: "#000000",
                                }}
                              />
                              {pill.label}
                            </span>
                          </td>
                        </tr>
                      );
                    },
                  )}
                  {loans.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "40px 16px",
                          textAlign: "center",
                          fontSize: 13,
                          color: "#000000",
                        }}
                      >
                        No loans yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media(max-width:1023px){
          .hide-mobile{display:none!important}
          .main-shift{margin-left:0!important}
          .menu-btn-admin{display:flex!important}
          div[style*="grid-template-columns: repeat(4"]{grid-template-columns:repeat(2,1fr)!important}
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
};
