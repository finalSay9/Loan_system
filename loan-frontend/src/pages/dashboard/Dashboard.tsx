import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  X,
  CreditCard,
} from "lucide-react";
import { StatCard, Badge, Skeleton, Button, Modal } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import { getMyLoans } from "@/api";
import { formatCurrency, formatDate, loanStatusConfig } from "@/utils";
import type { LoanStatus } from "@/types";
import api from "@/api/client";
import toast from "react-hot-toast";

// ── Feedback Modal ────────────────────────────────────────
const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      api.post("/feedback", { rating, comment: comment || undefined }),
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      qc.invalidateQueries({ queryKey: ["satisfaction"] });
      setRating(0);
      setComment("");
      onClose();
    },
    onError: () => toast.error("Failed to submit feedback"),
  });

  const labels: Record<number, string> = {
    1: "Poor — very unsatisfied",
    2: "Neutral — could be better",
    3: "Good — satisfied",
    4: "Excellent — very satisfied",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share your feedback">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <p style={{ fontSize: 13, color: "var(--silver)", margin: 0 }}>
          How would you rate your experience with LoanFlow? Your feedback helps
          us improve.
        </p>

        {/* Star rating */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  transition: "transform .1s",
                  transform:
                    (hovered || rating) >= s ? "scale(1.15)" : "scale(1)",
                }}
              >
                <Star
                  size={32}
                  fill={(hovered || rating) >= s ? "#FAAD14" : "none"}
                  color={(hovered || rating) >= s ? "#FAAD14" : "var(--dim)"}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          {(hovered || rating) > 0 && (
            <p
              style={{
                fontSize: 13,
                color: "#FAAD14",
                fontWeight: 500,
                margin: 0,
              }}
            >
              {labels[hovered || rating]}
            </p>
          )}
        </div>

        {/* Comment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--silver)",
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Comment (optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Tell us more about your experience…"
            style={{
              width: "100%",
              background: "var(--navy-lighter)",
              border: "1.5px solid var(--navy-lighter)",
              borderRadius: 8,
              padding: "10px 12px",
              color: "var(--text)",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              resize: "none",
              transition: "border-color .15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--navy-lighter)")}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={() => mutate()}
            loading={isPending}
            disabled={rating === 0}
            style={{ flex: 1 }}
          >
            Submit feedback
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// ── Payment Modal ─────────────────────────────────────────
const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  loans: any[];
}> = ({ isOpen, onClose, loans }) => {
  const qc = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState(`REF-${Date.now()}`);

  const activeLoans = loans.filter((l) => l.status === "DISBURSED");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      api.post("/payments/repay", {
        loanId: selectedLoan,
        amount: Number(amount),
        reference,
      }),
    onSuccess: () => {
      toast.success("Payment recorded successfully!");
      qc.invalidateQueries({ queryKey: ["my-loans"] });
      qc.invalidateQueries({ queryKey: ["my-transactions"] });
      setSelectedLoan("");
      setAmount("");
      onClose();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message ?? "Payment failed"),
  });

  const selectedLoanData = loans.find((l) => l.id === selectedLoan);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Make a repayment">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 13, color: "var(--silver)", margin: 0 }}>
          Select an active loan and enter the amount you want to repay.
        </p>

        {activeLoans.length === 0 ? (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "var(--navy-lighter)",
              borderRadius: 10,
            }}
          >
            <CreditCard
              size={28}
              style={{ color: "var(--dim)", marginBottom: 8 }}
            />
            <p style={{ fontSize: 13, color: "var(--silver)", margin: 0 }}>
              No active loans to repay
            </p>
          </div>
        ) : (
          <>
            {/* Loan selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--silver)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                Select loan
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {activeLoans.map((loan) => (
                  <button
                    key={loan.id}
                    type="button"
                    onClick={() => setSelectedLoan(loan.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1.5px solid ${selectedLoan === loan.id ? "var(--teal)" : "var(--navy-lighter)"}`,
                      background:
                        selectedLoan === loan.id
                          ? "rgba(0,201,167,0.08)"
                          : "var(--navy-lighter)",
                      cursor: "pointer",
                      transition: "all .15s",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {formatCurrency(Number(loan.amount))}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--silver)",
                          marginTop: 2,
                        }}
                      >
                        {loan.purpose}
                      </div>
                    </div>
                    {selectedLoan === loan.id && (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "var(--teal)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            color: "#0a1420",
                            fontSize: 11,
                            fontWeight: 900,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--silver)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                Amount (MWK)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to repay"
                style={{
                  width: "100%",
                  background: "var(--navy-lighter)",
                  border: "1.5px solid var(--navy-lighter)",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--navy-lighter)")
                }
              />
              {selectedLoanData && (
                <p style={{ fontSize: 11, color: "var(--silver)", margin: 0 }}>
                  Loan amount: {formatCurrency(Number(selectedLoanData.amount))}
                </p>
              )}
            </div>

            {/* Reference */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--silver)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                Payment reference
              </label>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--navy-lighter)",
                  border: "1.5px solid var(--navy-lighter)",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontSize: 13,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="outline" onClick={onClose} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button
                onClick={() => mutate()}
                loading={isPending}
                disabled={!selectedLoan || !amount || Number(amount) <= 0}
                style={{ flex: 1 }}
              >
                <CreditCard size={14} /> Pay now
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

