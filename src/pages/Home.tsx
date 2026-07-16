import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import EnquiryForm from "@/components/shared/EnquiryForm";
import LazyGlobe from "@/components/globe/LazyGlobe";
import { site, whatsappLink, telLink } from "@/config/site";
import { stats, services, steps, testimonials, destinationChips } from "@/data/content";
import { posts } from "@/data/blog";

export default function Home() {
  return (
    <>
      <Seo
        title="Flyworld India — Study Abroad, Work Permits & PR Consultants in Ahmedabad"
        description="A serious overseas education & immigration consultancy. Study Abroad, Europe Work Permits, Visitor Visas and PR — honest guidance, transparent costs, real results. Book a free consultation."
        path="/"
      />
      <Hero />
      <StatsBand />
      <Services />
      <Approach />
      <Destinations />
      <PullQuote />
      <Writing />
      <ClosingCta />
    </>
  );
}

/* Small editorial section label: gold index + tracked caption. Gold used once. */
function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm text-gold">{index}</span>
      <span className="h-px w-6 bg-gold/60" />
      <span className="label">{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid grid-cols-1 items-center gap-12 pb-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-28">
        <div className="animate-fade-up lg:col-span-7">
          <p className="label">Global mobility · Established 2013 · Ahmedabad</p>
          <h1 className="mt-7 text-hero">
            A steady hand for the
            <br className="hidden sm:block" /> biggest decision of your life.
          </h1>
          <p className="prose-narrow mt-7">
            Study abroad, Europe work permits, visitor visas and permanent
            residency — for families committing ₹20–40 lakh and years of their
            lives. We give you the honest position, the real costs, and a team
            that answers the phone.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link to="/contact" className="btn-primary">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
            >
              Message on WhatsApp
            </a>
            <a href={telLink()} className="text-sm text-muted transition-colors hover:text-ink">
              {site.phone}
            </a>
          </div>
        </div>

        {/* The single aspirational moment. One soft radial glow, nothing else. */}
        <div className="relative lg:col-span-5">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, rgba(232,176,75,0.14), transparent 72%)",
            }}
          />
          <div className="mx-auto aspect-square w-full max-w-[440px] lg:max-w-none">
            <LazyGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Full-bleed thin band of numbers with hairline dividers. Not cards. */
function StatsBand() {
  return (
    <section className="border-y border-white/10 bg-panel/40">
      <div className="container">
        <div className="grid grid-cols-2 divide-white/10 py-12 md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <div key={s.label} className={i % 2 === 1 ? "pl-6 md:pl-8" : "pr-6 md:px-8"}>
              <div className="tnum font-display text-4xl font-medium text-ink md:text-5xl">
                {s.prefix}
                {s.value.toLocaleString("en-IN")}
                {s.suffix}
              </div>
              <div className="mt-2 text-sm leading-snug text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="container pb-8 text-xs text-muted/70">
        Figures shown are placeholders pending verification against our records —
        we would rather show nothing than a number we can't stand behind.
      </p>
    </section>
  );
}

/* Services as an editorial index — numbered rows, hairline rules. Not a grid. */
function Services() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">What we do</SectionLabel>
            <h2 className="mt-6 text-display">Four services. One standard of honesty.</h2>
            <p className="prose-narrow mt-6">
              Whatever the destination, the work begins the same way: a frank
              conversation about what is realistic for your profile, your budget
              and your timeline.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <Link
                    to={s.to}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="font-display text-sm text-gold">0{i + 1}</span>
                    <span>
                      <span className="block font-display text-xl text-ink transition-colors group-hover:text-gold">
                        {s.title}
                      </span>
                      <span className="mt-1.5 block max-w-prose text-[15px] leading-relaxed text-muted">
                        {s.blurb}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-1 h-5 w-5 text-muted transition-colors group-hover:text-gold" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Approach — numbered steps in a single row, hairline tops. */
function Approach() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-prose">
          <SectionLabel index="02">How we work</SectionLabel>
          <h2 className="mt-6 text-display">No jargon. No runaround.</h2>
        </div>
        <div className="mt-14 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="border-t border-white/10 pt-5">
                <span className="tnum font-display text-2xl text-muted">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Destinations — a two-column editorial list. Flags are the allowed exception. */
function Destinations() {
  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="03">Where we send people</SectionLabel>
          <h2 className="mt-6 text-display">Study destinations</h2>
          <p className="prose-narrow mt-6">
            Each country page carries the same detail: itemised costs,
            eligibility, the documents you'll need, and the questions applicants
            actually ask.
          </p>
          <Link to="/study-abroad" className="btn-link mt-6">
            All destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <ul className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 sm:gap-x-10">
            {destinationChips.map((c) => (
              <li key={c.to} className="border-b border-white/10">
                <Link
                  to={c.to}
                  className="group flex items-center justify-between py-4 text-ink"
                >
                  <span className="text-[17px]">{c.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* One large pull-quote on a subtle band. Replaces the row of testimonial cards. */
function PullQuote() {
  const t = testimonials[0];
  return (
    <section className="border-y border-white/10 bg-panel/40">
      <div className="container py-20 md:py-28">
        <div className="max-w-4xl">
          <span className="font-display text-6xl leading-none text-gold/50">“</span>
          <blockquote className="-mt-6 font-display text-2xl leading-snug text-ink md:text-display">
            {t.quote}
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-sm text-muted">
              {t.name} — {t.detail}
            </span>
          </div>
          <p className="mt-10 max-w-prose text-xs text-muted/70">
            Placeholder for layout. Real, signed-off testimonials only — full
            stories on the{" "}
            <Link to="/success-stories" className="text-muted underline hover:text-ink">
              success stories
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Writing — an editorial list, not a card grid. */
function Writing() {
  const recent = posts.slice(0, 4);
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-prose">
            <SectionLabel index="04">Writing</SectionLabel>
            <h2 className="mt-6 text-display">Guidance worth the read</h2>
          </div>
          <Link to="/blog" className="btn-link">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 border-t border-white/10">
          {recent.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <Link
                to={`/blog/${p.slug}`}
                className="group grid grid-cols-1 gap-2 border-b border-white/10 py-6 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="label text-muted/80">{p.category}</span>
                <span className="font-display text-xl text-ink transition-colors group-hover:text-gold">
                  {p.title}
                </span>
                <span className="text-sm text-muted">{p.readMins} min</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Closing — asymmetric split: prose left, form right. */
function ClosingCta() {
  return (
    <section className="section">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="05">Speak to us</SectionLabel>
          <h2 className="mt-6 text-display">
            Tell us where you want to go.
          </h2>
          <p className="prose-narrow mt-6">
            We'll tell you honestly what it takes — and whether we're the right
            firm to get you there. No pressure, no false promises.
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div className="flex gap-4 border-t border-white/10 pt-4">
              <dt className="w-24 shrink-0 text-muted">WhatsApp</dt>
              <dd>
                <a
                  href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Message us
                </a>
              </dd>
            </div>
            <div className="flex gap-4 border-t border-white/10 pt-4">
              <dt className="w-24 shrink-0 text-muted">Phone</dt>
              <dd>
                <a href={telLink()} className="text-ink hover:text-gold">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-4 border-t border-white/10 pt-4">
              <dt className="w-24 shrink-0 text-muted">Office</dt>
              <dd className="text-ink">{site.address.line}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm sourcePage="/" />
        </div>
      </div>
    </section>
  );
}
