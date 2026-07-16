import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { site, whatsappLink, telLink } from "@/config/site";

/**
 * Always-visible WhatsApp + Call buttons (PRD G-1, G-2). WhatsApp is the real
 * front door in India, so it gets the prominent branded treatment.
 */
export default function FloatingActions() {
  const { pathname } = useLocation();
  const message = `Hi Flyworld India, I found you via ${site.url}${pathname} and I'd like to book a free consultation.`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={telLink()}
        aria-label="Call Flyworld India"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-panel text-ink shadow-card transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Phone className="h-5 w-5 text-gold" />
      </a>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Flyworld India on WhatsApp"
        className="flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-5 font-semibold text-[#04310f] shadow-glow transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-sm sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.4L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.244 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.052A12.71 12.71 0 0 0 16.004 3.2Zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.388-.23-4.02 1.054 1.072-3.918-.253-.402a10.56 10.56 0 0 1-1.62-5.624c0-5.86 4.77-10.63 10.636-10.63 2.84 0 5.51 1.107 7.518 3.117a10.56 10.56 0 0 1 3.114 7.52c0 5.862-4.77 10.63-10.635 10.63Zm5.83-7.96c-.32-.16-1.89-.933-2.183-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.592-1.893-1.779-2.213-.186-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.827.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.615-.092 1.89-.773 2.156-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z" />
    </svg>
  );
}
