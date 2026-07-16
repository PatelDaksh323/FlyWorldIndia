/** Navigation model — used by Navbar and Footer so they never drift apart. */

export type NavChild = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const primaryNav: NavItem[] = [
  {
    label: "Study Abroad",
    to: "/study-abroad",
    children: [
      { label: "Germany", to: "/study-abroad/germany" },
      { label: "Canada", to: "/study-abroad/canada" },
      { label: "United Kingdom", to: "/study-abroad/uk" },
      { label: "Australia", to: "/study-abroad/australia" },
      { label: "Ireland", to: "/study-abroad/ireland" },
      { label: "USA", to: "/study-abroad/usa" },
      { label: "France", to: "/study-abroad/france" },
    ],
  },
  {
    label: "Work Permit",
    to: "/europe-work-permit",
    children: [
      { label: "Germany", to: "/europe-work-permit/germany" },
      { label: "Poland", to: "/europe-work-permit/poland" },
      { label: "Croatia", to: "/europe-work-permit/croatia" },
      { label: "Hungary", to: "/europe-work-permit/hungary" },
      { label: "Romania", to: "/europe-work-permit/romania" },
    ],
  },
  {
    label: "Visitor Visa",
    to: "/visitor-visa",
    children: [
      { label: "United Kingdom", to: "/visitor-visa/uk" },
      { label: "Schengen", to: "/visitor-visa/schengen" },
      { label: "USA", to: "/visitor-visa/usa" },
      { label: "Australia", to: "/visitor-visa/australia" },
      { label: "Dubai", to: "/visitor-visa/dubai" },
    ],
  },
  { label: "PR & Migration", to: "/pr-migration" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Study Abroad", to: "/study-abroad" },
      { label: "Europe Work Permit", to: "/europe-work-permit" },
      { label: "Visitor Visa", to: "/visitor-visa" },
      { label: "PR & Migration", to: "/pr-migration" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/team" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Popular destinations",
    links: [
      { label: "Study in Germany", to: "/study-abroad/germany" },
      { label: "Study in Canada", to: "/study-abroad/canada" },
      { label: "Study in the UK", to: "/study-abroad/uk" },
      { label: "Study in Australia", to: "/study-abroad/australia" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Refund Policy", to: "/refund" },
    ],
  },
];
