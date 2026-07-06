import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  CreditCard,
  Bell,
  Star,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { getInitials } from "@/utils";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/loans", icon: FileText, label: "My Loans" },
  { to: "/transactions", icon: CreditCard, label: "Transactions" },
  { to: "/profile", icon: User, label: "Profile" },
];
const ADMIN_NAV = [{ to: "/admin/dashboard", icon: Shield, label: "Admin" }];

const SidebarLinks: React.FC<{ items: typeof NAV; onClick?: () => void }> = ({
  items,
  onClick,
}) => (
  <>
    {items.map(({ to, icon: Icon, label }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onClick}
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <Icon size={16} />
        {label}
      </NavLink>
    ))}
  </>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const isAdmin = user?.role === "SUPER_ADMIN" || user?.role === "LOAN_OFFICER";
  const allNav = isAdmin ? [...NAV, ...ADMIN_NAV] : NAV;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarInner = ({ onClose }: { onClose?: () => void }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="sidebar-logo">
        <div className="flex items-center gap-3">
          <div className="logo-mark">
            <span>LF</span>
          </div>
          <div>
            <div className="logo-name">LoanFlow</div>
            <div className="logo-sub">Financial Services</div>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <SidebarLinks items={allNav} onClick={onClose} />
      </nav>
      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">
            <span>{getInitials(user?.name ?? "U")}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="text-sm font-semibold text-text truncate">
              {user?.name}
            </div>
            <div className="text-xs text-silver truncate">
              {user?.role?.replace(/_/g, " ")}
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={15} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <SidebarInner />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="sidebar-overlay">
          <div className="sidebar-overlay-bg" onClick={() => setOpen(false)} />
          <aside className="sidebar-overlay-panel fade-in">
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "none",
                border: "none",
                color: "var(--silver)",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
            <SidebarInner onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="main-content">
        {/* Mobile top bar — now with profile icon and notification */}
        <header className="mobile-bar">
          <div className="flex items-center gap-3">
            <button className="menu-btn" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="logo-mark"
                style={{ width: 26, height: 26, borderRadius: 6 }}
              >
                <span style={{ fontSize: 9 }}>LF</span>
              </div>
              <span className="font-bold text-text" style={{ fontSize: 14 }}>
                LoanFlow
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--navy-lighter)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                color: "var(--silver)",
              }}
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--danger)",
                  border: "1.5px solid var(--navy-light)",
                }}
              />
            </button>
            {/* Profile avatar — links to profile page */}
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,201,167,0.12)",
                  border: "1.5px solid rgba(0,201,167,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {(user as any)?.avatarUrl ? (
                  <img
                    src={`http://localhost:3200${(user as any).avatarUrl}`}
                    alt={user?.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: "var(--teal)",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(user?.name ?? "U")}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </header>

        <div className="page-inner">{children}</div>

        {/* Mobile bottom nav */}
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {allNav.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `bottom-nav-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
