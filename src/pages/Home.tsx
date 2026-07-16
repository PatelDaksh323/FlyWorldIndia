import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle, Star, ShieldCheck, Quote } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCounter from "@/components/shared/StatCounter";
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
        description="Trusted overseas education & immigration consultancy. Study Abroad, Europe Work Permits, Visitor Visas and PR — honest guidance, transparent costs, real results. Book a free consultation."
        path="/"
      />

      <Hero />
      <TrustBar />
      <Stats />
      <Services />
      <Destinations />
      <Process />
      <Testimonials />
      <BlogPreview />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-8 lg:py-20">
        <div className="animate-fade-up">
          <span className="chip !text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Trusted mobility partner since 2013
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            From <span className="text-gold">India</span> to the world —
            <br className="hidden sm:block" /> guided by people you can trust.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Study abroad, Europe work permits, visitor visas and PR. Honest
            advice for a decision worth ₹20–40 lakh and years of your life — no
            false promises, no hidden costs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <a href={telLink()} className="btn-ghost">
              <Phone className="h-4 w-4" /> Call now
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            Rated by students &amp; families across Gujarat and beyond
          </p>
        </div>

        {/* The one 3D moment. Lazy + code-split; CSS fallback until ready. */}
        <div className="relative order-first lg:order-last">
          <div className="mx-auto aspect-square w-full max-w-[560px]">
            <LazyGlobe />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-night-radial" />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    "No visa is ever 'guaranteed' — we tell you the truth",
    "Transparent, itemised costs",
    "Real office, real people in Ahmedabad",
    "We reply on WhatsApp, fast",
  ];
  return (
    <div className="border-y border-white/10 bg-panel/40">
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-center text-sm text-muted">
        {items.map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="What we've achieved"
            title="Real numbers, not a broken counter"
            subtitle="The figures below are placeholders until verified with our records. We would rather show nothing than show something false."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Four services, one promise: honest guidance"
            subtitle="Whatever your goal, it starts with a free, no-pressure conversation about what's actually realistic for you."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <Link
                to={s.to}
                className="card group flex h-full flex-col transition-colors hover:border-gold/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta-gradient text-night">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-ink/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  Explore {s.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Where you can go"
            title="Popular study destinations"
            subtitle="Tap a country for costs, courses, eligibility and the documents you'll need."
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-3">
            {destinationChips.map((c) => (
              <Link key={c.to} to={c.to} className="chip text-sm">
                {c.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four simple steps"
            subtitle="No jargon, no runaround. Here's exactly what working with us looks like."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card h-full">
                <span className="font-display text-3xl font-semibold text-gold/70">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="In their words"
            title="Trust, earned one family at a time"
            subtitle="A few short words from people we've helped. Full stories — with permission — on our Success Stories page."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="card flex h-full flex-col">
                <Quote className="h-8 w-8 text-gold/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/success-stories" className="btn-outline">
            Read success stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const recent = posts.slice(0, 6);
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="From the blog"
              title="Guidance worth reading"
              subtitle="Honest, up-to-date guides — not a 100-post archive dumped on the homepage."
            />
            <Link to="/blog" className="btn-ghost shrink-0">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link
                to={`/blog/${p.slug}`}
                className="card group flex h-full flex-col transition-colors hover:border-gold/40"
              >
                <span className="chip w-fit !text-gold">{p.category}</span>
                <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <span className="mt-4 text-xs text-muted">{p.readMins} min read</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="overflow-hidden rounded-xl2 border border-white/10 bg-panel/60 shadow-card">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="Ready when you are"
                title="Let's talk about your plan"
                subtitle="Tell us where you want to go. We'll tell you honestly what it takes — and whether we're the right people to help."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={telLink()} className="btn-ghost">
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </div>
            </div>
            <EnquiryForm sourcePage="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
