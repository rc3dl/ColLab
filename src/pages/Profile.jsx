import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { User, Store, Mail, Phone, MapPin, LogOut, Save, Shield, Bell, Globe } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    full_name: "",
    store_name: "",
    phone: "",
    address: "",
    ruc: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || "",
        store_name: user.store_name || "",
        phone: user.phone || "",
        address: user.address || "",
        ruc: user.ruc || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.auth.updateMe(form);
      setSaved(true);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#B91C1C" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F9D103" }}>
              <span className="font-bold text-2xl" style={{ color: "#2D2926" }}>
                {(form.full_name || user?.email || "M").charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl" style={{ fontFamily: "Poppins" }}>
                {form.full_name || "Merchant profile"}
              </h1>
              <p className="text-white/80 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Profile info card */}
          <form onSubmit={handleSave} className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#FFFBEB" }}>
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "#2D2926" }}>
              <Store className="w-5 h-5" style={{ color: "#B91C1C" }} /> Business information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={User} label="Full name" name="full_name" value={form.full_name} onChange={handleChange} />
              <Field icon={Store} label="Store name" name="store_name" value={form.store_name} onChange={handleChange} />
              <Field icon={Phone} label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Field icon={Mail} label="RUC / ID" name="ruc" value={form.ruc} onChange={handleChange} />
              <div className="sm:col-span-2">
                <Field icon={MapPin} label="Address" name="address" value={form.address} onChange={handleChange} />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-60"
                style={{ backgroundColor: "#B91C1C", color: "#FFFFFF" }}
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save changes"}
              </button>
              {saved && <span className="text-sm font-medium" style={{ color: "#059669" }}>Saved ✓</span>}
            </div>
          </form>

          {/* Account settings */}
          <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#FFFBEB" }}>
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "#2D2926" }}>
              <Shield className="w-5 h-5" style={{ color: "#B91C1C" }} /> Account settings
            </h2>
            <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <SettingRow icon={Mail} title="Email" value={user?.email} />
              <SettingRow icon={Shield} title="Role" value={user?.role || "user"} />
              <SettingRow icon={Bell} title="Notifications" value="Enabled" />
              <SettingRow icon={Globe} title="Language" value="Spanish (ES)" />
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl p-6 flex items-center justify-between" style={{ backgroundColor: "#FFFBEB" }}>
            <div>
              <h2 className="font-bold text-lg" style={{ color: "#2D2926" }}>Close session</h2>
              <p className="text-sm" style={{ color: "#6B6357" }}>Sign out of your account on this device.</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#B91C1C", color: "#FFFFFF" }}
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>

          <div className="mt-6">
            <Link to="/dashboard" className="text-white/80 text-sm font-medium hover:text-white">
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({ icon: Icon, label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold mb-1.5 block" style={{ color: "#6B6357" }}>{label}</span>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)" }}>
        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "#B91C1C" }} />
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#2D2926" }}
        />
      </div>
    </label>
  );
}

function SettingRow({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" style={{ color: "#B91C1C" }} />
        <span className="text-sm font-medium" style={{ color: "#2D2926" }}>{title}</span>
      </div>
      <span className="text-sm" style={{ color: "#6B6357" }}>{value}</span>
    </div>
  );
}