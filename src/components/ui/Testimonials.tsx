"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import ScrollReveal from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    name: "Amina Khalid",
    role: "HSE Officer, Construction Sector",
    feedback:
      "The trainers connected every module to real site incidents. I returned to work with practical tools that immediately improved toolbox talks and risk reporting."
  },
  {
    name: "Fahad Ullah",
    role: "Operations Supervisor",
    feedback:
      "LifeCare Academy made complex standards easy to apply. The course structure was professional, and the support team guided me from enrollment to certification."
  },
  {
    name: "Sana Tariq",
    role: "Safety Coordinator",
    feedback:
      "I appreciated the balance of technical depth and coaching. The learning environment was disciplined, modern, and focused on career outcomes."
  }
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-r from-brand-900 to-brand-700 py-16 text-white dark:from-brand-900 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
            Testimonials
          </p>
          <h3 className="mt-2 text-3xl font-extrabold text-white">
            What Our Learners Say
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              delay={Math.min(index * 0.08, 0.24)}
              className="h-full"
            >
              <article className="rounded-2xl border border-white/25 bg-white/10 p-7 backdrop-blur">
                <div className="mb-3 flex items-center justify-between">
                  <FaQuoteLeft className="text-xl text-brand-100" aria-hidden="true" />
                  <div className="flex items-center gap-1 text-amber-300">
                    <FaStar className="text-xs" aria-hidden="true" />
                    <FaStar className="text-xs" aria-hidden="true" />
                    <FaStar className="text-xs" aria-hidden="true" />
                    <FaStar className="text-xs" aria-hidden="true" />
                    <FaStar className="text-xs" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-sm leading-7 text-brand-100">{testimonial.feedback}</p>
                <div className="mt-5 border-t border-white/20 pt-4">
                  <p className="text-sm font-bold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-brand-200">{testimonial.role}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
