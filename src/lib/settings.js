// Reglas de los formularios de la pantalla Profile (datos del negocio y reglas de crédito).
import { parseAmount, validatePhone } from "@/lib/credit";

const MAX_TEXT = 200;

// --- Datos del negocio ------------------------------------------------------
export const userToForm = (user) => ({
  full_name: user?.full_name || "",
  store_name: user?.store_name || "",
  phone: user?.phone || "",
  address: user?.address || "",
  ruc: user?.ruc || "",
});

const FIELD_LABELS = { full_name: "Full name", store_name: "Store name", phone: "Phone", address: "Address", ruc: "RUC / ID" };

// Devuelve { error } o { values } listos para guardar.
export function validateProfile(form) {
  const values = {};
  for (const key of Object.keys(FIELD_LABELS)) {
    const v = String(form[key] ?? "").trim();
    if (v.length > MAX_TEXT) return { error: `${FIELD_LABELS[key]} is too long (maximum ${MAX_TEXT} characters).` };
    values[key] = v;
  }
  const phoneError = validatePhone(values.phone);
  if (phoneError) return { error: phoneError };
  return { values };
}

// --- Reglas de crédito del negocio -----------------------------------------
export const settingsToForm = (s) => ({
  default_credit_limit: String(s.default_credit_limit),
  default_due_days: String(s.default_due_days),
  auto_block: !!s.auto_block,
});

// Devuelve { error } o { values } listos para guardar.
export function validateSettings(form) {
  const limit = parseAmount(form.default_credit_limit);
  if (Number.isNaN(limit)) return { error: "The credit limit must be a number (for example 100)." };
  if (limit > 100000) return { error: "That credit limit is too high (maximum B/. 100,000)." };
  const raw = String(form.default_due_days ?? "").trim();
  if (!/^\d+$/.test(raw) || Number(raw) < 1 || Number(raw) > 365) {
    return { error: "Days to pay must be a whole number from 1 to 365." };
  }
  return { values: { default_credit_limit: limit, default_due_days: Number(raw), auto_block: !!form.auto_block } };
}

// ¿El formulario ya es distinto de lo guardado? (para avisar que hay cambios sin guardar)
export function isDirty(draft, original) {
  return draft !== null && JSON.stringify(draft) !== JSON.stringify(original);
}