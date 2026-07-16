/**
 * ONE data model → ALL country/service pages (CLAUDE.md architecture).
 * Adding a country = adding one object here. It does NOT mean a new page file.
 * src/pages/CountryPage.tsx renders whatever it finds here.
 *
 * ⚠ CONTENT INTEGRITY (CLAUDE.md, non-negotiable):
 *   - Never invent tuition fees, visa costs, or processing times.
 *   - Every unverified figure is marked // VERIFY and must be confirmed from
 *     official embassy/university sources before launch. A wrong blocked-account
 *     figure is a liability, not a typo.
 *   - Placeholder cost values use "// VERIFY" so they're easy to grep.
 */

export type ServiceKey = "study-abroad" | "work-permit" | "visitor-visa";

export type QuickFact = { label: string; value: string };
export type CostItem = { item: string; amount: string; note?: string };
export type Faq = { q: string; a: string };

export type CountryData = {
  slug: string;
  service: ServiceKey;
  name: string;
  flag: string;
  headline: string;
  subhead: string;
  /** 4 quick facts, above the fold (PRD C-2). */
  quickFacts: QuickFact[];
  /** Concrete reasons, not adjectives (PRD C-3). */
  why: { title: string; body: string }[];
  /** Popular courses (study) or sectors (work) (PRD C-4). */
  offerings: { heading: string; items: string[] };
  /** Answers "can I?" (PRD C-5). */
  eligibility: string[];
  /** Answers "what do I need?" (PRD C-6). */
  documents: string[];
  /** Itemised — specificity is the trust signal (PRD C-7). */
  costs: CostItem[];
  faqs: Faq[];
  seoTitle: string;
  seoDescription: string;
};

const servicePath: Record<ServiceKey, string> = {
  "study-abroad": "/study-abroad",
  "work-permit": "/europe-work-permit",
  "visitor-visa": "/visitor-visa",
};

export const serviceLabel: Record<ServiceKey, string> = {
  "study-abroad": "Study Abroad",
  "work-permit": "Europe Work Permit",
  "visitor-visa": "Visitor Visa",
};

export function countryPath(c: Pick<CountryData, "service" | "slug">): string {
  return `${servicePath[c.service]}/${c.slug}`;
}

/** Costs left as "// VERIFY" until Rahul confirms from official sources. */
const VERIFY = "// VERIFY";

/**
 * Turn a raw data value into something safe to show a visitor. The "// VERIFY"
 * marker keeps figures greppable in source (content-integrity rule) but must
 * never appear literally on the page — it renders as "to be confirmed".
 */
export function displayValue(raw: string): { text: string; unverified: boolean } {
  const unverified = raw.includes("// VERIFY") || raw.trim().startsWith("//");
  const text = raw.replace(/\/\/\s*VERIFY/g, "").trim();
  return { text: text || "To be confirmed", unverified };
}

