import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Pencil, Trash2, Plus, Bell } from "lucide-react";

const PRODUCTS = [
  { name: "Sugar", category: "Pantry", price: "B/. 0.85", stock: "25 lb", img: "https://images.unsplash.com/photo-1610445105132-4c4c4c4c4c4c?w=200" },
  { name: "Rice", category: "Pantry", price: "B/. 0.95", stock: "38 lb", img: "https://images.unsplash.com/photo-1586201375761-786d0e4e3b6b?w=200" },
  { name: "White Bread", category: "Bakery", price: "B/. 1.50", stock: "12 Unit", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200" },
  { name: "Coca Cola 2L", category: "Beverages", price: "B/. 2.10", stock: "20 Bottle", img: "https://images.unsplash.com/photo-1622483767028-3f66f32a4b06?w=200" },
  { name: "Eggs (Dozen)", category: "Dairy", price: "B/. 3.20", stock: "15 Pack", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200" },
];

export default function Products() {
  const [tab, setTab] = useState("Inventory");
  const [query, setQuery] = useState("");

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#B91C1C" }}>
      <Navbar />

      <main className="flex-1">
        {/* Sub-nav */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setTab("Inventory")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition"
              style={{ backgroundColor: tab === "Inventory" ? "#B91C1C" : "#FFFBEB", color: tab === "Inventory" ? "#FFFFFF" : "#2D2926" }}
            >
              Inventory
            </button>
            <button
              onClick={() => setTab("Fiado")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition"
              style={{ backgroundColor: tab === "Fiado" ? "#B91C1C" : "#FFFBEB", color: tab === "Fiado" ? "#FFFFFF" : "#2D2926" }}
            >
              Register Fiado Sale
            </button>
          </div>
        </div>

        {/* Content card */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "#FFFDF0" }}>
            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#9A8F7A" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full pl-11 pr-4 py-2.5 text-sm border outline-none"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DDB8", color: "#2D2926" }}
              />
            </div>

            <h1 className="font-bold text-3xl sm:text-4xl mb-2" style={{ color: "#2D2926", fontFamily: "Poppins" }}>
              Your inventory, always exact
            </h1>
            <p className="text-sm mb-6" style={{ color: "#6B6357" }}>
              Showing core products and add option. Use search bar to look up items.
            </p>

            {/* Inventory alerts banner */}
            <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ backgroundColor: "#FEF3C7", border: "1px solid #F9D103" }}>
              <Bell className="w-5 h-5 flex-shrink-0" style={{ color: "#92400E" }} />
              <p className="text-sm" style={{ color: "#92400E" }}>
                <span className="font-bold">Inventory Alert:</span> 2 products are running low and may need restocking soon.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <div key={p.name} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0E6C5" }}>
                  <div className="aspect-square flex items-center justify-center" style={{ backgroundColor: "#FFFBEB" }}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2" style={{ backgroundColor: "#F9D103", color: "#2D2926" }}>
                      {p.category}
                    </span>
                    <h3 className="font-bold text-sm mb-0.5" style={{ color: "#2D2926" }}>{p.name}</h3>
                    <p className="font-bold text-base mb-1" style={{ color: "#B91C1C" }}>{p.price}</p>
                    <p className="text-xs mb-3" style={{ color: "#6B6357" }}>Stock: {p.stock}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: "#FFFBEB", color: "#2D2926", border: "1px solid #F0E6C5" }}>
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add card */}
              <button className="rounded-2xl flex flex-col items-center justify-center p-6 min-h-[280px]" style={{ border: "2px dashed #D6CDB0", backgroundColor: "transparent" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#F9D103" }}>
                  <Plus className="w-6 h-6" style={{ color: "#2D2926" }} />
                </div>
                <p className="font-bold text-sm" style={{ color: "#2D2926" }}>Add New Product</p>
                <p className="text-xs mt-1" style={{ color: "#6B6357" }}>Create a new item</p>
              </button>
            </div>

            {/* Digital catalog note */}
            <div className="mt-8 p-5 rounded-2xl" style={{ backgroundColor: "#FFFBEB", border: "1px solid #F3E9C8" }}>
              <h3 className="font-bold text-base mb-1" style={{ color: "#2D2926" }}>Digital Catalog</h3>
              <p className="text-sm" style={{ color: "#6B6357" }}>
                Display your products in a digital catalog so customers can view what's available — no more printed lists or outdated price tags.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}