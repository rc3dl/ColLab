import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Send, Moon, Calendar } from "lucide-react";

const CLIENTS = [
  { initials: "RB", name: "Ramón Batista", phone: "6123-4567", purchases: 14, debt: "B/. 35.00", status: "Pending" },
  { initials: "YP", name: "Yolanda Pérez", phone: "6234-8890", purchases: 22, debt: "—", status: "On Time" },
  { initials: "CR", name: "Carlos Ruiz", phone: "6301-2245", purchases: 9, debt: "B/. 62.50", status: "Overdue" },
  { initials: "MS", name: "Mireya Santos", phone: "6415-7783", purchases: 31, debt: "B/. 12.00", status: "Pending" },
];

const FILTERS = ["All", "On Time", "Pending", "Overdue"];

function StatusBadge({ status }) {
  const map = {
    "On Time": { bg: "var(--ok-bg)", color: "var(--ok-text)" },
    Pending: { bg: "var(--warn-bg)", color: "var(--warn-text)" },
    Overdue: { bg: "var(--bad-bg)", color: "var(--bad-text)" },
  };
  const s = map[status];
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

export default function Clients() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = CLIENTS.filter((c) => {
    const matchFilter = filter === "All" || c.status === filter;
    const matchQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query);
    return matchFilter && matchQuery;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--page-bg)" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-bold text-3xl sm:text-4xl mb-2" style={{ color: "var(--text)", fontFamily: "Poppins" }}>
                Client Management
              </h1>
              <h2 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                Each client, with a clear account
              </h2>
              <p className="text-sm max-w-lg" style={{ color: "var(--text-muted)" }}>
                Register your customers in seconds and see at a glance who is up to date, who owes, and who to remind.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-cream)" }}>
                <Calendar className="w-4 h-4" style={{ color: "var(--text)" }} />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-cream)" }}>
                <Moon className="w-4 h-4" style={{ color: "var(--text)" }} />
              </button>
            </div>
          </div>

          {/* Dashboard module */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl p-6" style={{ backgroundColor: "var(--white)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-faint)" }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="🔍 Search client by name or phone..."
                  className="w-full rounded-full pl-11 pr-4 py-2.5 text-sm border outline-none"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-cream)", color: "var(--text)" }}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-5">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold transition"
                    style={{
                      backgroundColor: filter === f ? "#B91C1C" : "var(--surface)",
                      color: filter === f ? "#FFFFFF" : "var(--text)",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)", borderBottom: "1px solid var(--border-cream)" }}>
                      <th className="pb-3 pr-2">CLIENT</th>
                      <th className="pb-3 pr-2">PURCHASES</th>
                      <th className="pb-3 pr-2">PENDING DEBT</th>
                      <th className="pb-3 pr-2">STATUS</th>
                      <th className="pb-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.name} style={{ borderBottom: "1px solid var(--border-cream)" }}>
                        <td className="py-3 pr-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#B91C1C" }}>
                              {c.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{c.name}</p>
                              <p className="text-xs" style={{ color: "var(--text-faint)" }}>{c.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-2 text-sm" style={{ color: "var(--text-muted)" }}>{c.purchases} purchases</td>
                        <td className="py-3 pr-2 text-sm font-semibold" style={{ color: c.debt === "—" ? "var(--text-faint)" : "#B91C1C" }}>{c.debt}</td>
                        <td className="py-3 pr-2"><StatusBadge status={c.status} /></td>
                        <td className="py-3">
                          <button className="text-sm font-semibold flex items-center gap-1" style={{color: "var(--accent-text)" }}>
                            View detail <span>→</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Reminder module */}
              <div className="mt-6 p-5 rounded-2xl" style={{ backgroundColor: "var(--warn-bg)" }}>
                <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>Automatic Reminder Sent</h3>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  WhatsApp to Ramón Batista: "Hello Ramón, you have B/. 35.00 pending in Minisúper Doña Chela. See you soon!"
                </p>
                <button className="px-5 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: "var(--btn-solid)" }}>
                  <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Send</span>
                </button>
              </div>
            </div>

            {/* Side card - Friendly Collections */}
            <div className="rounded-3xl p-6 h-fit" style={{ backgroundColor: "var(--white)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text)" }}>Friendly Collections</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Keep track of pending payments and send friendly reminders — no awkward conversations.
              </p>
              <div className="space-y-2">
                {[
                  { name: "Ramón Batista", amount: "B/. 35.00", days: "2 days" },
                  { name: "Carlos Ruiz", amount: "B/. 62.50", days: "5 days" },
                  { name: "Mireya Santos", amount: "B/. 12.00", days: "1 day" },
                ].map((r) => (
                  <div key={r.name} className="p-3 rounded-xl" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-cream)" }}>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.name}</p>
                      <span className="text-sm font-bold" style={{color: "var(--accent-text)" }}>{r.amount}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Pending for {r.days}</p>
                  </div>
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