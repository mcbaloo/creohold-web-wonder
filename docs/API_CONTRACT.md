# API Contract — Mock Endpoints

All endpoints in `lib/api/mock.ts`. Switch to live implementations via `NEXT_PUBLIC_API_MODE=live`.

## Existing endpoints

| Method | Description | Mock file |
|---|---|---|
| `getRates()` | Live asset prices in NGN | `mocks/rates.json` |
| `getSupportedAssets()` | List of supported crypto assets and networks | `mocks/assets.json` |
| `getFeeQuote(asset, network, amount)` | Fee estimate for a crypto send | Computed |
| `validateAddress(asset, network, address)` | Regex address validation | Computed |
| `getConvertQuote(from, to, amount)` | Conversion quote with 30s expiry | Computed |
| `getBillers(category)` | Billers by category | `mocks/billers.json` |
| `validateBillCustomer(billerId, customerNumber)` | Customer name lookup | Computed |

## New endpoint (mock only)

### `submitDemoRequest(payload)`

Accepts a demo booking request from `/business#book-demo`.

**Payload:**
```ts
{
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  companySize: "1-10" | "11-50" | "51-200" | "200+";
  useCase: "business-wallet" | "bulk-payouts" | "collect-payments" | "api" | "other";
  message?: string;
}
```

**Response:**
```ts
{ ok: true; referenceId: string }
```

**Current status:** Mock implementation in `lib/api/mock.ts`. Simulates a 1.5 s delay, then returns a fake reference ID. **No data is sent anywhere.** Replace with a real endpoint or form service before launch.
