"use client";

import Image from "next/image";
import { FaBullseye, FaHandHoldingHeart, FaUserShield } from "react-icons/fa";
import CertificateSlider from "@/components/ui/CertificateSlider";
import FeaturedCoursesSection from "@/components/ui/FeaturedCoursesSection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GallerySlider from "@/components/ui/GallerySlider";
import HeroSlider from "@/components/ui/HeroSlider";
import LandingContactShortcuts from "@/components/ui/LandingContactShortcuts";
import QuickCallbackBanner from "@/components/ui/QuickCallbackBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Testimonials from "@/components/ui/Testimonials";

const trustLogos = [
  { src: "/OTHM.png", alt: "OTHM", href: "https://othm.org.uk" },
  { src: "/IOSH.png", alt: "IOSH", href: "https://iosh.com" },
  { src: "/OSHA.png", alt: "OSHA", href: "https://www.osha.gov" },
  { src: "/OSHAS.png", alt: "OSHAS", href: "https://www.ohsas.org" },
  {
    src: "/HiQual.png",
    alt: "Highfield HiQual",
    href: "https://www.highfieldqualifications.com"
  },
  { src: "/ISO.png", alt: "ISO", href: "https://www.iso.org" },
  { src: "/FIRSTAID.png", alt: "First Aid", href: "https://www.redcross.org" }
];

export default function HomePage() {
  return (
    <section>
      <HeroSlider />
      <LandingContactShortcuts />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
                Trusted By Global Standards
              </p>
              <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                Certifications and Affiliations
              </h3>
            </div>
          </div>

          <div className="marquee">
            <div className="marquee-track">
              {[...trustLogos, ...trustLogos].map((logo, index) => (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marquee-item group"
                  key={`${logo.alt}-${index}`}
                  aria-label={`Open ${logo.alt} website`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={80}
                    className="h-16 w-auto cursor-pointer object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CertificateSlider />

      <FeaturedCoursesSection />

      <QuickCallbackBanner />

      <section className="bg-gradient-to-r from-brand-900 to-brand-700 py-16 text-white dark:from-brand-900 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-extrabold">Our Mission and Impact</h3>
            <p className="mx-auto mt-3 max-w-3xl text-brand-100">
              We empower professionals and organizations with practical systems
              that reduce incidents, strengthen compliance, and build a
              sustainable culture of safety.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.05} className="h-full">
              <article className="rounded-2xl border border-white/25 bg-white/10 p-7 backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-200">
                  <FaUserShield aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold">Addressing the Skills Gap</h4>
                <p className="mt-3 text-sm text-brand-100">
                  We prepare safety professionals for roles that industries
                  urgently need, from site safety to strategic leadership.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="h-full">
              <article className="rounded-2xl border border-white/25 bg-white/10 p-7 backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                  <FaBullseye aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold">Building Responsible Leaders</h4>
                <p className="mt-3 text-sm text-brand-100">
                  Our learning model emphasizes decision-making, accountability,
                  and incident prevention under real operational pressure.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.19} className="h-full">
              <article className="rounded-2xl border border-white/25 bg-white/10 p-7 backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-400/20 text-rose-200">
                  <FaHandHoldingHeart aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold">Inclusive Access to Learning</h4>
                <p className="mt-3 text-sm text-brand-100">
                  Through flexible payment and learner support, we help more
                  candidates access globally relevant safety education.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Testimonials />

      <GallerySlider />
      <FaqAccordion />
    </section>
  );
}
