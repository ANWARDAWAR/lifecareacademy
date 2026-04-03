"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaClipboardList, FaTimes } from "react-icons/fa";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact Us" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="glass-header sticky top-0 z-50 border-b border-white/30 bg-white/70 dark:border-white/10 dark:bg-slate-900/65">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="LifeCare Academy"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
            <div className="block">
              <h1 className="site-title text-sm font-bold sm:text-lg">
                LIFECARE ACADEMY
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Occupational Health and Safety Consultancy
              </p>
            </div>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm font-semibold ${active ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              ariaLabel="Toggle dark mode"
            />

            <Link
              href="/courses?apply=1"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.4)] transition transform hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <FaClipboardList className="text-xs" aria-hidden="true" />
              Apply for Admission
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              ariaLabel="Toggle dark mode"
            />
            <button
              id="mobile-menu-button"
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <FaTimes aria-hidden="true" />
              ) : (
                <FaBars aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`${mobileMenuOpen ? "" : "hidden"} border-t border-slate-200 pt-4 dark:border-slate-700 md:hidden`}
        >
          <div className="grid gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link rounded-md px-2 py-2 text-left text-sm font-semibold ${active ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/courses?apply=1"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.4)] ring-1 ring-brand-200/70 transition hover:bg-brand-700"
            >
              <FaClipboardList className="text-xs" aria-hidden="true" />
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
