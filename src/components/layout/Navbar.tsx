import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { primaryNav } from "@/config/nav";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import Logo from "@/components/shared/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Static at the very top of the page; floating pill once scrolled down.
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const detached = floating || open;

  return (
    <header className="sticky top-0 z-50">
      {/* Wrapper adds an inset gutter only when floating, so the bar detaches. */}
      <div
        className={cn(
          "transition-all duration-500 ease-expo",
          detached ? "px-3 pt-3 sm:px-4" : "px-0 pt-0"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex items-center justify-between gap-4 px-5 transition-all duration-500 ease-expo lg:px-8",
            detached
              ? "nav-glass h-14 max-w-[1200px] rounded-full border lg:px-6"
              : "h-16 max-w-[1240px] border border-transparent"
          )}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} home`}>
            <Logo className="h-8 w-8" />
            <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight">
              Flyworld<span className="text-gold"> India</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <li
                key={item.to}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.children ? item.label : null)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn("nav-link", isActive && "bg-white/[0.06] text-ink")
                  }
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </NavLink>

                {item.children && openGroup === item.label && (
                  <div className="absolute left-0 top-full min-w-[220px] pt-3">
                    <ul className="card grid gap-0.5 p-2">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 lg:block">
            <Link to="/contact" className="btn-primary !min-h-0 whitespace-nowrap !py-2.5">
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="btn-ghost !min-h-0 !px-3 !py-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu — a rounded panel that sits under the bar in both states. */}
        {open && (
          <div
            id="mobile-menu"
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-night/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto p-4">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={item.to}
                      className="flex-1 rounded-lg px-3 py-2.5 text-base font-medium text-ink"
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button
                        type="button"
                        className="rounded-lg p-2 text-muted"
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openGroup === item.label && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && openGroup === item.label && (
                    <ul className="ml-3 border-l border-white/10 pl-3">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-3">
                <Link to="/contact" className="btn-primary w-full">
                  Book Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
