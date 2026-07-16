import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { site } from "@/config/site";

type Doc = "privacy" | "terms" | "refund";

type LegalContent = {
  title: string;
  path: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

/**
 * ⚠ These are plain-language STARTER policies for layout and structure. Have
 * them reviewed and adapted to Flyworld's actual practices (and applicable law)
 * before launch. Do not treat as legal advice.
 */
const DOCS: Record<Doc, LegalContent> = {
  privacy: {
    title: "Privacy Policy",
    path: "/privacy",
    intro:
      "This policy explains what personal information Flyworld India collects, why, and how we protect it. We collect only what we need to help you.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you submit an enquiry, we collect your name, mobile number, city and the service you're interested in. We may also record which page you enquired from, to understand how people find us.",
          "We do not collect payment information through this website.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details solely to respond to your enquiry and provide the guidance you asked for. A counsellor may contact you by phone, WhatsApp or email.",
          "We never sell your personal information.",
        ],
      },
      {
        heading: "How we protect it",
        body: [
          "Enquiries are stored securely with access-controlled database policies. Only authorised Flyworld staff can view them.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to update or delete your details at any time by contacting us using the details on our Contact page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    path: "/terms",
    intro:
      "By using this website, you agree to these terms. They're written plainly on purpose.",
    sections: [
      {
        heading: "Guidance, not guarantees",
        body: [
          "Flyworld India provides consultancy and guidance. We do not, and cannot, guarantee any visa, admission, work permit or PR outcome — those decisions rest entirely with the relevant government authorities and institutions.",
        ],
      },
      {
        heading: "Accuracy of information",
        body: [
          "We work to keep information on this site accurate and current, but rules, fees and timelines change. Always confirm current requirements from official sources before acting.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "You agree to provide honest, accurate information. Applications based on false documents or information can be refused and may carry serious consequences.",
        ],
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    path: "/refund",
    intro:
      "This policy explains how fees and refunds work. Specific terms are confirmed in your service agreement.",
    sections: [
      {
        heading: "Service fees",
        body: [
          "Our consultancy fees cover the professional services we provide — assessment, documentation, application preparation and support — regardless of the final decision made by an authority.",
        ],
      },
      {
        heading: "Third-party fees",
        body: [
          "Government, embassy, application, biometric and similar fees are paid to those bodies directly or on your behalf and are generally non-refundable once incurred.",
        ],
      },
      {
        heading: "Refund requests",
        body: [
          "Any refund eligibility depends on the stage of service delivered and the terms of your signed agreement. Contact us to discuss your specific situation.",
        ],
      },
    ],
  },
};

export default function Legal({ doc }: { doc: Doc }) {
  const content = DOCS[doc];
  const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: content.title }];

  return (
    <>
      <Seo
        title={`${content.title} | Flyworld India`}
        description={content.intro}
        path={content.path}
        jsonLd={breadcrumbJsonLd(crumbs, site.url)}
        noindex
      />

      <PageHero eyebrow="Legal" title={content.title} subtitle={content.intro} crumbs={crumbs} />

      <section className="container max-w-3xl section">
        <div className="space-y-10">
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-xl2 border border-white/10 bg-white/[0.03] p-4 text-xs text-muted">
          This is a starter policy provided for structure. Please review and adapt
          it to Flyworld India's actual practices and applicable law before launch.
        </p>
      </section>
    </>
  );
}
