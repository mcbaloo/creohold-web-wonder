import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://creohold.com";
  const routes = [
    "",
    "/naira",
    "/crypto",
    "/convert",
    "/bills",
    "/business",
    "/business/solutions",
    "/rates",
    "/security",
    "/about",
    "/help",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];

  return routes.map(r => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
