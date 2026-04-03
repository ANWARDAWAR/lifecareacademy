  "use client";

import { FormEvent, useState } from "react";

export default function QuickCallbackBanner() {
  const [feedback, setFeedback] = useState("");

  const submitCallbackRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      contact: String(formData.get("contact") || ""),
      message: String(formData.get("message") || ""),
      subject: "Quick Callback Request"
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    setFeedback("Thanks! Our admissions advisor will call you shortly.");
    form.reset();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-brand-200/70 bg-gradient-to-r from-brand-50 via-white to-brand-100 p-6 shadow-xl dark:border-brand-900/40 dark:from-brand-900/20 dark:via-slate-900 dark:to-slate-900">
        <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              Admissions Support
            </p>
            <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Request a Callback from Admissions
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Need fast guidance on the right certification? Share your number
              and preferred time, and we will contact you.
            </p>
          </div>

          <form className="grid gap-3 sm:grid-cols-2" onSubmit={submitCallbackRequest}>
            <label className="sr-only" htmlFor="callback-name">
              Full Name
            </label>
            <input
              id="callback-name"
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
            />

            <label className="sr-only" htmlFor="callback-contact">
              Contact Number
            </label>
            <input
              id="callback-contact"
              name="contact"
              type="tel"
              required
              placeholder="Contact Number"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
            />

            <label className="sr-only" htmlFor="callback-message">
              Preferred Time
            </label>
            <input
              id="callback-message"
              name="message"
              type="text"
              placeholder="Preferred time (Morning / Evening)"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 sm:col-span-2"
            />

            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-glow hover:bg-brand-700 sm:col-span-2"
            >
              Request Callback
            </button>

            <p
              className={`${feedback ? "" : "hidden"} rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200 sm:col-span-2`}
            >
              {feedback}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
