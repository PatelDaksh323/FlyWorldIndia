import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone, MessageCircle, Star, ShieldCheck, Quote } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCounter from "@/components/shared/StatCounter";
import EnquiryForm from "@/components/shared/EnquiryForm";
import TiltCard from "@/components/shared/TiltCard";
import MagneticButton from "@/components/shared/MagneticButton";
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
      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-96 w-96 animate-drift rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 animate-drift rounded-full bg-coral/10 blur-3xl [animation-delay:3s]" />
      </div>

      <div className="container grid items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24 lg:pt-24">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Global mobility partner · since 2013
          </span>

          <h1 className="mt-6 text-hero">
            From India to the world,
            <br className="hidden sm:block" /> <span className="text-sheen">guided with trust.</span>
          </h1>

          <p className="prose-narrow mt-6">
            Study abroad, Europe work permits, visitor visas and PR — for a
            decision worth ₹20–40 lakh and years of your life. No false promises,
            no hidden costs. Just the truth, and a team that answers.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton to="/contact" className="btn-primary">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </MagneticButton>
            <a href={telLink()} className="hidden items-center gap-2 px-2 text-sm text-muted hover:text-ink sm:inline-flex">
              <Phone className="h-4 w-4 text-gold" /> {site.phone}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="flex text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            Rated by students &amp; families across Gujarat and beyond
          </div>
        </div>

        <div className="relative order-first lg:order-last">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/10 blur-3xl" />
          <div className="mx-auto aspect-square w-full max-w-[560px]">
            <LazyGlobe />
          </div>
          <div className="pointer-events-none absolute -bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-panel/70 px-4 py-2 text-xs text-muted backdrop-blur-md sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Live routes · India → 9 destinations
          </div>
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
    <div className="border-y border-white/10 bg-panel/30 backdrop-blur-sm">
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
            title="Real numbers, honestly reported"
            subtitle="The figures below are placeholders until verified with our records. We would rather show nothing than something false."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="card text-center">
                <StatCounter {...s} />
              </div>
            </Reveal>
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <TiltCard className="h-full">
                <Link to={s.to} className="card-glow group flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="icon-tile">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted">
                        {p}
                      </li>
                    ))}
                  </ul>
                </Link>
              </TiltCard>
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
          <div className="mt-10 flex flex-wrap gap-3">
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card h-full">
                <span className="font-display text-4xl text-transparent [-webkit-text-stroke:1px_rgba(232,176,75,0.6)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
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
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <figure className="card-glow flex h-full flex-col">
                <Quote className="h-8 w-8 text-gold/50" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/success-stories" className="btn-outline">
            Read success stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const recent = posts.slice(0, 3);
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="From the blog"
              title="Guidance worth reading"
              subtitle="Honest, up-to-date guides — not a 100-post archive on the homepage."
            />
            <Link to="/blog" className="btn-ghost shrink-0">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {recent.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <TiltCard className="h-full">
                <Link to={`/blog/${p.slug}`} className="card-glow group flex h-full flex-col">
                  <span className="chip w-fit !text-gold">{p.category}</span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted">
                    {p.readMins} min read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
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
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/50 shadow-lift backdrop-blur-md">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-aurora" />
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 animate-drift rounded-full bg-gold/10 blur-3xl" />
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="Ready when you are"
                title="Let's talk about your plan"
                subtitle="Tell us where you want to go. We'll tell you honestly what it takes — and whether we're the right people to help."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  href={whatsappLink("Hi Flyworld India, I'd like a free consultation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </MagneticButton>
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
