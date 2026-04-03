"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

const heroImages = ["/ad1.png", "/ad2.png", "/ad3.png", "/ad4.png", "/ad5.png"];

export default function HeroSlider() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div id="hero-slider" className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`hero-slide ${heroIndex === index ? "active" : ""}`}
          >
            <Image
              src={image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-slate-950/65"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 via-brand-800/50 to-slate-900/40"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white/95 backdrop-blur">
            <FaShieldAlt aria-hidden="true" />
            Approved Center - OTHM, IOSH, OSHA, AOSH, NEBOSH
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            Developing Safety Leaders for High-Risk Industries
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-100/95">
            Delivering practical, internationally benchmarked training programs
            for professionals, supervisors, and organizations committed to safer
            workplaces.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-700 hover:bg-slate-100"
            >
              Browse Courses
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/20"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-white/25 bg-white/10 p-3 text-center backdrop-blur">
              <p className="text-xl font-extrabold text-white">15+</p>
              <p className="text-xs text-white/90">Years Expertise</p>
            </div>
            <div className="rounded-lg border border-white/25 bg-white/10 p-3 text-center backdrop-blur">
              <p className="text-xl font-extrabold text-white">8</p>
              <p className="text-xs text-white/90">Core Programs</p>
            </div>
            <div className="rounded-lg border border-white/25 bg-white/10 p-3 text-center backdrop-blur">
              <p className="text-xl font-extrabold text-white">1,000+</p>
              <p className="text-xs text-white/90">Learners Trained</p>
            </div>
            <div className="rounded-lg border border-white/25 bg-white/10 p-3 text-center backdrop-blur">
              <p className="text-xl font-extrabold text-white">24/7</p>
              <p className="text-xs text-white/90">Support Channels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={`hero-dot-${index}`}
            type="button"
            className={`hero-dot h-2.5 w-2.5 rounded-full bg-white/55 ${
              heroIndex === index ? "active" : ""
            }`}
            aria-label={`Hero slide ${index + 1}`}
            onClick={() => setHeroIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
