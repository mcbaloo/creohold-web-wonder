// ── Shared ──────────────────────────────────────────────────────
export type Asset = "BTC" | "ETH" | "USDT" | "USDC";
export type Network = "bitcoin" | "erc20" | "trc20" | "erc20-usdc";
export type BillCategory = "airtime" | "data" | "electricity" | "tv";

// ── Rates ────────────────────────────────────────────────────────
export interface AssetRate {
  asset: Asset;
  symbol: string;
  priceNGN: number;
  change24hPct: number;
  direction: "up" | "down" | "flat";
}

// ── Supported assets ─────────────────────────────────────────────
export interface SupportedAsset {
  asset: Asset;
  name: string;
  symbol: string;
  networks: Network[];
  minSendNGN: number;
  iconUrl: string;
}

// ── Fee quote ────────────────────────────────────────────────────
export interface FeeQuote {
  asset: Asset;
  network: Network;
  amountCrypto: number;
  feeCrypto: number;
  feeNGN: number;
  totalCrypto: number;
  estimatedMinutes: number;
}

// ── Address validation ───────────────────────────────────────────
export type ValidationStatus = "idle" | "checking" | "valid" | "invalid";
export interface AddressValidation {
  valid: boolean;
  reason?: string;
}

// ── Convert quote ────────────────────────────────────────────────
export interface ConvertQuote {
  from: Asset | "NGN";
  to: Asset | "NGN";
  inputAmount: number;
  outputAmount: number;
  rate: number;
  feeNGN: number;
  expiresAt: number; // unix ms
}

// ── Billers ──────────────────────────────────────────────────────
export interface BillerPlan {
  id: string;
  label: string;
  amountNGN: number;
}
export interface Biller {
  id: string;
  name: string;
  category: BillCategory;
  logoPlaceholder: string;
  plans?: BillerPlan[];
  requiresCustomerNumber: boolean;
  customerLabel: string;
}

// ── Bill customer validation ──────────────────────────────────────
export interface BillCustomerValidation {
  valid: boolean;
  customerName?: string;
  error?: string;
}

// ── Demo request ─────────────────────────────────────────────────
export interface DemoRequest {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  companySize: "1-10" | "11-50" | "51-200" | "200+";
  useCase: "business-wallet" | "bulk-payouts" | "collect-payments" | "api" | "other";
  message?: string;
}
export interface DemoRequestResult {
  ok: true;
  referenceId: string;
}

// ── API client interface ──────────────────────────────────────────
export interface ApiClient {
  getRates(): Promise<AssetRate[]>;
  getSupportedAssets(): Promise<SupportedAsset[]>;
  getFeeQuote(asset: Asset, network: Network, amount: number): Promise<FeeQuote>;
  validateAddress(asset: Asset, network: Network, address: string): Promise<AddressValidation>;
  getConvertQuote(from: Asset | "NGN", to: Asset | "NGN", amount: number): Promise<ConvertQuote>;
  getBillers(category: BillCategory): Promise<Biller[]>;
  validateBillCustomer(billerId: string, customerNumber: string): Promise<BillCustomerValidation>;
  submitDemoRequest(payload: DemoRequest): Promise<DemoRequestResult>;
}
