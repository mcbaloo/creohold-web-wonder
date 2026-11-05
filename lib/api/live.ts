"use client";
import type { ApiClient, Asset, Network, BillCategory, DemoRequest } from "./types";

const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function req<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const liveClient: ApiClient = {
  getRates: () => req("/api/rates"),
  getSupportedAssets: () => req("/api/assets"),
  getFeeQuote: (asset: Asset, network: Network, amount: number) =>
    req("/api/fee-quote", { asset, network, amount }),
  validateAddress: (asset: Asset, network: Network, address: string) =>
    req("/api/validate-address", { asset, network, address }),
  getConvertQuote: (from: Asset | "NGN", to: Asset | "NGN", amount: number) =>
    req("/api/convert-quote", { from, to, amount }),
  getBillers: (category: BillCategory) =>
    req(`/api/billers?category=${category}`),
  validateBillCustomer: (billerId: string, customerNumber: string) =>
    req("/api/validate-customer", { billerId, customerNumber }),
  submitDemoRequest: (payload: DemoRequest) =>
    req("/api/demo-request", payload),
};
