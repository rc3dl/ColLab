import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Moon, FileText, FileSpreadsheet, TrendingUp, TrendingDown, Users, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CHART_DATA = [
  { week: "Week 1", "Credit issued": 320, "Payments Received": 280, Overdue: 40 },
  { week: "Week 2", "Credit issued": 410, "Payments Received": 360, Overdue: 50 },
  { week: "Week 3", "Credit issued": 380, "Payments Received": 420, Overdue: 30 },
  { week: "Week 4", "Credit issued": 450, "Payments Received": 390, Overdue: 60 },
];

const TRANSACTIONS = [
  { name: "Maria Gomez", desc: "Grocery items & supplies", amount: "$45.00", date: "2026-07-28", status: "On Time" },
  { name: "Carlos Mendoza", desc: "Weekly hardware credit", amount: "$120.00", date: "2026-07-25", status: "Pending" },
  { name: "Ana Ruiz", desc: "Bakery stock order", amount: "$85.50", date: "2026-07-18", status: "Overdue" },
];

function StatusBadge({ status }) {
  const map = {
    "On Time": { bg: "#D1FAE5", color: "#065F46" },
    Pending: { bg: "#FEF3C7", color: "#92400E" },
    Overdue: { bg: "#FEE2E2", color: "#991B1B" },
  };
  const s = map[status];
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

export default function Reports() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#B91C1C" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "#FFFBEB" }}>
            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl sm:text-3xl" style={{ color: "#2D2926", fontFamily: "Poppins" }}>
                  FIA'O Reports
                </h1>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                  <Calendar className="w-4 h-4" style={{ color: "#2D2926" }} />
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                  <Moon className="w-4 h-4" style={{ color: "#2D2926" }} />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white" style={{ border: "1px solid #2D2926", color: "#2D2926" }}>
                  <FileText className="w-4 h-4" /> Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white" style={{ border: "1px solid #2D2926", color: "#2D2926" }}>
                  <FileSpreadsheet className="w-4 h-4" /> Export Excel
                </button>
              </div>
            </div>
            <p className="text-sm mb-6" style={{ color: "#6B6357" }}>
              Financial tracking, credit summaries, and business analytics overview.
            </p>

            {/* Filters */}
            <div className="grid sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6B6357" }}>DATE RANGE</label>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 rounded-lg px-2 py-2 text-sm border outline-none" style={{ borderColor: "#E5DDB8", color: "#2D2926" }} />
                  <input type="date" className="flex-1 rounded-lg px-2 py-2 text-sm border outline-none" style={{ borderColor: "#E5DDB8", color: "#2D2926" }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6B6357" }}>CUSTOMER STATUS / NAME</label>
                <select className="w-full rounded-lg px-3 py-2 text-sm border outline-none" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DDB8", color: "#2D2926" }}>
                  <option>All Customers (All Names)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full py-2.5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: "#2D2926" }}>
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label: "TOTAL ACTIVE CREDIT", value: "$1,450.00", trend: "+8.4% from last month", up: true, icon: Wallet },
                { label: "COLLECTED THIS MONTH", value: "$3,120.50", trend: "+12.7% efficiency", up: true, icon: TrendingUp },
                { label: "PENDING BALANCES", value: "$340.00", trend: "-3 accounts overdue", up: false, icon: TrendingDown },
                { label: "TOTAL CUSTOMERS", value: "48", trend: "+5 new this month", up: true, icon: Users },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                  <div className="flex items-center justify-between mb-2">
                    <s.icon className="w-4 h-4" style={{ color: "#B91C1C" }} />
                  </div>
                  <p className="text-[11px] font-semibold tracking-wide mb-1" style={{ color: "#6B6357" }}>{s.label}</p>
                  <p className="font-bold text-xl mb-1" style={{ color: "#2D2926" }}>{s.value}</p>
                  <p className="text-xs font-semibold" style={{ color: s.up ? "#059669" : "#B91C1C" }}>{s.trend}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#2D2926" }}>Credit Activity & Payments Flow</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={CHART_DATA} barGap={4}>
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6B6357" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#6B6357" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid #F0E6C5" }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                    <Bar dataKey="Credit issued" fill="#B91C1C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Payments Received" fill="#F9D103" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Overdue" fill="#FCA5A5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-5 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#2D2926" }}>Payment Status Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: "On Time", pct: 75, amount: "$2,340", color: "#10B981" },
                    { label: "Pending", pct: 17, amount: "$540", color: "#F9D103" },
                    { label: "Overdue", pct: 8, amount: "$240", color: "#EF4444" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-semibold" style={{ color: "#2D2926" }}>{b.label} ({b.pct}%)</span>
                        <span style={{ color: "#6B6357" }}>{b.amount}</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#F0E6C5" }}>
                        <div className="h-full rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions table */}
            <div className="p-5 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#2D2926" }}>Recent Credit Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold tracking-wide" style={{ color: "#9A8F7A", borderBottom: "1px solid #F0E6C5" }}>
                      <th className="pb-3 pr-3">Customer Name</th>
                      <th className="pb-3 pr-3">Description</th>
                      <th className="pb-3 pr-3">Amount</th>
                      <th className="pb-3 pr-3">Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACTIONS.map((t) => (
                      <tr key={t.name} style={{ borderBottom: "1px solid #F7F1DC" }}>
                        <td className="py-3 pr-3 text-sm font-semibold" style={{ color: "#2D2926" }}>{t.name}</td>
                        <td className="py-3 pr-3 text-sm" style={{ color: "#6B6357" }}>{t.desc}</td>
                        <td className="py-3 pr-3 text-sm font-bold" style={{ color: "#B91C1C" }}>{t.amount}</td>
                        <td className="py-3 pr-3 text-sm" style={{ color: "#6B6357" }}>{t.date}</td>
                        <td className="py-3"><StatusBadge status={t.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-5">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className="w-8 h-8 rounded-full text-sm font-semibold transition"
                    style={{
                      backgroundColor: page === n ? "#B91C1C" : "#FFFBEB",
                      color: page === n ? "#FFFFFF" : "#2D2926",
                      border: "1px solid #F0E6C5",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}