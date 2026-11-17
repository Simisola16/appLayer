import { NextResponse } from "next/server";
import {
  CurrencyCode,
  ExchangeRatesMap,
  FALLBACK_EXCHANGE_RATES,
  FALLBACK_RATE_UPDATED_AT,
} from "@/lib/config";

const TARGET_CODES: CurrencyCode[] = ["USD", "EUR", "GBP", "CAD", "AUD", "NGN"];

function buildNormalizedRates(
  rawRates: Partial<Record<string, number>>
): ExchangeRatesMap | null {
  const eur = rawRates.EUR ?? rawRates.eur;
  const gbp = rawRates.GBP ?? rawRates.gbp;
  const cad = rawRates.CAD ?? rawRates.cad;
  const aud = rawRates.AUD ?? rawRates.aud;
  const ngn = rawRates.NGN ?? rawRates.ngn;

  if (
    typeof eur !== "number" ||
    typeof gbp !== "number" ||
    typeof cad !== "number" ||
    typeof aud !== "number" ||
    typeof ngn !== "number"
  ) {
    return null;
  }

  return {
    USD: 1,
    EUR: eur,
    GBP: gbp,
    CAD: cad,
    AUD: aud,
    NGN: ngn,
  };
}

function formatDateStamp(rawDate?: string): string {
  if (!rawDate) return FALLBACK_RATE_UPDATED_AT;
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate;
  }
  return parsed.toISOString().slice(0, 10);
}

/**
 * GET /api/rates
 * Fetches live USD exchange rates for supported display currencies with
 * 1-hour server revalidation and safe fallback rates.
 */
export async function GET() {
  // Primary live feed: Open ExchangeRate API (supports NGN + major currencies)
  try {
    const primaryRes = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });

    if (primaryRes.ok) {
      const data = await primaryRes.json();
      if (data?.result === "success" && data?.rates) {
        const rates = buildNormalizedRates(data.rates);
        if (rates) {
          return NextResponse.json({
            ok: true,
            source: "live",
            base: "USD",
            currencies: TARGET_CODES,
            updatedAt: formatDateStamp(data.time_last_update_utc),
            rates,
          });
        }
      }
    }
  } catch {
    // Fall through to secondary feed
  }

  // Secondary live feed: jsDelivr Currency API
  try {
    const secondaryRes = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
      }
    );

    if (secondaryRes.ok) {
      const data = await secondaryRes.json();
      if (data?.usd) {
        const rates = buildNormalizedRates(data.usd);
        if (rates) {
          return NextResponse.json({
            ok: true,
            source: "live",
            base: "USD",
            currencies: TARGET_CODES,
            updatedAt: formatDateStamp(data.date),
            rates,
          });
        }
      }
    }
  } catch {
    // Fall through to static snapshot
  }

  return NextResponse.json({
    ok: true,
    source: "fallback",
    base: "USD",
    currencies: TARGET_CODES,
    updatedAt: FALLBACK_RATE_UPDATED_AT,
    rates: FALLBACK_EXCHANGE_RATES,
  });
}
