"use client";

import { useState, useEffect } from "react";
import {
  ExchangeRatesMap,
  FALLBACK_EXCHANGE_RATES,
  FALLBACK_RATE_UPDATED_AT,
} from "@/lib/config";

export interface ExchangeRatesState {
  rates: ExchangeRatesMap;
  source: "live" | "fallback";
  updatedAt: string;
  isLoading: boolean;
}

let cachedRatesResult: Omit<ExchangeRatesState, "isLoading"> | null = null;
let inflightRatesPromise: Promise<Omit<ExchangeRatesState, "isLoading">> | null =
  null;

async function loadExchangeRates(): Promise<
  Omit<ExchangeRatesState, "isLoading">
> {
  if (cachedRatesResult) {
    return cachedRatesResult;
  }

  if (!inflightRatesPromise) {
    inflightRatesPromise = fetch("/api/rates")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch rates");
        }
        const data = await res.json();
        if (!data?.rates) {
          throw new Error("Missing rates payload");
        }
        const result: Omit<ExchangeRatesState, "isLoading"> = {
          rates: data.rates as ExchangeRatesMap,
          source: data.source === "live" ? "live" : "fallback",
          updatedAt:
            typeof data.updatedAt === "string"
              ? data.updatedAt
              : FALLBACK_RATE_UPDATED_AT,
        };
        cachedRatesResult = result;
        return result;
      })
      .catch(() => ({
        rates: FALLBACK_EXCHANGE_RATES,
        source: "fallback" as const,
        updatedAt: FALLBACK_RATE_UPDATED_AT,
      }))
      .finally(() => {
        inflightRatesPromise = null;
      });
  }

  return inflightRatesPromise;
}

export function useExchangeRates(): ExchangeRatesState {
  const [state, setState] = useState<ExchangeRatesState>(() =>
    cachedRatesResult
      ? { ...cachedRatesResult, isLoading: false }
      : {
          rates: FALLBACK_EXCHANGE_RATES,
          source: "fallback",
          updatedAt: FALLBACK_RATE_UPDATED_AT,
          isLoading: true,
        }
  );

  useEffect(() => {
    let mounted = true;
    loadExchangeRates().then((result) => {
      if (mounted) {
        setState({ ...result, isLoading: false });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
