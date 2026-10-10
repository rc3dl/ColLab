import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wallet, Package, Users, BarChart3, Mail, TrendingUp, Banknote, AlertTriangle, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Credit", path: "/credit", icon: Wallet, desc: "Manage customer debts and register payments." },
  { label: "Products", path: "/products", icon: Package, desc: "Keep your inventory exact and get restock alerts." },
  { label: "Clients", path: "/clients", icon: Users, desc: "Register customers and see who owes at a glance." },
  { label: "Reports", path: "/reports", icon: BarChart3, desc: "Track cash flow and business activity." },
  { label: "Contact", path: "/contact", icon: Mail, desc: "Get help and check the FAQs." },
];

const STATS = [
  { label: "Outstanding Debt", value: "B/. 480.00", icon: TrendingUp, color: "#B91C1C" },
  { label: "Payments Today", value: "B/. 150.00", icon: Banknote, color: "#059669" },
  { label: "Customers with Debt", value: "18", icon: Users, color: "#2D2926" },
  { label: "Overdue", value: "4", icon: AlertTriangle, color: "#B91C1C" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#B91C1C" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: "Poppins" }}>
              Welcome back 👋
            </h1>
            <p className="text-white/80 mt-2">
              Manage your fiado, manage your business. Here's your overview for today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {STATS.map((s) => (
              <div key={s.label} className="p-4 rounded-2xl" style={{ backgroundColor: "#FFFBEB" }}>
                <s.icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                <p className="font-bold text-xl" style={{ color: "#2D2926" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "#6B6357" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quick access */}
          <h2 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "Poppins" }}>
            Quick access
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.path}
                to={q.path}
                className="group p-5 rounded-2xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#FFFBEB" }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#B91C1C" }}>
                    <q.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base" style={{ color: "#2D2926" }}>{q.label}</h3>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#B91C1C" }} />
                    </div>
                    <p className="text-sm mt-1" style={{ color: "#6B6357" }}>{q.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}