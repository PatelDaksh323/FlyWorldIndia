/**
 * Generate public/sitemap.xml from the route list. Runs automatically before
 * build (see package.json "prebuild"). Keeping the URL set in one place means
 * adding a country to countries.ts and its route here keeps the sitemap honest.
 *
 * Plain data (not imported from the TS source) to avoid a TS loader in Node.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.flyworldindia.com";
const __dirname = dirname(fileURLToPath(import.meta.url));

const studyAbroad = ["germany", "canada", "uk", "australia", "ireland", "usa", "france"];
const workPermit = ["germany", "poland", "croatia", "hungary", "romania"];
const visitorVisa = ["uk", "schengen", "usa", "australia", "dubai"];
const blog = [
  "study-in-germany-from-india-2026",
  "canada-vs-australia-for-indian-students",
  "europe-work-permit-explained",
  "avoiding-immigration-scams-india",
  "sop-writing-that-works",
  "visitor-visa-financial-proof",
];

/** [path, priority, changefreq] */
const routes = [
  ["/", "1.0", "weekly"],
  ["/study-abroad", "0.9", "weekly"],
  ["/europe-work-permit", "0.9", "weekly"],
  ["/visitor-visa", "0.9", "weekly"],
  ["/pr-migration", "0.9", "monthly"],
  ["/about", "0.6", "monthly"],
  ["/team", "0.5", "monthly"],
  ["/success-stories", "0.6", "monthly"],
  ["/blog", "0.7", "weekly"],
  ["/contact", "0.7", "monthly"],
  ...studyAbroad.map((s) => [`/study-abroad/${s}`, "0.8", "monthly"]),
  ...workPermit.map((s) => [`/europe-work-permit/${s}`, "0.8", "monthly"]),
  ...visitorVisa.map((s) => [`/visitor-visa/${s}`, "0.8", "monthly"]),
  ...blog.map((s) => [`/blog/${s}`, "0.6", "monthly"]),
];

const body = routes
  .map(
    ([path, priority, changefreq]) =>
      `  <url>\n    <loc>${BASE}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const out = resolve(__dirname, "../public/sitemap.xml");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, xml);
console.log(`sitemap.xml written with ${routes.length} URLs`);
