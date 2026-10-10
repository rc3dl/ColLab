import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "Does it work without internet?",
    a: "Yes. The Phase 3 mobile application is being built with offline functionality, so you can register fiados and payments even without a connection — everything syncs once you're back online.",
  },
  {
    q: "How to start using the app?",
    a: "Simply sign up, add your customers, and start registering debts and payments. No training needed — if you know how to use a notebook, you know how to use FIA'O.",
  },
  {
    q: "Do payment reminders arrive automatically?",
    a: "Yes. FIA'O's Friendly Collections feature sends automatic WhatsApp reminders to customers with pending balances, so you never have to ask in person.",
  },
  {
    q: "Can I export my reports?",
    a: "Absolutely. You can export your financial reports as PDF or Excel directly from the Reports page, anytime.",
  },
  {
    q: "What if a customer doesn't pay?",
    a: "FIA'O tracks overdue accounts and can automatically block new credits for customers who exceed their debt limit, protecting your business.",
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-sm sm:text-base" style={{ color: "#2D2926" }}>{item.q}</span>
        <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-3" style={{ backgroundColor: "#FFFBEB" }}>
          <Plus className={`w-4 h-4 transition-transform ${open ? "rotate-45" : ""}`} style={{ color: "#B91C1C" }} />
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-relaxed" style={{ color: "#6B6357" }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#B91C1C" }}>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: "#FFFFFF", fontFamily: "Poppins" }}>
              Have questions? We are here to help
            </h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Check out the FAQs below or open the chat anytime for instant support.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* FAQ */}
            <div className="space-y-3">
              {FAQS.map((f) => (
                <FaqItem key={f.q} item={f} />
              ))}
            </div>

            {/* Contact form */}
            <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
              <h2 className="font-bold text-xl mb-5" style={{ color: "#2D2926" }}>Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6B6357" }}>NAME</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
                    style={{ backgroundColor: "#FFFBEB", borderColor: "#E5DDB8", color: "#2D2926" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6B6357" }}>EMAIL</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="yourcorreo@example.com"
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
                    style={{ backgroundColor: "#FFFBEB", borderColor: "#E5DDB8", color: "#2D2926" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6B6357" }}>MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help you"
                    required
                    rows={5}
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none resize-none"
                    style={{ backgroundColor: "#FFFBEB", borderColor: "#E5DDB8", color: "#2D2926" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-sm text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: "#B91C1C" }}
                >
                  {sent ? "Message sent ✓" : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Floating chat */}
        <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-transform hover:scale-110" style={{ backgroundColor: "#2D2926" }}>
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </main>

      <Footer />
    </div>
  );
}