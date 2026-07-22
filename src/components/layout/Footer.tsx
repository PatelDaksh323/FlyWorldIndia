import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { footerNav } from "@/config/nav";
import { site, whatsappLink, telLink } from "@/config/site";
import Logo from "@/components/shared/Logo";

export default function Footer() {
  const year = 2026; // build-time constant; avoids Date() in prerender

  return (
    <footer className="mt-auto border-t border-white/10 bg-night/60">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        {/* Brand + contact */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center">
            <Logo className="h-10" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. Honest guidance for study abroad, work permits,
            visitor visas and PR — from Ahmedabad to the world.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{site.address.line}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={telLink()} className="link-underline hover:text-ink">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="link-underline hover:text-ink">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold" />
              <span>{site.address.hours}</span>
            </li>
          </ul>

          <a
            href={whatsappLink("Hi Flyworld India, I'd like to know more about your services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-6"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>

        {/* Link columns */}
        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Flyworld does not guarantee visa outcomes; decisions rest with the
            relevant authorities. We provide honest guidance, not promises.
          </p>
        </div>
      </div>
    </footer>
  );
}
