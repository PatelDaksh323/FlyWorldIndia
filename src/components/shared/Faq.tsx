import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

/** Accessible accordion. Pair with FAQPage JSON-LD emitted by the caller. */
export default function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-xl2 border border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-medium text-ink">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-gold transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
