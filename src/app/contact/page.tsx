"use client";

import { FormEvent, useState } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [feedback, setFeedback] = useState("");

  const onContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || "")
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    setFeedback(
      "Thank you. Your message has been recorded and our team will contact you soon."
    );
    form.reset();
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-900 to-brand-700 px-8 py-12 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
            Need Immediate Assistance?
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold">
            Let&apos;s Plan Your Safety Learning Path
          </h2>
          <p className="mt-4 max-w-3xl text-brand-100">
            Our team is available to guide individuals and organizations on
            course selection, scheduling, and enrollment.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="tel:+923188841920"
              className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20"
            >
              <FaPhone aria-hidden="true" />
              +92 318 884 1920
            </a>
            <a
              href="tel:+923489196200"
              className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20"
            >
              <FaPhone aria-hidden="true" />
              +92 348 919 6200
            </a>
            <a
              href="https://wa.me/923489196200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp Support
            </a>
          </div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-2xl font-extrabold">Contact Form</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Share your inquiry and our admissions advisor will contact you
              shortly.
            </p>

            <form
              id="contact-form"
              className="mt-6 space-y-4"
              onSubmit={onContactSubmit}
            >
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-semibold">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1 block text-sm font-semibold">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700"
              >
                Send Message
              </button>
              <p
                id="contact-feedback"
                className={`${feedback ? "" : "hidden"} rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200`}
              >
                {feedback}
              </p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  Address
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Office #480, First Floor,
                  <br />
                  Deans Trade Center Saddar,
                  <br />
                  Peshawar, Pakistan
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  Email
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  lifecareacademy7@gmil.com
                  <br />
                  isajid478@gmail.com
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  Phone Numbers
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  +92 318 884 1920
                  <br />
                  +92 348 919 6200
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  Office Hours
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Mon - Sat: 9:00 AM - 7:00 PM
                  <br />
                  Sunday: By Appointment
                </p>
              </article>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  Google Maps
                </p>
              </div>
              <iframe
                title="LifeCare Academy location map"
                src="https://maps.google.com/maps?q=Deans%20Trade%20Center%20Saddar%20Peshawar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
