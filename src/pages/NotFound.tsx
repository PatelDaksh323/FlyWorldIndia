import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Flyworld India"
        description="The page you're looking for doesn't exist. Explore our study abroad, work permit and visa services instead."
        path="/404"
        noindex
      />
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="font-display text-7xl font-semibold text-gold">404</span>
        <h1 className="mt-4 text-3xl font-semibold">This page took a wrong turn</h1>
        <p className="mt-3 max-w-md text-muted">
          The page you're looking for doesn't exist or has moved. Let's get you
          back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link to="/study-abroad" className="btn-ghost">
            Explore services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
