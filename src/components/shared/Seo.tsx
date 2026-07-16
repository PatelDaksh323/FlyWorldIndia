import { Helmet } from "react-helmet-async";
import { site } from "@/config/site";

type SeoProps = {
  title: string;
  description: string;
  /** Path only, e.g. "/study-abroad/germany". Used for canonical + og:url. */
  path?: string;
  image?: string;
  /** Optional JSON-LD blocks (e.g. FAQPage, BreadcrumbList). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

/**
 * Per-page SEO (PRD G-4). react-helmet-async is the minimum; the prerender
 * step (see README / vite-react-ssg note) turns these into real static HTML.
 */
export default function Seo({ title, description, path = "/", image, jsonLd, noindex }: SeoProps) {
  const url = `${site.url}${path}`;
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const ogImage = image ?? `${site.url}/og-image.png`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
