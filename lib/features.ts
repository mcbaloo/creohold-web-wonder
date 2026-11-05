export type FeatureStatus = "live" | "coming-soon";

export const features: Record<string, FeatureStatus> = {
  businessWallet:    "live",
  bulkPayout:        "coming-soon",
  teamApprovals:     "coming-soon",
  collectPayments:   "coming-soon",
  developerApi:      "coming-soon",
};
