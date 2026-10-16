// Avisos de la campana: qué cuentas están vencidas y qué productos se están acabando.
import { money } from "@/lib/credit";
import { stockLabel, formatQty } from "@/lib/products";

// clients = clientes con sus saldos ya calculados | lowStock = productos con poco stock
export function buildAlerts({ clients = [], lowStock = [] }) {
  const overdue = clients
    .filter((c) => c.overdue > 0)
    .sort((a, b) => b.overdue - a.overdue)
    .map((c) => ({
      id: `overdue-${c.id}`,
      type: "overdue",
      title: `${c.name} is overdue`,
      detail: `${money(c.overdue)} past the due date`,
      to: "/clients",
    }));

  const stock = [...lowStock]
    .sort((a, b) => Number(a.stock) - Number(b.stock))
    .map((p) => {
      const out = Number(p.stock) <= 0;
      return {
        id: `stock-${p.id}`,
        type: "stock",
        title: out ? `${p.name} is out of stock` : `${p.name} is running low`,
        detail: out ? "Restock it to keep selling." : `${stockLabel(p)} left (alert at ${formatQty(p.min_stock)})`,
        to: "/products",
      };
    });

  return [...overdue, ...stock];
}

// Lo que se escribe en el círculo: 3, 9+ ...
export function badgeText(count) {
  return count > 9 ? "9+" : String(count);
}