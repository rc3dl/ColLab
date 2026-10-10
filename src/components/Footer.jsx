import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-0.5 select-none">
      <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "Poppins" }}>
        FIA'
      </span>
      <span className="relative inline-flex items-center justify-center w-6 h-6">
        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#F9D103" }} />
        <span className="relative text-white font-bold text-xl" style={{ fontFamily: "Poppins" }}>O</span>
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Light link strip */}
      <div className="w-full py-8" style={{ backgroundColor: "#FFFDF0" }}>
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            {["Inicio", "Clientes", "Productos", "Fiados"].map((l) => (
              <span key={l} className="text-sm underline" style={{ color: "#9A8F7A" }}>{l}</span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {["Reportes", "Soporte", "Preguntas frecuentes"].map((l) => (
              <span key={l} className="text-sm underline" style={{ color: "#9A8F7A" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <div className="w-full py-12" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <Logo />
              <p className="text-sm mt-3 leading-relaxed" style={{ color: "#B8B8B8" }}>
                The app for shopkeepers to manage their credit lines without paper notebooks or wall markings.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider mb-3" style={{ color: "#F9D103" }}>NAVIGATION</h4>
              <ul className="space-y-2">
                {["Home", "Credit", "Products", "Clients"].map((l) => (
                  <li key={l}><Link to={`/${l === "Home" ? "" : l.toLowerCase()}`} className="text-sm hover:underline" style={{ color: "#B8B8B8" }}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider mb-3" style={{ color: "#F9D103" }}>PRODUCT</h4>
              <ul className="space-y-2">
                {["Reports", "Inventory", "Digital Catalog", "Payment Integration"].map((l) => (
                  <li key={l}><span className="text-sm" style={{ color: "#B8B8B8" }}>{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider mb-3" style={{ color: "#F9D103" }}>CONTACT</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm" style={{ color: "#B8B8B8" }}><Mail className="w-3.5 h-3.5" /> hola@fiao.app</li>
                <li className="flex items-center gap-2 text-sm" style={{ color: "#B8B8B8" }}><Phone className="w-3.5 h-3.5" /> +507 6000-0000</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t flex flex-col sm:flex-row justify-between gap-2" style={{ borderColor: "#333" }}>
            <span className="text-xs" style={{ color: "#888" }}>© 2026 FIA'O. Visual prototypes.</span>
            <span className="text-xs" style={{ color: "#888" }}>Made for local businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}