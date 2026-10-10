import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, Globe, Moon, Sun, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

const NAV_ITEMS = [
  { label: "Home", path: "/", authPath: "/dashboard" },
  { label: "Credit", path: "/credit", authPath: "/credit" },
  { label: "Products", path: "/products", authPath: "/products" },
  { label: "Clients", path: "/clients", authPath: "/clients" },
  { label: "Reports", path: "/reports", authPath: "/reports" },
  { label: "Contact", path: "/contact", authPath: "/contact" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-0.5 select-none">
      <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "Poppins" }}>
        FIA'
      </span>
      <span className="relative inline-flex items-center justify-center w-6 h-6">
        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#F9D103" }} />
        <span className="relative text-white font-bold text-xl" style={{ fontFamily: "Poppins" }}>O</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const homePath = isAuthenticated ? "/dashboard" : "/";

  return (
    <header className="w-full" style={{ backgroundColor: "#B91C1C" }}>
      {/* Floating nav */}
      <div className="px-3 sm:px-6 pb-4">
        <nav className="mx-auto max-w-6xl rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg"
          style={{ backgroundColor: "#B91C1C", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
          <Logo />

          {isAuthenticated ? (
            <>
              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const target = item.label === "Home" ? homePath : item.path;
                  const active = location.pathname === target;
                  return (
                    <Link
                      key={item.path}
                      to={target}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                      style={{
                        backgroundColor: active ? "#F9D103" : "rgba(249,209,3,0.12)",
                        color: active ? "#2D2926" : "#FFFFFF",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Utility icons (desktop) */}
              <div className="hidden lg:flex items-center gap-3">
                <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition" aria-label="Notifications">
                  <Bell className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: "#F9D103", color: "#2D2926" }}>3</span>
                </button>
                <button className="px-2 py-1 rounded-full text-xs font-semibold text-white hover:bg-white/10 transition" aria-label="Language">ES</button>
                <button
                  onClick={toggleTheme}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
                </button>
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition"
                  aria-label="Profile"
                >
                  <UserCircle className="w-5 h-5 text-white" />
                </Link>
              </div>

              {/* Mobile toggle */}
              <button
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-white"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ backgroundColor: "#F9D103", color: "#2D2926" }}
            >
              Log in
            </Link>
          )}
        </nav>

        {/* Mobile menu */}
        {open && isAuthenticated && (
          <div className="lg:hidden mx-auto max-w-6xl mt-2 rounded-2xl p-3 flex flex-col gap-1.5" style={{ backgroundColor: "#B91C1C" }}>
            {NAV_ITEMS.map((item) => {
              const target = item.label === "Home" ? homePath : item.path;
              const active = location.pathname === target;
              return (
                <Link
                  key={item.path}
                  to={target}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-full text-sm font-semibold text-center"
                  style={{
                    backgroundColor: active ? "#F9D103" : "rgba(255,255,255,0.08)",
                    color: active ? "#2D2926" : "#FFFFFF",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}