"use client";
import { mockClient } from "./mock";
import { liveClient } from "./live";
export type { ApiClient, Asset, Network, BillCategory, AssetRate, SupportedAsset,
  FeeQuote, AddressValidation, ConvertQuote, Biller, BillerPlan, BillCustomerValidation,
  ValidationStatus, DemoRequest, DemoRequestResult } from "./types";

export const isMockMode =
  !process.env.NEXT_PUBLIC_API_MODE ||
  process.env.NEXT_PUBLIC_API_MODE === "mock";

export const api = isMockMode ? mockClient : liveClient;
