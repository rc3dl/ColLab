// Reglas del fiado. Toda la lógica de saldos y estados vive AQUÍ, en un solo lugar,
// para que Clients, Credit, Dashboard y Reports muestren siempre los mismos números.

// Trabajamos en centavos (enteros) para evitar errores de decimales (0.1 + 0.2).
const toCents = (n) => Math.round(Number(n || 0) * 100);

// 35 -> "B/. 35.00"   |   1450 -> "B/. 1,450.00"
export function money(value) {
  const n = Number(value || 0);
  return `B/. ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Fecha de hoy en Panamá, como "2026-10-11".
export function todayPanama() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Panama" }).format(new Date());
}

// Convierte una fecha-hora de la base de datos a la fecha de Panamá ("2026-10-11").
export function dateInPanama(timestamp) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Panama" }).format(new Date(timestamp));
}

function daysBetween(fromYmd, toYmd) {
  const ms = Date.parse(`${toYmd}T00:00:00Z`) - Date.parse(`${fromYmd}T00:00:00Z`);
  return Math.round(ms / 86400000);
}

// Calcula la situación de UN cliente a partir de sus movimientos (fiados y pagos).
// Regla: los pagos cubren primero los fiados más antiguos.
//   saldo   = fiados - pagos
//   vencido = lo que queda sin pagar de los fiados cuya fecha límite ya pasó
//   estado  = Overdue (hay vencido) | Pending (hay saldo) | On Time (saldo en cero)
export function computeClientStats(entries, today = todayPanama()) {
  const fiados = entries
    .filter((e) => e.kind === "fiado")
    .sort((a, b) => {
      const diff = Date.parse(a.created_at) - Date.parse(b.created_at);
      return diff !== 0 ? diff : String(a.id).localeCompare(String(b.id));
    });
  let coverage = entries
    .filter((e) => e.kind === "pago")
    .reduce((sum, e) => sum + toCents(e.amount), 0);

  let balance = 0;
  let overdue = 0;
  let oldestPendingDate = null;

  for (const f of fiados) {
    const amount = toCents(f.amount);
    const covered = Math.min(coverage, amount);
    coverage -= covered;
    const remaining = amount - covered;
    if (remaining > 0) {
      balance += remaining;
      if (!oldestPendingDate) oldestPendingDate = dateInPanama(f.created_at);
      if (f.due_date && f.due_date < today) overdue += remaining;
    }
  }

  const status = overdue > 0 ? "Overdue" : balance > 0 ? "Pending" : "On Time";
  return {
    balance: balance / 100,
    overdue: overdue / 100,
    purchases: fiados.length,
    status,
    oldestPendingDate,
    daysPending: oldestPendingDate ? Math.max(0, daysBetween(oldestPendingDate, today)) : 0,
  };
}

// "Ramón Batista" -> "RB"
export function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

// Teléfono opcional. Devuelve un texto de error, o "" si está bien.
export function validatePhone(value) {
  const v = (value || "").trim();
  if (!v) return "";
  if (!/^[+\d\s()-]+$/.test(v)) return "Use only numbers, spaces, + ( ) or -.";
  const digits = v.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "Phone must have between 7 and 15 digits.";
  return "";
}

// Enlace para abrir WhatsApp con un mensaje ya escrito (gratis, sin API).
// En Panamá los números tienen 8 dígitos y el código del país es 507.
export function waLink(phone, text) {
  let digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 8) digits = `507${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// Mensaje que recibe el cliente (en español, porque lo lee tu cliente).
export function reminderText({ name, balance, store }) {
  const first = (name || "").trim().split(/\s+/)[0] || "";
  return `Hola ${first}, te recordamos que tienes ${money(balance)} pendiente en ${store || "nuestro negocio"}. ¡Gracias y te esperamos!`;
}