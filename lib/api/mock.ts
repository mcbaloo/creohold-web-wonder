"use client";
import type { ApiClient, Asset, AssetRate, Network, BillCategory, DemoRequest } from "./types";
import ratesFixture from "./mocks/rates.json";
import assetsFixture from "./mocks/assets.json";
import billersFixture from "./mocks/billers.json";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const jitter = (base: number) => base + Math.random() * 400;

// Address format validators per network
const addressPatterns: Record<Network, RegExp> = {
  bitcoin:    /^(1|3|bc1)[a-zA-Z0-9]{25,62}$/,
  erc20:      /^0x[0-9a-fA-F]{40}$/,
  "erc20-usdc": /^0x[0-9a-fA-F]{40}$/,
  trc20:      /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
};

// Simulate occasional transient errors (dev only)
const maybeError = () => {
  if (process.env.NODE_ENV === "development" && Math.random() < 0.04) {
    throw new Error("Simulated network error — retry");
  }
};

// Rates drift slightly on every call
let ratesDrift: Record<string, number> = {};

export const mockClient: ApiClient = {
  async getRates() {
    await delay(jitter(300));
    maybeError();
    return (ratesFixture as AssetRate[]).map((r) => {
      const drift = (ratesDrift[r.asset] ?? 0) + (Math.random() - 0.5) * 0.002;
      ratesDrift[r.asset] = drift;
      const price = Math.round(r.priceNGN * (1 + drift));
      const change = parseFloat((r.change24hPct + (Math.random() - 0.5) * 0.1).toFixed(2));
      return {
        ...r,
        priceNGN: price,
        change24hPct: change,
        direction: change > 0.01 ? "up" : change < -0.01 ? "down" : "flat",
      } as AssetRate;
    });
  },

  async getSupportedAssets() {
    await delay(jitter(200));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return assetsFixture as any;
  },

  async getFeeQuote(asset, network, amount) {
    await delay(jitter(400));
    maybeError();
    const rates = await this.getRates();
    const rate = rates.find((r) => r.asset === asset)?.priceNGN ?? 1618;
    const feePct = { bitcoin: 0.0002, erc20: 0.001, trc20: 0.0005, "erc20-usdc": 0.001 }[network] ?? 0.001;
    const feeCrypto = parseFloat((amount * feePct).toFixed(8));
    const feeNGN = Math.round(feeCrypto * rate);
    return {
      asset, network, amountCrypto: amount,
      feeCrypto, feeNGN,
      totalCrypto: parseFloat((amount + feeCrypto).toFixed(8)),
      estimatedMinutes: { bitcoin: 10, erc20: 2, trc20: 1, "erc20-usdc": 2 }[network] ?? 2,
    };
  },

  async validateAddress(asset, network, address) {
    await delay(jitter(500));
    const pattern = addressPatterns[network];
    if (!pattern) return { valid: false, reason: "Unsupported network" };
    if (!address.trim()) return { valid: false, reason: "Address cannot be empty" };
    const valid = pattern.test(address.trim());
    return valid
      ? { valid: true }
      : { valid: false, reason: `Not a valid ${network.toUpperCase()} address format` };
  },

  async getConvertQuote(from, to, amount) {
    await delay(jitter(400));
    maybeError();
    const rates = await this.getRates();
    const getPrice = (a: string) => {
      if (a === "NGN") return 1;
      return rates.find((r) => r.asset === a)?.priceNGN ?? 1618;
    };
    const fromPrice = getPrice(from);
    const toPrice = getPrice(to);
    const rate = fromPrice / toPrice;
    const rawOutput = amount * rate;
    const feePct = 0.0015;
    const feeNGN = Math.round(rawOutput * toPrice * feePct);
    const output = from === "NGN"
      ? parseFloat((rawOutput * (1 - feePct)).toFixed(8))
      : Math.round(rawOutput * (1 - feePct));
    return {
      from, to,
      inputAmount: amount,
      outputAmount: output,
      rate: parseFloat(rate.toFixed(8)),
      feeNGN,
      expiresAt: Date.now() + 30_000,
    };
  },

  async getBillers(category) {
    await delay(jitter(200));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (billersFixture as any)[category] ?? [];
  },

  async submitDemoRequest(_payload: DemoRequest) {
    await delay(jitter(1200));
    return {
      ok: true as const,
      referenceId: "CREO-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
  },

  async validateBillCustomer(billerId, customerNumber) {
    await delay(jitter(600));
    if (!customerNumber || customerNumber.length < 6) {
      return { valid: false, error: "Enter a valid customer number" };
    }
    // Mock: generate a plausible name from the number
    const names = ["Adaeze Okafor", "Emeka Nwosu", "Fatima Aliyu", "Chukwuemeka Eze", "Ngozi Okonkwo"];
    const name = names[parseInt(customerNumber.slice(-1)) % names.length];
    return { valid: true, customerName: name };
  },
};
