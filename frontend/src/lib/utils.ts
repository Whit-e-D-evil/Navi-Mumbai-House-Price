/**
 * Utility function for combining class names conditionally.
 * Lightweight replacement for clsx for simple cases.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Formats a number as Indian currency (₹ Lakhs or Crores).
 *
 * @param amount - Amount in INR.
 * @returns Formatted string like "₹42.5 Lakhs" or "₹1.2 Cr".
 */
export function formatIndianCurrency(amount: number): string {
    if (amount >= 10_000_000) {
        return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
    }
    if (amount >= 100_000) {
        return `₹${(amount / 100_000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Formats a number with Indian locale separators.
 *
 * @param num - Number to format.
 * @returns Formatted string like "12,34,567".
 */
export function toIndianLocale(num: number): string {
    return num.toLocaleString('en-IN');
}
