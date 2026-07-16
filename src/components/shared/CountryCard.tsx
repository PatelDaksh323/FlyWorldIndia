import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { countryPath, displayValue, type CountryData } from "@/data/countries";

export default function CountryCard({ country }: { country: CountryData }) {
  return (
    <Link
      to={countryPath(country)}
      className="card group flex h-full flex-col transition-colors hover:border-gold/40"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden="true">
          {country.flag}
        </span>
        <h3 className="text-xl font-semibold group-hover:text-gold">{country.name}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{country.subhead}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs">
        {country.quickFacts.slice(0, 2).map((f) => (
          <div key={f.label}>
            <dt className="text-muted">{f.label}</dt>
            <dd className="mt-0.5 font-medium text-ink">{displayValue(f.value).text}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
        View details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
