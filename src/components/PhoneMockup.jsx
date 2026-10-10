import React from "react";

// A CSS-built smartphone mockup showing the FIA'O app interface, matching the hero reference.
export default function PhoneMockup() {
  const debts = [
    { initial: "J", name: "Jonn Perez", amount: "$45.00" },
    { initial: "A", name: "Ana Torres", amount: "$120.00" },
    { initial: "P", name: "Pedro Buiz", amount: "$32.50" },
    { initial: "P", name: "Pedro Puiz", amount: "$32.50" },
  ];

  return (
    <div className="relative mx-auto" style={{ width: "280px" }}>
      {/* Phone frame */}
      <div className="rounded-[2.5rem] p-2.5 shadow-2xl" style={{ backgroundColor: "#1A1A1A", boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }}>
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden" style={{ backgroundColor: "#FFFFFF", height: "540px" }}>
          {/* Notch */}
          <div className="relative flex justify-center pt-2">
            <div className="absolute top-1.5 w-20 h-1.5 rounded-full bg-black/80" />
          </div>

          {/* App header */}
          <div className="px-5 pt-6 pb-4" style={{ backgroundColor: "#B91C1C" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "Poppins" }}>FIA'</span>
                <span className="relative inline-flex items-center justify-center w-4 h-4">
                  <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#F9D103" }} />
                  <span className="relative text-white font-bold text-xs">O</span>
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20" />
            </div>
            <p className="text-white text-sm mt-3 font-medium">Good morning, John 👋</p>
            <p className="text-white/70 text-[11px]">Total balance to collect</p>
            <p className="text-white font-bold text-2xl mt-0.5" style={{ fontFamily: "Poppins" }}>$1,240.50</p>
          </div>

          {/* Debt list */}
          <div className="px-4 py-4 space-y-2.5">
            {debts.map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ backgroundColor: "#FFFBEB" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: "#B91C1C" }}>
                  {d.initial}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#2D2926" }}>{d.name}</p>
                  <p className="text-[11px]" style={{ color: "#9A8F7A" }}>Owes</p>
                </div>
                <span className="text-sm font-bold" style={{ color: "#B91C1C" }}>{d.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}