export const COUNTRIES: CountryData[] = [
  /* ------------------------------ STUDY ABROAD ------------------------------ */
  {
    slug: "germany",
    service: "study-abroad",
    name: "Germany",
    flag: "🇩🇪",
    headline: "Study in Germany from India",
    subhead:
      "Publicly funded universities with low or no tuition fees, strong engineering and tech programmes, and an 18-month post-study job search route.",
    quickFacts: [
      { label: "Tuition (public)", value: `Low / no tuition ${VERIFY}` },
      { label: "Intakes", value: "Winter (Oct) & Summer (Apr)" },
      { label: "Key requirement", value: `Blocked account ${VERIFY}` },
      { label: "Post-study stay", value: `18 months ${VERIFY}` },
    ],
    why: [
      {
        title: "Little to no tuition at public universities",
        body: "Most public universities charge only a small semester contribution rather than full tuition, making Germany one of the most affordable quality destinations. Confirm the exact semester fee for your university.",
      },
      {
        title: "Engineering, IT and applied sciences strength",
        body: "Germany's universities and Fachhochschulen (universities of applied sciences) are globally respected, especially for engineering, computer science and automotive fields.",
      },
      {
        title: "18-month post-study job search visa",
        body: "Graduates can typically stay to look for relevant work after finishing, a strong pathway toward longer-term settlement. Verify current rules before relying on them.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Mechanical & Automotive Engineering",
        "Computer Science & Data Science",
        "Electrical & Electronics Engineering",
        "Management & Business Analytics",
        "Renewable Energy & Environmental Sciences",
      ],
    },
    eligibility: [
      "Recognised bachelor's/12th qualification for the level you're applying to",
      "Proof of English (IELTS/TOEFL) and/or German (for German-taught programmes)",
      "Blocked account showing required living funds (confirm the current amount)",
      "APS certificate where applicable for Indian students",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "Language test scorecard (IELTS/TOEFL/German)",
      "Statement of Purpose & CV",
      "Blocked account confirmation",
      "APS certificate (if required)",
      "University admission letter",
    ],
    costs: [
      { item: "Semester contribution", amount: VERIFY, note: "Per semester, varies by university" },
      { item: "Blocked account (living funds)", amount: VERIFY, note: "Government-set annual amount" },
      { item: "Student visa fee", amount: VERIFY },
      { item: "Health insurance", amount: VERIFY, note: "Mandatory" },
    ],
    faqs: [
      {
        q: "Is studying in Germany really free?",
        a: "Most public universities charge little or no tuition — only a modest semester contribution. You still need to prove you can support yourself via a blocked account. Confirm current figures from official sources.",
      },
      {
        q: "Do I need to know German?",
        a: "Many master's programmes are taught in English, but German helps daily life and part-time work. German-taught programmes require proof of German proficiency.",
      },
      {
        q: "What is a blocked account?",
        a: "A special account where you deposit a set amount to prove you can cover living costs for your first year. The required amount is set by the government and changes periodically.",
      },
    ],
    seoTitle: "Study in Germany from India 2026 — Costs, Universities & Visa | Flyworld India",
    seoDescription:
      "Study in Germany from India: low/no-tuition public universities, blocked account explained, eligibility, documents and honest cost guidance. Book a free consultation.",
  },
  {
    slug: "canada",
    service: "study-abroad",
    name: "Canada",
    flag: "🇨🇦",
    headline: "Study in Canada from India",
    subhead:
      "Globally recognised degrees, generous post-graduation work permits and clear pathways from study to permanent residency.",
    quickFacts: [
      { label: "Tuition / year", value: VERIFY },
      { label: "Intakes", value: "Fall, Winter & Summer" },
      { label: "Key requirement", value: `Proof of funds / GIC ${VERIFY}` },
      { label: "Post-study work", value: `PGWP up to 3 yrs ${VERIFY}` },
    ],
    why: [
      {
        title: "Post-Graduation Work Permit (PGWP)",
        body: "Eligible graduates can work in Canada after their programme, with permit length often tied to course duration — a major reason Canada is popular. Verify current PGWP rules, which change.",
      },
      {
        title: "Clear study-to-PR pathways",
        body: "Canadian work experience can strengthen Express Entry and Provincial Nominee Program profiles, giving many students a realistic route to PR.",
      },
      {
        title: "Safe, welcoming and multicultural",
        body: "Large, established Indian communities in most cities make settling in easier for first-time students abroad.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Business & Management",
        "Computer Science & IT",
        "Healthcare & Nursing",
        "Engineering",
        "Hospitality & Tourism",
      ],
    },
    eligibility: [
      "Completed prior education relevant to the programme level",
      "Proof of English (IELTS/PTE/TOEFL) meeting the institution's minimum",
      "Proof of funds and, where applicable, a GIC",
      "Letter of Acceptance from a Designated Learning Institution (DLI)",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "English test scorecard",
      "Statement of Purpose",
      "Proof of funds / GIC",
      "Letter of Acceptance from a DLI",
    ],
    costs: [
      { item: "Tuition (per year)", amount: VERIFY, note: "Varies widely by programme" },
      { item: "GIC / proof of funds", amount: VERIFY },
      { item: "Study permit fee", amount: VERIFY },
      { item: "Biometrics", amount: VERIFY },
    ],
    faqs: [
      {
        q: "How long can I work after studying in Canada?",
        a: "The Post-Graduation Work Permit length is generally linked to your programme length, subject to current rules. Always verify eligibility for your specific course.",
      },
      {
        q: "What is a GIC?",
        a: "A Guaranteed Investment Certificate is a way to show you have funds for living costs. Requirements and amounts change — confirm the current rules.",
      },
    ],
    seoTitle: "Study in Canada from India 2026 — Costs, PGWP & Visa | Flyworld India",
    seoDescription:
      "Study in Canada from India: universities, PGWP, proof of funds/GIC, eligibility and honest cost guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "uk",
    service: "study-abroad",
    name: "United Kingdom",
    flag: "🇬🇧",
    headline: "Study in the UK from India",
    subhead:
      "One- to two-year degrees at globally ranked universities, plus a Graduate Route that lets you stay and work after you finish.",
    quickFacts: [
      { label: "Tuition / year", value: VERIFY },
      { label: "Intakes", value: "September & January" },
      { label: "Key requirement", value: `Maintenance funds ${VERIFY}` },
      { label: "Post-study work", value: `Graduate Route 2 yrs ${VERIFY}` },
    ],
    why: [
      {
        title: "Shorter, focused degrees",
        body: "Many UK master's are one year, reducing total cost and time compared with two-year programmes elsewhere.",
      },
      {
        title: "Graduate Route",
        body: "Graduates can typically stay to work for a set period after their course. Verify the current duration and conditions.",
      },
      {
        title: "World-renowned institutions",
        body: "The UK hosts many of the world's top-ranked universities across virtually every field.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Business & Finance",
        "Data Science & AI",
        "Law",
        "Public Health",
        "Engineering & Management",
      ],
    },
    eligibility: [
      "Relevant prior qualifications for your chosen level",
      "English proficiency (IELTS/UKVI where required)",
      "Proof of tuition and maintenance funds",
      "CAS (Confirmation of Acceptance for Studies) from your university",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "IELTS/UKVI scorecard",
      "Statement of Purpose",
      "Proof of funds (maintenance)",
      "CAS letter",
    ],
    costs: [
      { item: "Tuition (per year)", amount: VERIFY },
      { item: "Maintenance funds", amount: VERIFY, note: "Depends on location & length" },
      { item: "Student visa fee", amount: VERIFY },
      { item: "Immigration Health Surcharge", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Can I work after my UK degree?",
        a: "The Graduate Route generally allows graduates to stay and work for a set period. Confirm the current rules and duration before applying.",
      },
      {
        q: "Is one-year master's respected?",
        a: "Yes — UK one-year master's degrees are widely recognised by employers globally.",
      },
    ],
    seoTitle: "Study in the UK from India 2026 — Costs, Graduate Route & Visa | Flyworld India",
    seoDescription:
      "Study in the UK from India: universities, Graduate Route, maintenance funds, eligibility and honest cost guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "australia",
    service: "study-abroad",
    name: "Australia",
    flag: "🇦🇺",
    headline: "Study in Australia from India",
    subhead:
      "High-quality education, strong post-study work rights and a lifestyle that draws students from across the world.",
    quickFacts: [
      { label: "Tuition / year", value: VERIFY },
      { label: "Intakes", value: "February & July" },
      { label: "Key requirement", value: `GTE + funds ${VERIFY}` },
      { label: "Post-study work", value: `2–4 yrs ${VERIFY}` },
    ],
    why: [
      {
        title: "Strong post-study work rights",
        body: "Temporary Graduate visas let eligible graduates stay and work, with duration often depending on qualification and location. Verify current settings.",
      },
      {
        title: "Globally ranked universities",
        body: "Australia's leading universities perform strongly in global rankings across many disciplines.",
      },
      {
        title: "Regional study incentives",
        body: "Studying in designated regional areas can offer additional benefits. Confirm current policies.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Information Technology",
        "Nursing & Healthcare",
        "Engineering",
        "Accounting & Business",
        "Hospitality Management",
      ],
    },
    eligibility: [
      "Relevant prior education for your chosen course",
      "English proficiency (IELTS/PTE)",
      "Genuine Temporary Entrant (GTE) requirement met",
      "Proof of funds and Confirmation of Enrolment (CoE)",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "English test scorecard",
      "Statement of Purpose / GTE statement",
      "Proof of funds",
      "Confirmation of Enrolment (CoE)",
    ],
    costs: [
      { item: "Tuition (per year)", amount: VERIFY },
      { item: "Living funds", amount: VERIFY },
      { item: "Student visa fee", amount: VERIFY },
      { item: "OSHC health cover", amount: VERIFY, note: "Mandatory" },
    ],
    faqs: [
      {
        q: "What is the GTE requirement?",
        a: "The Genuine Temporary Entrant requirement asks you to show you intend to study genuinely. We help you prepare a clear, honest statement.",
      },
    ],
    seoTitle: "Study in Australia from India 2026 — Costs, Work Rights & Visa | Flyworld India",
    seoDescription:
      "Study in Australia from India: universities, post-study work, GTE, proof of funds and honest cost guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "ireland",
    service: "study-abroad",
    name: "Ireland",
    flag: "🇮🇪",
    headline: "Study in Ireland from India",
    subhead:
      "An English-speaking EU hub for tech and pharma, with a well-known post-study stay-back option.",
    quickFacts: [
      { label: "Tuition / year", value: VERIFY },
      { label: "Intakes", value: "September & January" },
      { label: "Key requirement", value: `Proof of funds ${VERIFY}` },
      { label: "Post-study stay", value: `Up to 2 yrs ${VERIFY}` },
    ],
    why: [
      {
        title: "European tech & pharma hub",
        body: "Many global technology and pharmaceutical companies base European operations in Ireland, creating relevant graduate opportunities.",
      },
      {
        title: "Third Level Graduate Programme",
        body: "Eligible graduates can stay to seek employment for a set period. Verify current duration and eligibility.",
      },
      {
        title: "English-speaking EU country",
        body: "Study and work in English within the EU, with a welcoming environment for international students.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Computer Science & Data Analytics",
        "Pharmaceutical & Life Sciences",
        "Business & Finance",
        "Engineering",
      ],
    },
    eligibility: [
      "Relevant prior qualifications",
      "English proficiency (IELTS/PTE)",
      "Proof of funds for tuition and living costs",
      "Offer letter from an Irish institution",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "English test scorecard",
      "Statement of Purpose",
      "Proof of funds",
      "Offer letter",
    ],
    costs: [
      { item: "Tuition (per year)", amount: VERIFY },
      { item: "Living funds", amount: VERIFY },
      { item: "Visa / immigration fee", amount: VERIFY },
      { item: "IRP registration", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Can I stay and work after studying in Ireland?",
        a: "The Third Level Graduate Programme lets eligible graduates remain to seek work for a set period. Confirm the current rules.",
      },
    ],
    seoTitle: "Study in Ireland from India 2026 — Costs, Stay-Back & Visa | Flyworld India",
    seoDescription:
      "Study in Ireland from India: tech & pharma hub, graduate stay-back, proof of funds and honest cost guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "usa",
    service: "study-abroad",
    name: "USA",
    flag: "🇺🇸",
    headline: "Study in the USA from India",
    subhead:
      "The widest choice of universities and specialisations in the world, with OPT work opportunities after graduation.",
    quickFacts: [
      { label: "Tuition / year", value: VERIFY },
      { label: "Intakes", value: "Fall & Spring" },
      { label: "Key requirement", value: `I-20 + funds ${VERIFY}` },
      { label: "Post-study work", value: `OPT (STEM extension) ${VERIFY}` },
    ],
    why: [
      {
        title: "Unmatched choice and research",
        body: "Thousands of universities offer enormous flexibility in majors, specialisations and research opportunities.",
      },
      {
        title: "Optional Practical Training (OPT)",
        body: "Graduates can gain work experience via OPT, with a possible extension for STEM fields. Verify current rules.",
      },
      {
        title: "Scholarships & assistantships",
        body: "Many programmes offer funding, assistantships or scholarships that can significantly offset costs.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Computer Science & AI",
        "Data Science & Analytics",
        "Engineering (all branches)",
        "Business (MBA/MS)",
        "Health Sciences",
      ],
    },
    eligibility: [
      "Relevant prior education for your level",
      "English proficiency (IELTS/TOEFL) and often GRE/GMAT",
      "Financial documents covering tuition and living costs",
      "Form I-20 from a SEVP-approved school",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "English (and GRE/GMAT where needed) scores",
      "Statement of Purpose & LORs",
      "Financial documents",
      "Form I-20",
    ],
    costs: [
      { item: "Tuition (per year)", amount: VERIFY },
      { item: "Living costs (per year)", amount: VERIFY },
      { item: "SEVIS fee", amount: VERIFY },
      { item: "Visa (DS-160) fee", amount: VERIFY },
    ],
    faqs: [
      {
        q: "What is OPT?",
        a: "Optional Practical Training lets F-1 students work in their field after graduation, with a STEM extension for eligible courses. Rules change — always verify.",
      },
      {
        q: "Do I need GRE or GMAT?",
        a: "It depends on the programme. Many still require them; some have made them optional. We check each university's current requirement.",
      },
    ],
    seoTitle: "Study in the USA from India 2026 — Costs, OPT & F-1 Visa | Flyworld India",
    seoDescription:
      "Study in the USA from India: universities, OPT/STEM, I-20, financial documents and honest cost guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "france",
    service: "study-abroad",
    name: "France",
    flag: "🇫🇷",
    headline: "Study in France from India",
    subhead:
      "Affordable public education, strong business and engineering schools, and a growing range of English-taught programmes.",
    quickFacts: [
      { label: "Tuition (public)", value: VERIFY },
      { label: "Intakes", value: "September & January" },
      { label: "Key requirement", value: `Campus France + funds ${VERIFY}` },
      { label: "Post-study stay", value: `APS up to 2 yrs ${VERIFY}` },
    ],
    why: [
      {
        title: "Affordable public universities",
        body: "Public institutions charge relatively low tuition, and many English-taught programmes are now available.",
      },
      {
        title: "Highly ranked business & engineering schools",
        body: "France is home to globally ranked Grandes Écoles and business schools.",
      },
      {
        title: "Post-study residence permit (APS)",
        body: "Graduates can apply for a temporary residence permit to seek work. Verify current duration and conditions.",
      },
    ],
    offerings: {
      heading: "Popular courses",
      items: [
        "Business & Management",
        "Engineering",
        "Fashion & Luxury Management",
        "Computer Science",
        "Culinary & Hospitality",
      ],
    },
    eligibility: [
      "Relevant prior education",
      "English and/or French proficiency depending on programme",
      "Campus France procedure completed",
      "Proof of funds and admission letter",
    ],
    documents: [
      "Valid passport",
      "Academic transcripts & certificates",
      "Language test scores",
      "Statement of Purpose",
      "Proof of funds",
      "Campus France & admission documents",
    ],
    costs: [
      { item: "Tuition (public)", amount: VERIFY },
      { item: "Living funds", amount: VERIFY },
      { item: "Campus France fee", amount: VERIFY },
      { item: "Visa fee", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Do I need to speak French?",
        a: "Not always — many programmes are taught in English. French helps with daily life and part-time work, and is required for French-taught courses.",
      },
    ],
    seoTitle: "Study in France from India 2026 — Costs, Campus France & Visa | Flyworld India",
    seoDescription:
      "Study in France from India: affordable public universities, business & engineering schools, Campus France and honest cost guidance. Free consultation.",
  },

  /* --------------------------- EUROPE WORK PERMIT --------------------------- */
  {
    slug: "germany",
    service: "work-permit",
    name: "Germany",
    flag: "🇩🇪",
    headline: "Germany Work Permit from India",
    subhead:
      "Skilled worker and EU Blue Card routes for qualified professionals, in one of Europe's strongest economies.",
    quickFacts: [
      { label: "Route", value: "Skilled Worker / EU Blue Card" },
      { label: "Processing", value: VERIFY },
      { label: "Key requirement", value: "Recognised qualification + job offer" },
      { label: "Family", value: `Dependents allowed ${VERIFY}` },
    ],
    why: [
      {
        title: "EU Blue Card for professionals",
        body: "Qualified professionals with a suitable job offer and salary may qualify for the EU Blue Card, a fast route with strong rights. Verify current salary thresholds.",
      },
      {
        title: "Skilled worker shortage occupations",
        body: "Germany actively recruits in shortage fields such as IT, engineering, healthcare and skilled trades.",
      },
      {
        title: "Path to settlement",
        body: "Time on qualifying permits can count toward long-term residence. Confirm current settlement rules.",
      },
    ],
    offerings: {
      heading: "In-demand sectors",
      items: ["IT & Software", "Engineering", "Healthcare & Nursing", "Skilled Trades", "Logistics"],
    },
    eligibility: [
      "Recognised qualification or relevant experience",
      "A concrete job offer / employment contract",
      "Salary meeting the applicable threshold (for Blue Card)",
      "Language ability as required by employer/role",
    ],
    documents: [
      "Valid passport",
      "Qualification certificates (with recognition where needed)",
      "Employment contract / job offer",
      "CV and references",
      "Proof of language ability (if required)",
    ],
    costs: [
      { item: "Visa / permit fee", amount: VERIFY },
      { item: "Qualification recognition", amount: VERIFY, note: "If applicable" },
      { item: "Document translation", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Do I need a job offer first?",
        a: "For most work routes, yes — a concrete job offer or contract is central. We assess your profile honestly before you commit.",
      },
      {
        q: "Is my Indian degree recognised?",
        a: "Some roles require formal recognition of your qualification. We help you check whether recognition is needed for your field.",
      },
    ],
    seoTitle: "Germany Work Permit from India — Blue Card & Skilled Worker Visa | Flyworld India",
    seoDescription:
      "Germany work permit from India: EU Blue Card and skilled worker routes, eligibility, documents and honest guidance. Free assessment with Flyworld India.",
  },
  {
    slug: "poland",
    service: "work-permit",
    name: "Poland",
    flag: "🇵🇱",
    headline: "Poland Work Permit from India",
    subhead:
      "A growing Central European economy with demand for skilled and semi-skilled workers across manufacturing and services.",
    quickFacts: [
      { label: "Route", value: "Type A work permit" },
      { label: "Processing", value: VERIFY },
      { label: "Key requirement", value: "Employer sponsorship" },
      { label: "EU access", value: "Schengen area" },
    ],
    why: [
      {
        title: "Strong labour demand",
        body: "Poland's economy has ongoing demand across manufacturing, logistics and construction sectors.",
      },
      {
        title: "Access across the EU",
        body: "As a Schengen member, Poland offers access to travel across much of Europe.",
      },
      {
        title: "Lower cost of living",
        body: "Relative to Western Europe, living costs can be more manageable while you establish yourself.",
      },
    ],
    offerings: {
      heading: "In-demand sectors",
      items: ["Manufacturing", "Logistics & Warehousing", "Construction", "Hospitality", "IT"],
    },
    eligibility: [
      "A genuine job offer from a Polish employer",
      "Relevant skills or experience for the role",
      "Employer-obtained work permit / declaration",
      "Valid travel documents",
    ],
    documents: [
      "Valid passport",
      "Job offer / employment contract",
      "Work permit issued via employer",
      "Qualification / experience proof",
      "Medical and insurance documents as required",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY },
      { item: "Work permit processing", amount: VERIFY },
      { item: "Document translation & legalisation", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Can Flyworld guarantee a job in Poland?",
        a: "No — and be wary of anyone who does. We help genuine, eligible candidates with documentation and process. Employment depends on a real employer offer.",
      },
    ],
    seoTitle: "Poland Work Permit from India — Type A Work Visa | Flyworld India",
    seoDescription:
      "Poland work permit from India: employer-sponsored routes, eligibility, documents and honest guidance. Free assessment with Flyworld India.",
  },
  {
    slug: "croatia",
    service: "work-permit",
    name: "Croatia",
    flag: "🇭🇷",
    headline: "Croatia Work Permit from India",
    subhead:
      "A newer Schengen member with seasonal and year-round demand in tourism, hospitality and construction.",
    quickFacts: [
      { label: "Route", value: "Residence & work permit" },
      { label: "Processing", value: VERIFY },
      { label: "Key requirement", value: "Employer job offer" },
      { label: "EU access", value: "Schengen member" },
    ],
    why: [
      {
        title: "Schengen access",
        body: "Croatia's Schengen membership adds travel flexibility across Europe.",
      },
      {
        title: "Tourism & hospitality demand",
        body: "A strong tourism sector drives seasonal and year-round hospitality roles.",
      },
      {
        title: "Construction & trades",
        body: "Ongoing demand for skilled and semi-skilled construction workers.",
      },
    ],
    offerings: {
      heading: "In-demand sectors",
      items: ["Hospitality & Tourism", "Construction", "Manufacturing", "Logistics"],
    },
    eligibility: [
      "A genuine job offer from a Croatian employer",
      "Relevant experience for the role",
      "Employer-supported residence & work permit",
      "Valid travel documents",
    ],
    documents: [
      "Valid passport",
      "Employment contract / job offer",
      "Residence & work permit documentation",
      "Experience / qualification proof",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY },
      { item: "Permit processing", amount: VERIFY },
      { item: "Translation & legalisation", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Is Croatia in the Schengen area?",
        a: "Yes. This can add travel flexibility, subject to the usual rules. We confirm current details as part of your assessment.",
      },
    ],
    seoTitle: "Croatia Work Permit from India — Residence & Work Visa | Flyworld India",
    seoDescription:
      "Croatia work permit from India: employer-sponsored hospitality and construction routes, eligibility and honest guidance. Free assessment.",
  },
  {
    slug: "hungary",
    service: "work-permit",
    name: "Hungary",
    flag: "🇭🇺",
    headline: "Hungary Work Permit from India",
    subhead:
      "A Central European manufacturing hub with structured work-permit routes for skilled workers.",
    quickFacts: [
      { label: "Route", value: "Work & residence permit" },
      { label: "Processing", value: VERIFY },
      { label: "Key requirement", value: "Employer sponsorship" },
      { label: "EU access", value: "Schengen member" },
    ],
    why: [
      {
        title: "Manufacturing & automotive base",
        body: "Hungary hosts significant automotive and manufacturing operations with related labour demand.",
      },
      {
        title: "Central European location",
        body: "Well connected within the EU and Schengen area.",
      },
      {
        title: "Structured permit routes",
        body: "Defined work and residence permit processes for eligible, sponsored workers.",
      },
    ],
    offerings: {
      heading: "In-demand sectors",
      items: ["Automotive & Manufacturing", "Logistics", "Construction", "Hospitality"],
    },
    eligibility: [
      "A genuine job offer from a Hungarian employer",
      "Relevant skills/experience",
      "Employer-supported work & residence permit",
      "Valid travel documents",
    ],
    documents: [
      "Valid passport",
      "Employment contract / job offer",
      "Work & residence permit documentation",
      "Qualification / experience proof",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY },
      { item: "Permit processing", amount: VERIFY },
      { item: "Translation & legalisation", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Do I need an employer before applying?",
        a: "Yes — a genuine job offer underpins the process. We assess eligibility honestly before you proceed.",
      },
    ],
    seoTitle: "Hungary Work Permit from India — Work & Residence Visa | Flyworld India",
    seoDescription:
      "Hungary work permit from India: employer-sponsored manufacturing and logistics routes, eligibility and honest guidance. Free assessment.",
  },
  {
    slug: "romania",
    service: "work-permit",
    name: "Romania",
    flag: "🇷🇴",
    headline: "Romania Work Permit from India",
    subhead:
      "A fast-growing EU economy with demand across construction, manufacturing and services.",
    quickFacts: [
      { label: "Route", value: "Work authorisation + visa" },
      { label: "Processing", value: VERIFY },
      { label: "Key requirement", value: "Employer work authorisation" },
      { label: "EU access", value: `EU member ${VERIFY}` },
    ],
    why: [
      {
        title: "Growing labour market",
        body: "Romania has expanding demand across several skilled and semi-skilled sectors.",
      },
      {
        title: "EU membership",
        body: "Membership brings structured processes and opportunities within the EU framework.",
      },
      {
        title: "Manageable living costs",
        body: "Living costs can be lower than in Western Europe while you build experience.",
      },
    ],
    offerings: {
      heading: "In-demand sectors",
      items: ["Construction", "Manufacturing", "Logistics", "Hospitality", "IT"],
    },
    eligibility: [
      "A genuine job offer from a Romanian employer",
      "Relevant experience for the role",
      "Employer-obtained work authorisation",
      "Valid travel documents",
    ],
    documents: [
      "Valid passport",
      "Employment contract / job offer",
      "Work authorisation documents",
      "Qualification / experience proof",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY },
      { item: "Work authorisation processing", amount: VERIFY },
      { item: "Translation & legalisation", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Can outcomes be guaranteed?",
        a: "No genuine consultant guarantees a visa or job. We help eligible candidates with process and documentation, honestly.",
      },
    ],
    seoTitle: "Romania Work Permit from India — Work Authorisation & Visa | Flyworld India",
    seoDescription:
      "Romania work permit from India: employer-sponsored routes across construction and manufacturing, eligibility and honest guidance. Free assessment.",
  },

  /* ------------------------------ VISITOR VISA ------------------------------ */
  {
    slug: "uk",
    service: "visitor-visa",
    name: "United Kingdom",
    flag: "🇬🇧",
    headline: "UK Visitor Visa from India",
    subhead:
      "Standard Visitor visas for tourism, visiting family, or business — with documentation done right the first time.",
    quickFacts: [
      { label: "Visa type", value: "Standard Visitor" },
      { label: "Processing", value: VERIFY },
      { label: "Validity", value: `6 months / longer ${VERIFY}` },
      { label: "Key requirement", value: "Clear funds & ties to India" },
    ],
    why: [
      {
        title: "Right documentation, first time",
        body: "The most common reason visitor visas are refused is weak or inconsistent documentation. We help you get it right.",
      },
      {
        title: "Clear financial story",
        body: "We help you present consistent proof of funds and strong ties to India.",
      },
      {
        title: "Honest assessment",
        body: "If your profile needs strengthening before applying, we tell you — rather than filing a weak application.",
      },
    ],
    offerings: {
      heading: "Common purposes",
      items: ["Tourism", "Visiting family/friends", "Business meetings", "Short courses/events"],
    },
    eligibility: [
      "Genuine intention to visit and return",
      "Sufficient funds for the trip",
      "Strong ties to India (job, family, assets)",
      "Valid travel history helps but isn't mandatory",
    ],
    documents: [
      "Valid passport",
      "Bank statements & proof of funds",
      "Employment / business proof",
      "Travel itinerary & accommodation",
      "Invitation letter (if visiting someone)",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY, note: "Varies by duration" },
      { item: "Immigration Health Surcharge", amount: VERIFY, note: "If applicable" },
    ],
    faqs: [
      {
        q: "Why do UK visitor visas get refused?",
        a: "Most often due to unclear finances or weak evidence of ties to India. We focus precisely on these areas to give you the best genuine chance.",
      },
    ],
    seoTitle: "UK Visitor Visa from India — Documents & Requirements | Flyworld India",
    seoDescription:
      "UK visitor visa from India: documentation, proof of funds, eligibility and honest guidance to avoid common refusals. Free consultation with Flyworld India.",
  },
  {
    slug: "schengen",
    service: "visitor-visa",
    name: "Schengen",
    flag: "🇪🇺",
    headline: "Schengen Visitor Visa from India",
    subhead:
      "One visa, many European countries. We help you apply through the right embassy with clean, consistent documents.",
    quickFacts: [
      { label: "Visa type", value: "Schengen short-stay (Type C)" },
      { label: "Processing", value: VERIFY },
      { label: "Stay", value: `Up to 90/180 days ${VERIFY}` },
      { label: "Key requirement", value: "Itinerary, funds, insurance" },
    ],
    why: [
      {
        title: "Apply through the correct country",
        body: "Schengen rules require applying via your main destination or first entry. We help you get this right to avoid rejections.",
      },
      {
        title: "Travel insurance & itinerary",
        body: "We help you assemble compliant travel insurance, bookings and a coherent itinerary.",
      },
      {
        title: "Consistent financials",
        body: "Clean, consistent proof of funds is central to approval.",
      },
    ],
    offerings: {
      heading: "Common purposes",
      items: ["Tourism across Europe", "Visiting family/friends", "Business", "Events & conferences"],
    },
    eligibility: [
      "Genuine short-stay purpose and intent to return",
      "Sufficient funds for the trip",
      "Valid travel medical insurance",
      "Confirmed itinerary and accommodation",
    ],
    documents: [
      "Valid passport",
      "Bank statements & proof of funds",
      "Travel insurance",
      "Flight & hotel bookings / itinerary",
      "Employment / business proof",
      "Invitation letter (if applicable)",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY },
      { item: "Travel insurance", amount: VERIFY, note: "Mandatory" },
      { item: "VFS / service charges", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Which country should I apply to?",
        a: "Generally the country of your main destination, or your first point of entry if evenly split. We help you determine the correct one.",
      },
    ],
    seoTitle: "Schengen Visitor Visa from India — Documents & Requirements | Flyworld India",
    seoDescription:
      "Schengen visitor visa from India: correct embassy routing, travel insurance, proof of funds and honest guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "usa",
    service: "visitor-visa",
    name: "USA",
    flag: "🇺🇸",
    headline: "USA Visitor Visa (B1/B2) from India",
    subhead:
      "Tourist and business visitor visas, with honest preparation for the DS-160 and the consular interview.",
    quickFacts: [
      { label: "Visa type", value: "B1/B2" },
      { label: "Processing", value: `Interview-based ${VERIFY}` },
      { label: "Validity", value: VERIFY },
      { label: "Key requirement", value: "Strong ties & clear purpose" },
    ],
    why: [
      {
        title: "Interview preparation",
        body: "The consular interview is decisive. We help you prepare honest, clear answers and organised documents.",
      },
      {
        title: "Accurate DS-160",
        body: "Errors on the DS-160 cause avoidable problems. We help you complete it accurately.",
      },
      {
        title: "Demonstrating ties",
        body: "Showing strong ties to India is central. We help you present them credibly.",
      },
    ],
    offerings: {
      heading: "Common purposes",
      items: ["Tourism", "Visiting family/friends", "Business meetings", "Medical treatment"],
    },
    eligibility: [
      "Genuine temporary-visit intent",
      "Strong ties to India (work, family, assets)",
      "Ability to fund the trip",
      "Clear, consistent purpose of travel",
    ],
    documents: [
      "Valid passport",
      "DS-160 confirmation",
      "Proof of funds",
      "Employment / business proof",
      "Ties-to-India evidence",
      "Invitation / itinerary (if applicable)",
    ],
    costs: [
      { item: "Visa (MRV) fee", amount: VERIFY },
      { item: "Other service charges", amount: VERIFY },
    ],
    faqs: [
      {
        q: "Can you guarantee a US visa?",
        a: "No. The decision rests entirely with the consular officer. We help you prepare honestly and thoroughly to give your genuine application its best chance.",
      },
    ],
    seoTitle: "USA Visitor Visa (B1/B2) from India — Interview & Documents | Flyworld India",
    seoDescription:
      "US B1/B2 visitor visa from India: DS-160, interview preparation, ties to India and honest guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "australia",
    service: "visitor-visa",
    name: "Australia",
    flag: "🇦🇺",
    headline: "Australia Visitor Visa from India",
    subhead:
      "Visitor visas (subclass 600) for tourism or visiting family, prepared to meet the genuine-visitor requirement.",
    quickFacts: [
      { label: "Visa type", value: "Subclass 600" },
      { label: "Processing", value: VERIFY },
      { label: "Stay", value: VERIFY },
      { label: "Key requirement", value: "Genuine visitor + funds" },
    ],
    why: [
      {
        title: "Meeting the genuine-visitor test",
        body: "We help you present a clear, honest case that you intend a genuine temporary visit.",
      },
      {
        title: "Financial evidence",
        body: "Consistent proof of funds strengthens your application.",
      },
      {
        title: "Family-visit support",
        body: "Guidance on invitation letters and supporting documents when visiting relatives.",
      },
    ],
    offerings: {
      heading: "Common purposes",
      items: ["Tourism", "Visiting family/friends", "Business visitor activities"],
    },
    eligibility: [
      "Genuine temporary-visit intent",
      "Sufficient funds",
      "Strong ties to India",
      "Health and character requirements met",
    ],
    documents: [
      "Valid passport",
      "Proof of funds",
      "Employment / business proof",
      "Itinerary & accommodation",
      "Invitation letter (if applicable)",
    ],
    costs: [
      { item: "Visa application charge", amount: VERIFY },
      { item: "Other charges (if any)", amount: VERIFY },
    ],
    faqs: [
      {
        q: "What is the genuine visitor requirement?",
        a: "You must show you intend a genuine, temporary visit and will comply with visa conditions. We help you present this honestly.",
      },
    ],
    seoTitle: "Australia Visitor Visa (Subclass 600) from India | Flyworld India",
    seoDescription:
      "Australia visitor visa from India: subclass 600, genuine-visitor evidence, proof of funds and honest guidance. Free consultation with Flyworld India.",
  },
  {
    slug: "dubai",
    service: "visitor-visa",
    name: "Dubai",
    flag: "🇦🇪",
    headline: "Dubai Visit Visa from India",
    subhead:
      "Fast, straightforward tourist visas for the UAE — ideal for holidays, shopping and family visits.",
    quickFacts: [
      { label: "Visa type", value: "Tourist / Visit" },
      { label: "Processing", value: `Often quick ${VERIFY}` },
      { label: "Options", value: `30 / 60 days ${VERIFY}` },
      { label: "Key requirement", value: "Passport & photo" },
    ],
    why: [
      {
        title: "Simple, quick process",
        body: "UAE tourist visas are typically among the more straightforward to obtain. We handle the paperwork for you.",
      },
      {
        title: "Flexible durations",
        body: "Different validity and stay options to suit your trip. Confirm current options.",
      },
      {
        title: "Family & group trips",
        body: "We help families and groups apply together smoothly.",
      },
    ],
    offerings: {
      heading: "Common purposes",
      items: ["Tourism & holidays", "Shopping trips", "Visiting family/friends", "Short business visits"],
    },
    eligibility: [
      "Valid passport with sufficient validity",
      "Confirmed travel plans",
      "Basic supporting documents",
    ],
    documents: [
      "Valid passport",
      "Passport-size photograph",
      "Confirmed flight booking",
      "Accommodation details",
    ],
    costs: [
      { item: "Visa fee", amount: VERIFY, note: "Varies by duration" },
      { item: "Service charges", amount: VERIFY },
    ],
    faqs: [
      {
        q: "How long does a Dubai visit visa take?",
        a: "UAE tourist visas are often processed quickly, but timelines vary. We share current expectations when you enquire.",
      },
    ],
    seoTitle: "Dubai Visit Visa from India — Tourist Visa Assistance | Flyworld India",
    seoDescription:
      "Dubai / UAE tourist visa from India: simple process, flexible durations and full documentation support. Free consultation with Flyworld India.",
  },
];

/** Look up a page by service + slug. */
export function getCountry(service: ServiceKey, slug: string): CountryData | undefined {
  return COUNTRIES.find((c) => c.service === service && c.slug === slug);
}

/** All entries for a given service (for the hub pages). */
export function countriesByService(service: ServiceKey): CountryData[] {
  return COUNTRIES.filter((c) => c.service === service);
}
