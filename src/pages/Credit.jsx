import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight, ShoppingCart, Banknote, TrendingUp, Users, AlertTriangle } from "lucide-react";

const DEBT_HISTORY = [
  { date: "14 JUL", icon: ShoppingCart, desc: "Milk (2) Fiado", amount: "B/. 8.00", status: "Pending" },
  { date: "12 JUL", icon: ShoppingCart, desc: "Rice (5 lb) Fiado", amount: "B/. 4.75", status: "Pending" },
  { date: "10 JUL", icon: Banknote, desc: "Partial payment", amount: "B/. 15.00", status: "Paid" },
  { date: "08 JUL", icon: ShoppingCart, desc: "Bread (3) Fiado", amount: "B/. 4.50", status: "Paid" },
  { date: "05 JUL", icon: ShoppingCart, desc: "Sugar (2 lb) Fiado", amount: "B/. 1.70", status: "Pending" },
];

const ACTIVITY = [
  { text: "Ramón Batista, Paid B/. 15.00", time: "Today" },
  { text: "Yolanda Pérez, New debt B/. 12.00", time: "Today" },
  { text: "Carlos Ruiz, Paid B/. 32.50", time: "Yesterday" },
];

function StatusBadge({ status }) {
  const map = {
    Paid: { bg: "var(--ok-bg)", color: "var(--ok-text)" },
    Pending: { bg: "var(--warn-bg)", color: "var(--warn-text)" },
    Overdue: { bg: "var(--bad-bg)", color: "var(--bad-text)" },
  };
  const s = map[status] || map.Pending;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

export default function Credit() {
  const [customer, setCustomer] = useState("Ramón Batista");
  const [payment, setPayment] = useState("B/. 0.00");
  const [paymentType, setPaymentType] = useState("partial");
  const [autoBlock, setAutoBlock] = useState(true);

  const used = 35;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--page-bg)" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: "Poppins" }}>
              Debts & Payments
            </h1>
            <p className="text-white/80 mt-2">Track all purchases and payments for every customer.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Column 1 - Customer */}
            <div className="space-y-5">
              {/* Customer select */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <label className="text-xs font-semibold tracking-wide block mb-2" style={{ color: "var(--text-muted)" }}>SELECT A CUSTOMER</label>
                <div className="relative">
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm font-semibold border outline-none"
                    style={{ backgroundColor: "var(--white)", borderColor: "var(--border-cream)", color: "var(--text)" }}
                  >
                    {["Ramón Batista", "Yolanda Pérez", "Carlos Ruiz", "Mireya Santos"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>

              {/* Customer info card */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <h2 className="font-bold text-xl mb-4" style={{ color: "var(--text)" }}>{customer}</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl p-3" style={{ backgroundColor: "var(--white)", border: "1px solid var(--border-cream)" }}>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Current Debt</p>
                    <p className="font-bold text-lg" style={{color: "var(--accent-text)" }}>B/. 35.00</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: "var(--white)", border: "1px solid var(--border-cream)" }}>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Credit Limit</p>
                    <p className="font-bold text-lg" style={{ color: "var(--text)" }}>B/. 100.00</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mb-1.5 flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{used}% used</span>
                  <span>Limit: B/. 100.00</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-cream)" }}>
                  <div className="h-full rounded-full" style={{ width: `${used}%`, backgroundColor: "#B91C1C" }} />
                </div>
              </div>

              {/* Auto blocking */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>Automatic Blocking</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      If a customer exceeds the debt limit, system prevents new credits.
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoBlock(!autoBlock)}
                    className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors"
                    style={{ backgroundColor: autoBlock ? "#B91C1C" : "var(--border-cream)" }}
                  >
                    <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: autoBlock ? "translateX(22px)" : "translateX(2px)" }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2 - Debt & Payment */}
            <div className="space-y-5">
              {/* Debt history */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Debt History</h2>
                </div>
                <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Track all purchases and payments.</p>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {DEBT_HISTORY.map((row, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--white)", border: "1px solid var(--border-cream)" }}>
                      <span className="text-xs font-semibold w-12" style={{ color: "var(--text-muted)" }}>{row.date}</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--warn-bg)" }}>
                        <row.icon className="w-4 h-4" style={{ color: "var(--warn-text)" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{row.desc}</p>
                      </div>
                      <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{row.amount}</span>
                      <StatusBadge status={row.status} />
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm font-semibold flex items-center gap-1" style={{color: "var(--accent-text)" }}>
                  View Full History <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Register payment */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text)" }}>Register Payment</h2>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-muted)" }}>Payment Amount</label>
                <input
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold border outline-none mb-4"
                  style={{ backgroundColor: "var(--white)", borderColor: "var(--border-cream)", color: "var(--text)" }}
                />
                <label className="text-xs font-semibold block mb-2" style={{ color: "var(--text-muted)" }}>Payment Type</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { key: "partial", label: "Partial Payment" },
                    { key: "full", label: "Full Payment" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setPaymentType(opt.key)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition"
                      style={{
                        backgroundColor: paymentType === opt.key ? "var(--warn-bg)" : "#FFFFFF",
                        borderColor: paymentType === opt.key ? "#F9D103" : "var(--border-cream)",
                        color: "var(--text)",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: paymentType === opt.key ? "#B91C1C" : "var(--border-cream)" }}>
                        {paymentType === opt.key && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#B91C1C" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 rounded-full font-bold text-sm" style={{ backgroundColor: "#F9D103", color: "var(--on-yellow)" }}>
                    Register Payment
                  </button>
                  <button className="flex-1 py-3 rounded-full font-bold text-sm border" style={{ backgroundColor: "var(--white)", color: "var(--text)", borderColor: "var(--border-cream)" }}>
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3 - Activity & Overview */}
            <div className="space-y-5">
              {/* Recent activity */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text)" }}>Recent Activity</h2>
                <div className="space-y-2">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: "var(--white)", border: "1px solid var(--border-cream)" }}>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{a.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{a.time}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm font-semibold flex items-center gap-1" style={{color: "var(--accent-text)" }}>
                  View all activity <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Debt overview */}
              <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--surface)" }}>
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text)" }}>Debt Overview</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Outstanding Debt", value: "B/. 480.00", icon: TrendingUp,color: "var(--accent-text)" },
                    { label: "Payments Today", value: "B/. 150.00", icon: Banknote, color: "#059669" },
                    { label: "Customers with Debt", value: "18", icon: Users, color: "var(--text)" },
                    { label: "Overdue", value: "4", icon: AlertTriangle,color: "var(--accent-text)" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: "var(--white)", border: "1px solid var(--border-cream)" }}>
                      <s.icon className="w-4 h-4 mb-1.5" style={{ color: s.color }} />
                      <p className="font-bold text-base" style={{ color: "var(--text)" }}>{s.value}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-white/70 text-sm mt-10">© 2026. Manage today for a better tomorrow.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}