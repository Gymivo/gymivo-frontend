// Validation messages come from the backend (422 field errors); the frontend
// only shapes input so users can submit what the backend accepts.

/**
 * Converts Persian (۰-۹) and Arabic-Indic (٠-٩) digits to ASCII 0-9 so a
 * Persian keyboard user passes the backend's ^09\d{9}$ phone regex.
 */
export function normalizePersianDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (d) => String(d.charCodeAt(0) & 0x0f));
}