// ── Dashboard ─────────────────────────────────────────────
export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["my-loans"],
    queryFn: () => getMyLoans(),
  });
  const loans = data?.data ?? [];
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const totalBorrowed = loans
    .filter((l) => ["DISBURSED", "CLOSED"].includes(l.status))
    .reduce((s, l) => s + Number(l.amount), 0);
  const activeLoans = loans.filter((l) => l.status === "DISBURSED").length;
  const pendingLoans = loans.filter((l) =>
    ["PENDING", "UNDER_REVIEW"].includes(l.status),
  ).length;
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex-col gap-6 fade-in" style={{ display: "flex" }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-silver">{greeting}</p>
          <h1
            className="font-black"
            style={{ fontSize: 26, color: "var(--text)", marginTop: 2 }}
          >
            {user?.name?.split(" ")[0]} 👋
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFeedbackOpen(true)}
          >
            <Star size={13} /> Feedback
          </Button>
          <Link to="/loans/apply">
            <Button size="sm">
              <PlusCircle size={13} /> Apply
            </Button>
          </Link>
        </div>
      </div>

      {/* KYC warning */}
      {user?.kycStatus === "PENDING" && (
        <div className="alert alert-warning">
          <Clock size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <p className="text-sm font-semibold">KYC verification pending</p>
            <p className="text-xs text-silver mt-1">
              Your identity is being verified. Disbursements are on hold until
              complete.
            </p>
          </div>
        </div>
      )}

      {/* Active loan repayment prompt */}
      {activeLoans > 0 && (
        <div
          style={{
            background: "rgba(0,201,167,0.08)",
            border: "1px solid rgba(0,201,167,0.25)",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CreditCard
              size={18}
              style={{ color: "var(--teal)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                You have {activeLoans} active loan{activeLoans > 1 ? "s" : ""}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--silver)",
                  margin: 0,
                  marginTop: 2,
                }}
              >
                Make a repayment to keep your account in good standing
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => setPaymentOpen(true)}>
            <CreditCard size={13} /> Make payment
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          label="Total Borrowed"
          value={totalBorrowed > 0 ? formatCurrency(totalBorrowed) : "—"}
          sub="All time"
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Active Loans"
          value={String(activeLoans)}
          sub="Currently disbursed"
          accent="var(--blue)"
          icon={<CheckCircle size={16} />}
        />
        <div style={{ gridColumn: "span 2" }}>
          <StatCard
            label="Pending Review"
            value={String(pendingLoans)}
            sub="Awaiting decision"
            accent="var(--warning)"
            icon={<Clock size={16} />}
          />
        </div>
      </div>

      {/* Recent loans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold" style={{ color: "var(--text)" }}>
            Recent Loans
          </span>
          <Link
            to="/loans"
            style={{
              color: "var(--teal)",
              textDecoration: "none",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex-col gap-3" style={{ display: "flex" }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} style={{ height: 76, borderRadius: 10 }} />
            ))}
          </div>
        ) : loans.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: "center", padding: "40px 20px" }}
          >
            <p className="text-silver text-sm">No loans yet</p>
            <p className="text-xs text-dim mt-1 mb-4">
              Apply for your first loan to get started
            </p>
            <Link to="/loans/apply">
              <Button size="sm">
                <PlusCircle size={14} /> Apply now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex-col gap-3" style={{ display: "flex" }}>
            {loans.slice(0, 5).map((loan) => {
              const cfg = loanStatusConfig[loan.status as LoanStatus];
              return (
                <Link
                  key={loan.id}
                  to={`/loans/${loan.id}`}
                  className="loan-card loan-card-left"
                  style={{ borderLeftColor: cfg.color }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        className="font-bold text-text"
                        style={{ fontSize: 15 }}
                      >
                        {formatCurrency(Number(loan.amount))}
                      </p>
                      <p className="text-sm text-silver truncate mt-1">
                        {loan.purpose}
                      </p>
                      <p className="text-xs text-dim mt-1">
                        {formatDate(loan.createdAt)}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <Badge
                        status={loan.status}
                        label={cfg.label}
                        color={cfg.color}
                        bg={cfg.bg}
                        border={cfg.border}
                      />
                      <span className="text-xs text-dim">
                        {loan.termMonths}mo
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Transactions link */}
      <Link to="/transactions" style={{ textDecoration: "none" }}>
        <div
          style={{
            background: "var(--navy-light)",
            border: "1px solid var(--navy-lighter)",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "border-color .15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "rgba(0,201,167,0.3)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "var(--navy-lighter)")
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "rgba(0,201,167,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={16} style={{ color: "var(--teal)" }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Transaction history
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--silver)",
                  margin: 0,
                  marginTop: 1,
                }}
              >
                View all your payments and repayments
              </p>
            </div>
          </div>
          <ArrowRight
            size={15}
            style={{ color: "var(--dim)", flexShrink: 0 }}
          />
        </div>
      </Link>

      {/* Modals */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        loans={loans}
      />
    </div>
  );
};
