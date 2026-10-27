// Indian mobile numbers: 10 digits starting 6–9. Accepts spaces, dashes, a leading 0,
// or a +91 / 91 prefix, and returns the 10 digits, or null if it isn't a valid number.
export function normaliseIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}
