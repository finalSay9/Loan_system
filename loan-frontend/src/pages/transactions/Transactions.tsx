
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  RotateCcw,
} from "lucide-react";

import { Skeleton } from "@/components/ui";
import { formatCurrency, formatDate } from "@/utils";
import api from "@/api/client";

interface PaymentAllocation {
  id: string;
  transactionId: string;
  scheduleId: string;
  principalAmount: string | number;
  interestAmount: string | number;
  feeAmount: string | number;
  penaltyAmount: string | number;
  createdAt: string;
  schedule?: {
    installmentNumber: number;
    dueDate: string;
  };
}

interface TransactionLoan {
  id: string;
  purpose: string;
  amount: string | number;
}

type TransactionType =
  | "DISBURSEMENT"
  | "REPAYMENT"
  | "PENALTY"
  | "FEE"
  | "REFUND"
  | "ADJUSTMENT";

interface Transaction {
  id: string;
  loanId: string;
  type: TransactionType;
  amount: string | number;
  reference: string;
  providerRef?: string | null;
  createdAt: string;
  loan?: TransactionLoan;
  allocations?: PaymentAllocation[];
}

interface TransactionsResponse {
  data?: Transaction[];
}

const fetchTransactions = async (): Promise<
  Transaction[] | TransactionsResponse
> => {
  const response = await api.get("/payments/my-transactions");
  return response.data;
};

const normalizeTransactions = (
  data: Transaction[] | TransactionsResponse | undefined,
): Transaction[] => {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    Array.isArray(data.data)
  ) {
    return data.data;
  }

  return [];
};

const TYPE_CONFIG: Record<
  TransactionType,
  {
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }
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

  FEE: {
    label: "Fee",
    icon: <Receipt size={14} />,
    color: "#D97706",
    bg: "#FEF3C7",
  },

  REFUND: {
    label: "Refund",
    icon: <RotateCcw size={14} />,
    color: "#7C3AED",
    bg: "#EDE9FE",
  },

  ADJUSTMENT: {
    label: "Adjustment",
    icon: <CreditCard size={14} />,
    color: "#64748B",
    bg: "#E2E8F0",
  },
};

export const Transactions: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: fetchTransactions,
  });

  const transactions = normalizeTransactions(data);

  /**
   * Total amount repaid by the borrower.
   */
  const totalRepaid = transactions
    .filter((transaction) => transaction.type === "REPAYMENT")
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0,
    );

  /**
   * Total amount disbursed to the borrower.
   */
  const totalDisbursed = transactions
    .filter(
      (transaction) =>
        transaction.type === "DISBURSEMENT",
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0,
    );

  return (
    <div
      className="flex-col gap-6 fade-in"
      style={{ display: "flex" }}
    >
      {/* Header */}
      <div>
        <h1
          className="font-black"
          style={{
            fontSize: 24,
            color: "var(--text)",
          }}
        >
          Transactions
        </h1>

        <p
          className="text-sm text-silver"
          style={{ marginTop: 3 }}
        >
          All your payments and disbursements
        </p>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
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
      <div
        className="card"
        style={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom:
              "1px solid var(--navy-lighter)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            All transactions
          </span>
        </div>

        {/* Loading */}
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
              <Skeleton
                key={i}
                style={{
                  height: 60,
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
            }}
          >
            <CreditCard
              size={36}
              style={{
                color: "var(--dim)",
                marginBottom: 10,
              }}
            />

            <p
              style={{
                fontSize: 13,
                color: "var(--silver)",
                margin: 0,
              }}
            >
              Unable to load transactions
            </p>

            <p
              style={{
                fontSize: 11,
                color: "var(--dim)",
                margin: 0,
                marginTop: 4,
              }}
            >
              Please try again later.
            </p>
          </div>
        ) : transactions.length === 0 ? (
          /* Empty state */
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
            }}
          >
            <CreditCard
              size={36}
              style={{
                color: "var(--dim)",
                marginBottom: 10,
              }}
            />

            <p
              style={{
                fontSize: 13,
                color: "var(--silver)",
                margin: 0,
              }}
            >
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
          /* Transactions */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {transactions.map(
              (transaction, index) => {
                const config =
                  TYPE_CONFIG[transaction.type];

                const isLast =
                  index ===
                  transactions.length - 1;

                const isIncoming =
                  transaction.type ===
                    "DISBURSEMENT" ||
                  transaction.type ===
                    "REFUND";

                return (
                  <div
                    key={transaction.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 18px",
                      borderBottom: isLast
                        ? "none"
                        : "1px solid var(--navy-lighter)",
                      transition:
                        "background .1s",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background =
                        "transparent";
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background:
                          config.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color:
                            config.color,
                        }}
                      >
                        {config.icon}
                      </span>
                    </div>

                    {/* Information */}
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--text)",
                          margin: 0,
                        }}
                      >
                        {config.label}
                      </p>

                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--silver)",
                          margin: 0,
                          marginTop: 2,
                          overflow: "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {transaction.loan
                          ?.purpose ?? "—"}{" "}
                        · Ref:{" "}
                        {transaction.reference}
                      </p>
                    </div>

                    {/* Amount + date */}
                    <div
                      style={{
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            config.color,
                          margin: 0,
                        }}
                      >
                        {isIncoming
                          ? "+"
                          : "-"}
                        {formatCurrency(
                          Number(
                            transaction.amount,
                          ),
                        )}
                      </p>

                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--dim)",
                          margin: 0,
                          marginTop: 2,
                        }}
                      >
                        {formatDate(
                          transaction.createdAt,
                        )}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
};
