import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui";
import { formatCurrency, formatDate } from "@/utils";
import api from "@/api/client";

const fetchTransactions = () =>
  api.get("/payments/my-transactions").then((r) => r.data);

export const Transactions: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: fetchTransactions,
  });
  const transactions: any[] = Array.isArray(data) ? data : (data?.data ?? []);

  const totalRepaid = transactions
    .filter((t) => t.type === "REPAYMENT")
    .reduce((s, t) => s + Number(t.amount), 0);

  const totalDisbursed = transactions
    .filter((t) => t.type === "DISBURSEMENT")
    .reduce((s, t) => s + Number(t.amount), 0);

  const TYPE_CONFIG: Record<
    string,
    { label: string; icon: React.ReactNode; color: string; bg: string }
  > = {
    REPAYMENT: {
      label: "Repayment",
      icon: <ArrowUpRight size={14} />,
      color: "#16A34A",
      bg: "#DCFCE7",
    },
    DISBURSEMENT: {
      label: "Disbursement",
      icon: <ArrowDownLeft size={14} />,
      color: "#2563EB",
      bg: "#DBEAFE",
    },
    PENALTY: {
      label: "Penalty",
      icon: <CreditCard size={14} />,
      color: "#DC2626",
      bg: "#FEE2E2",
    },
  };

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: "flex" }}>
      <div>
        <h1
          className="font-black"
          style={{ fontSize: 24, color: "var(--text)" }}
        >
          Transactions
        </h1>
        <p className="text-sm text-silver" style={{ marginTop: 3 }}>
          All your payments and disbursements
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="card">
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--silver)",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: 8,
            }}
          >
            Total repaid
          </p>
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#16A34A",
              margin: 0,
            }}
          >
            {formatCurrency(totalRepaid)}
          </p>
        </div>
        <div className="card">
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--silver)",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: 8,
            }}
          >
            Total received
          </p>
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "var(--blue)",
              margin: 0,
            }}
          >
            {formatCurrency(totalDisbursed)}
          </p>
        </div>
      </div>

      {/* Transaction list */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--navy-lighter)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
            All transactions
          </span>
        </div>

        {isLoading ? (
          <div
            style={{
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} style={{ height: 60, borderRadius: 8 }} />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center" }}>
            <CreditCard
              size={36}
              style={{ color: "var(--dim)", marginBottom: 10 }}
            />
            <p style={{ fontSize: 13, color: "var(--silver)", margin: 0 }}>
              No transactions yet
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--dim)",
                margin: 0,
                marginTop: 4,
              }}
            >
              Your payment history will appear here
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {transactions.map((tx: any, i: number) => {
              const cfg = TYPE_CONFIG[tx.type] ?? TYPE_CONFIG["REPAYMENT"];
              const isLast = i === transactions.length - 1;
              return (
                <div
                  key={tx.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 18px",
                    borderBottom: isLast
                      ? "none"
                      : "1px solid var(--navy-lighter)",
                    transition: "background .1s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "transparent")
                  }
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: cfg.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {cfg.label}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--silver)",
                        margin: 0,
                        marginTop: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tx.loan?.purpose ?? "—"} · Ref: {tx.reference}
                    </p>
                  </div>
                  {/* Date */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: cfg.color,
                        margin: 0,
                      }}
                    >
                      {tx.type === "REPAYMENT" ? "+" : ""}
                      {formatCurrency(Number(tx.amount))}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--dim)",
                        margin: 0,
                        marginTop: 2,
                      }}
                    >
                      {formatDate(tx.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
