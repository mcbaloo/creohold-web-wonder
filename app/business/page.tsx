import type { Metadata } from "next";
import BusinessContent from "./BusinessContent";

export const metadata: Metadata = {
  title: "Business",
  description: "Business accounts — naira, crypto, conversion and bills for companies and teams.",
};

export default function BusinessPage() {
  return <BusinessContent />;
}
