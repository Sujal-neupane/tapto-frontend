"use client";

import { useMemo } from "react";
import { useAuth } from "@/lib/context/auth-context";
import {
  getCurrencyFromPhone,
  formatPrice,
  convertPrice,
  CurrencyInfo,
  PaymentMethodInfo,
} from "@/lib/utils/currency";

/**
 * Hook that provides currency formatting based on the logged-in user's
 * phone number (which encodes the country code from registration).
 *
 * Usage:
 *   const { format, currency } = useCurrency();
 *   <span>{format(product.price)}</span>   // "Rs13,350.00"
 */
export function useCurrency() {
  const { user } = useAuth();

  const currency: CurrencyInfo = useMemo(() => {
    const phone = (user as any)?.phoneNumber;
    return getCurrencyFromPhone(phone);
  }, [user]);

  /** Format a USD price into the user's local currency string */
  const format = (priceUSD: number, decimals?: number): string =>
    formatPrice(priceUSD, currency, decimals);

  /** Just convert without formatting (for calculations) */
  const convert = (priceUSD: number): number =>
    convertPrice(priceUSD, currency);

  /** Payment methods available for the user's country */
  const paymentMethods: PaymentMethodInfo[] = currency.paymentMethods;

  return { currency, format, convert, paymentMethods };
}
