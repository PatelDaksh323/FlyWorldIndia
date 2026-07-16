import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/shared/Breadcrumbs";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { formatDate } from "./Blog";
import { getPost, posts } from "@/data/blog";
import { site, whatsappLink } from "@/config/site";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const path = `/blog/${post.slug}`;
  const crumbs: Crumb[] = [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: post.title },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}${path}`,
  };

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${post.title} | Flyworld India`}
        description={post.excerpt}
        path={path}
        jsonLd={[articleJsonLd, breadcrumbJsonLd(crumbs, site.url)]}
      />

      <article className="container max-w-3xl py-12 lg:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex items-center gap-3 text-sm">
          <span className="chip !text-gold">{post.category}</span>
          <span className="text-muted">{formatDate(post.date)}</span>
          <span className="text-muted">· {post.readMins} min read</span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/90">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8 rounded-xl2 border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
          This article is general guidance, not personalised advice, and figures
          can change. Always confirm current requirements from official sources or
          book a free consultation with us.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Book a free consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink(`Hi Flyworld India, I just read "${post.title}" and have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </div>
      </article>

      <section className="border-t border-white/10">
        <div className="container max-w-3xl py-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gold">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2 className="text-2xl font-semibold">Keep reading</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="card group flex h-full flex-col transition-colors hover:border-gold/40"
            >
              <span className="chip w-fit !text-gold">{p.category}</span>
              <h3 className="mt-4 text-base font-semibold leading-snug group-hover:text-gold">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="container grid gap-8 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Have a question about your plan?</h2>
            <p className="mt-4 max-w-md text-muted">
              Tell us where you want to go — we'll give you honest, specific guidance.
            </p>
          </div>
          <EnquiryForm sourcePage={path} />
        </div>
      </section>
    </>
  );
}
