/**
 * Country-based currency utility.
 *
 * During registration the user picks a country-code (phone prefix).
 * We derive the likely currency from that code and display all product
 * prices in that currency with the correct symbol / formatting.
 *
 * Exchange rates are approximate and hard-coded for demo purposes.
 * In production you would fetch live rates from an API.
 */

export interface PaymentMethodInfo {
  id: string;          // unique key
  label: string;       // display name
  icon: string;        // emoji icon
  description?: string;
}

export interface CurrencyInfo {
  code: string;        // ISO 4217 e.g. "USD"
  symbol: string;      // "$"
  name: string;        // "US Dollar"
  rate: number;        // conversion rate FROM USD
  locale: string;      // BCP-47 locale for Intl.NumberFormat
  flag: string;        // emoji
  paymentMethods: PaymentMethodInfo[];  // available payment methods
}

/** Map phone-prefix → currency info  (matches the register form options) */
const COUNTRY_CURRENCY_MAP: Record<string, CurrencyInfo> = {
  "+1":   {
    code: "USD", symbol: "$",  name: "US Dollar",       rate: 1,       locale: "en-US",  flag: "🇺🇸",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "paypal", label: "PayPal", icon: "🅿️" },
      { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
      { id: "google_pay", label: "Google Pay", icon: "🔵" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+44":  {
    code: "GBP", symbol: "£",  name: "British Pound",   rate: 0.79,    locale: "en-GB",  flag: "🇬🇧",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "paypal", label: "PayPal", icon: "🅿️" },
      { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
      { id: "google_pay", label: "Google Pay", icon: "🔵" },
      { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
    ],
  },
  "+91":  {
    code: "INR", symbol: "₹",  name: "Indian Rupee",    rate: 83.50,   locale: "en-IN",  flag: "🇮🇳",
    paymentMethods: [
      { id: "upi", label: "UPI (GPay / PhonePe)", icon: "📱" },
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "net_banking", label: "Net Banking", icon: "🏦" },
      { id: "wallet", label: "Paytm Wallet", icon: "👛" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+977": {
    code: "NPR", symbol: "Rs", name: "Nepalese Rupee",  rate: 133.50,  locale: "ne-NP",  flag: "🇳🇵",
    paymentMethods: [
      { id: "esewa", label: "eSewa", icon: "📱" },
      { id: "khalti", label: "Khalti", icon: "📲" },
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+86":  {
    code: "CNY", symbol: "¥",  name: "Chinese Yuan",    rate: 7.24,    locale: "zh-CN",  flag: "🇨🇳",
    paymentMethods: [
      { id: "wechat_pay", label: "WeChat Pay", icon: "💬" },
      { id: "alipay", label: "Alipay", icon: "📱" },
      { id: "card", label: "UnionPay Card", icon: "💳" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+81":  {
    code: "JPY", symbol: "¥",  name: "Japanese Yen",    rate: 149.50,  locale: "ja-JP",  flag: "🇯🇵",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "konbini", label: "Konbini (Convenience Store)", icon: "🏪" },
      { id: "paypay", label: "PayPay", icon: "📱" },
      { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+82":  {
    code: "KRW", symbol: "₩",  name: "South Korean Won",rate: 1320.00, locale: "ko-KR",  flag: "🇰🇷",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "kakao_pay", label: "Kakao Pay", icon: "💛" },
      { id: "naver_pay", label: "Naver Pay", icon: "💚" },
      { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
  "+61":  {
    code: "AUD", symbol: "A$", name: "Australian Dollar",rate: 1.54,   locale: "en-AU",  flag: "🇦🇺",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "paypal", label: "PayPal", icon: "🅿️" },
      { id: "afterpay", label: "Afterpay", icon: "🔄" },
      { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
      { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
    ],
  },
  "+49":  {
    code: "EUR", symbol: "€",  name: "Euro",            rate: 0.92,    locale: "de-DE",  flag: "🇩🇪",
    paymentMethods: [
      { id: "card", label: "Credit/Debit Card", icon: "💳" },
      { id: "paypal", label: "PayPal", icon: "🅿️" },
      { id: "sofort", label: "Sofort / Klarna", icon: "🔷" },
      { id: "sepa", label: "SEPA Direct Debit", icon: "🏦" },
      { id: "google_pay", label: "Google Pay", icon: "🔵" },
    ],
  },
  "+33":  {
    code: "EUR", symbol: "€",  name: "Euro",            rate: 0.92,    locale: "fr-FR",  flag: "🇫🇷",
    paymentMethods: [
      { id: "card", label: "Carte Bancaire", icon: "💳" },
      { id: "paypal", label: "PayPal", icon: "🅿️" },
      { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
      { id: "sepa", label: "SEPA Direct Debit", icon: "🏦" },
      { id: "cod", label: "Cash on Delivery", icon: "💵" },
    ],
  },
};

/** Default (USD) when no country is matched */
const DEFAULT_CURRENCY: CurrencyInfo = COUNTRY_CURRENCY_MAP["+1"];

/** Get payment methods for a user based on their phone number */
export function getPaymentMethodsFromPhone(phoneNumber?: string): PaymentMethodInfo[] {
  const currency = getCurrencyFromPhone(phoneNumber);
  return currency.paymentMethods;
}

/**
 * Extract country-code prefix from a stored phone number.
 * The register form prepends the country-code to the phone number,
 * e.g. "+977" + "9841234567" → "+9779841234567".
 */
export function extractCountryCode(phoneNumber?: string): string | null {
  if (!phoneNumber) return null;
  const phone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

  // Try longest prefix first (4 digits) then 3, 2, 1
  for (let len = 4; len >= 1; len--) {
    const prefix = phone.slice(0, len + 1); // include the "+"
    if (COUNTRY_CURRENCY_MAP[prefix]) return prefix;
  }
  return null;
}

/** Get currency info for a user based on their phone number */
export function getCurrencyFromPhone(phoneNumber?: string): CurrencyInfo {
  const code = extractCountryCode(phoneNumber);
  return code ? COUNTRY_CURRENCY_MAP[code] : DEFAULT_CURRENCY;
}

/** Get currency info from a country code directly (e.g. "+977") */
export function getCurrencyFromCountryCode(countryCode?: string): CurrencyInfo {
  if (!countryCode) return DEFAULT_CURRENCY;
  return COUNTRY_CURRENCY_MAP[countryCode] || DEFAULT_CURRENCY;
}

/**
 * Convert a USD price to the user's local currency and format it.
 * @param priceUSD  – the price in US Dollars (all products stored in USD)
 * @param currency  – CurrencyInfo for the target currency
 * @param decimals  – number of decimal places (auto-detected if omitted)
 */
export function formatPrice(priceUSD: number, currency?: CurrencyInfo, decimals?: number): string {
  const c = currency || DEFAULT_CURRENCY;
  const converted = priceUSD * c.rate;

  // JPY / KRW don't use decimals
  const dec = decimals ?? (c.code === "JPY" || c.code === "KRW" ? 0 : 2);

  return `${c.symbol}${converted.toFixed(dec)}`;
}

/**
 * Convenience: returns the numeric converted value (for calculations).
 */
export function convertPrice(priceUSD: number, currency?: CurrencyInfo): number {
  const c = currency || DEFAULT_CURRENCY;
  return priceUSD * c.rate;
}

/** List of all supported currencies (useful for a settings / picker UI) */
export function getAllCurrencies(): CurrencyInfo[] {
  // De-duplicate by code
  const seen = new Set<string>();
  return Object.values(COUNTRY_CURRENCY_MAP).filter((c) => {
    if (seen.has(c.code)) return false;
    seen.add(c.code);
    return true;
  });
}

export { COUNTRY_CURRENCY_MAP, DEFAULT_CURRENCY };
