import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHero from "@/components/shared/PageHero";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import { site, whatsappLink, telLink } from "@/config/site";

const crumbs: Crumb[] = [{ label: "Home", to: "/" }, { label: "Contact" }];

export default function Contact() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: `${site.url}/contact`,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <Seo
        title="Contact Flyworld India — Book a Free Consultation in Ahmedabad"
        description="Get in touch with Flyworld India. Call, WhatsApp or send an enquiry for study abroad, work permits, visitor visas and PR. We reply quickly."
        path="/contact"
        jsonLd={[localBusinessJsonLd, breadcrumbJsonLd(crumbs, site.url)]}
      />

      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        subtitle="The fastest way to reach us is WhatsApp — that's our real front door. Or send the form and a counsellor will call you back, usually within one working day."
        crumbs={crumbs}
      />

      <section className="container section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Contact details */}
          <div className="space-y-6">
            <a
              href={whatsappLink("Hi Flyworld India, I'd like to book a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 transition-colors hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold">WhatsApp us</div>
                <div className="text-sm text-muted">Fastest reply — tap to chat</div>
              </div>
            </a>

            <a href={telLink()} className="card flex items-center gap-4 transition-colors hover:border-gold/40">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold">Call us</div>
                <div className="text-sm text-muted">{site.phone}</div>
              </div>
            </a>

            <a href={`mailto:${site.email}`} className="card flex items-center gap-4 transition-colors hover:border-gold/40">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold">Email us</div>
                <div className="text-sm text-muted">{site.email}</div>
              </div>
            </a>

            <div className="card space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <div className="font-semibold">Visit our office</div>
                  <div className="text-sm text-muted">{site.address.line}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <div className="font-semibold">Opening hours</div>
                  <div className="text-sm text-muted">{site.address.hours}</div>
                </div>
              </div>
            </div>

            {/* Map placeholder — replace with an embedded map + real address. */}
            <div className="flex h-48 items-center justify-center rounded-xl2 border border-dashed border-white/15 bg-white/[0.02] text-sm text-muted">
              Google Map embed — add once the full office address is confirmed.
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <EnquiryForm sourcePage="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}
