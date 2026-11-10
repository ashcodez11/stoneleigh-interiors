import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The enquiry endpoint and the post-submission confirmation page add no
      // value to search results and should not be crawled.
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
