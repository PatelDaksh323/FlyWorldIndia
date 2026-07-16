/**
 * Blog posts. Phase 1 ships a handful of migrated/curated posts (max 6 on the
 * homepage — PRD H-9); full migration is Phase 2. Content is illustrative and
 * should be replaced with the proofread, migrated posts before launch.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO — display only, no runtime Date needed
  readMins: number;
  body: string[]; // simple paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "study-in-germany-from-india-2026",
    title: "Study in Germany from India: the honest 2026 guide",
    excerpt:
      "Public universities with low or no tuition, the blocked account explained, and who Germany actually suits.",
    category: "Study Abroad",
    date: "2026-06-28",
    readMins: 8,
    body: [
      "Germany remains one of the most cost-effective study destinations for Indian students, largely because most public universities charge little or no tuition fee. But 'free' is only part of the picture — you still need to prove you can support yourself.",
      "The blocked account (Sperrkonto) is the mechanism the German authorities use to confirm this. The required amount is set by the government and changes periodically, so always confirm the current figure from an official source before you plan your finances.",
      "Germany suits students who are comfortable with a structured, academically rigorous system and, for many programmes, some German language ability. If that's you, the return on investment is hard to beat.",
    ],
  },
  {
    slug: "canada-vs-australia-for-indian-students",
    title: "Canada vs Australia: which is right for you?",
    excerpt:
      "Post-study work rights, cost of living and PR pathways compared — without the sales pitch.",
    category: "Study Abroad",
    date: "2026-06-10",
    readMins: 7,
    body: [
      "Both Canada and Australia are popular with Indian students, and both offer strong post-study work rights. The right choice depends on your field, budget and long-term plans.",
      "This guide walks through the trade-offs so you can decide with clear eyes. For figures on fees, living costs and visa requirements, we always point you to official government sources rather than quoting numbers that go out of date.",
    ],
  },
  {
    slug: "europe-work-permit-explained",
    title: "Europe work permits explained: routes beyond the usual",
    excerpt:
      "Germany, Poland, Croatia, Hungary and Romania each have different skilled-worker routes. Here's how they differ.",
    category: "Work Permit",
    date: "2026-05-22",
    readMins: 6,
    body: [
      "Europe is not one immigration system — each country runs its own work-permit routes with different eligibility rules, timelines and costs.",
      "We start every work-permit enquiry with an honest eligibility check. If a route isn't realistic for your profile, we'll tell you before you spend money on it.",
    ],
  },
  {
    slug: "avoiding-immigration-scams-india",
    title: "How to tell a genuine consultant from a scam",
    excerpt:
      "The fear of being scammed is legitimate. Here are the checks that protect you.",
    category: "Guidance",
    date: "2026-05-05",
    readMins: 5,
    body: [
      "Immigration fraud is a real and widespread problem, and being cautious is sensible. A genuine consultant is transparent about costs, never guarantees a visa, and is happy to meet you at a real office.",
      "Ask for details in writing, verify the company's registration, and be wary of anyone who promises a guaranteed outcome. Visa decisions rest with governments — no consultant can guarantee them.",
    ],
  },
  {
    slug: "sop-writing-that-works",
    title: "Writing an SOP that actually gets read",
    excerpt: "Admissions officers skim. Here's how to make your statement of purpose land.",
    category: "Study Abroad",
    date: "2026-04-18",
    readMins: 6,
    body: [
      "Your statement of purpose is often the only place you speak in your own voice. A strong SOP is specific, honest and structured — it answers why this course, why this country, and why now.",
      "We help you draft and refine your SOP so it reflects you accurately, without exaggeration that could raise red flags at the visa stage.",
    ],
  },
  {
    slug: "visitor-visa-financial-proof",
    title: "Visitor visas: getting the financial proof right",
    excerpt: "The single most common reason visitor visas get refused — and how to avoid it.",
    category: "Visitor Visa",
    date: "2026-04-02",
    readMins: 5,
    body: [
      "Weak or inconsistent financial documentation is one of the most common reasons visitor visa applications are refused.",
      "We help you assemble clean, consistent proof of funds and ties to India so your application tells a clear, credible story.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
