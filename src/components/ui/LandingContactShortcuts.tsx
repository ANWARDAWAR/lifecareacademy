import { FaEnvelopeOpenText, FaPhoneVolume, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "923489196200";
const CALL_NUMBER = "+923489196200";
const EMAIL_ADDRESS = "lifecareacademy7@gmil.com";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I am interested in admission."
);

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function LandingContactShortcuts() {
  return (
    <>
      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:-mt-10 sm:px-6">
        <div className="glass-card rounded-2xl p-5 shadow-2xl premium-ring">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
              Quick Contact
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Pick your preferred channel and connect with admissions instantly.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={`tel:${CALL_NUMBER}`}
              aria-label="Call admissions"
              className="group flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/80 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-100/80 dark:border-sky-700/60 dark:bg-sky-900/20 dark:hover:bg-sky-900/30"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg">
                <FaPhoneVolume className="text-sm" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Phone
                </span>
                <span className="block text-xs text-slate-600 dark:text-slate-300">
                  {CALL_NUMBER}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              aria-label="Email admissions"
              className="group flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/85 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-100/80 dark:border-amber-700/60 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
                <FaEnvelopeOpenText className="text-sm" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Email
                </span>
                <span className="block text-xs text-slate-600 dark:text-slate-300">
                  {EMAIL_ADDRESS}
                </span>
              </span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp for admission help"
              className="group flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100/80 dark:border-emerald-700/60 dark:bg-emerald-900/25 dark:hover:bg-emerald-900/35"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <FaWhatsapp className="text-lg" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  WhatsApp
                </span>
                <span className="block text-xs text-slate-600 dark:text-slate-300">
                  Fast guidance for admission and course selection.
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-600"
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </>
  );
}