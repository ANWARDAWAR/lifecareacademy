import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaRoute,
  FaWhatsapp
} from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" }
];

const certifications = ["OSHA", "IOSH", "OTHM", "ISO", "First Aid"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white/85 to-brand-50/50 py-12 dark:border-slate-800 dark:from-slate-900/85 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="LifeCare Academy"
                width={64}
                height={64}
                className="h-12 w-12 rounded-full object-contain"
              />
              <div>
                <h3 className="site-title text-base font-bold sm:text-lg">
                  LIFECARE ACADEMY
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Occupational Health and Safety Consultancy
                </p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              LifeCare Academy is dedicated to practical occupational health and
              safety training that empowers professionals and organizations with
              globally aligned certifications.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-200"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-200"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-200"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/923489196200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-200"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </div>

            <div className="mt-4 space-y-2">
              <a
                href="tel:+923188841920"
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700 dark:text-slate-300"
              >
                <FaPhone className="text-sm text-brand-700" aria-hidden="true" />
                +92 318 884 1920
              </a>
              <a
                href="tel:+923489196200"
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700 dark:text-slate-300"
              >
                <FaPhone className="text-sm text-brand-700" aria-hidden="true" />
                +92 348 919 6200
              </a>
              <a
                href="mailto:lifecareacademy7@gmil.com"
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700 dark:text-slate-300"
              >
                <FaEnvelope className="text-sm text-brand-700" aria-hidden="true" />
                lifecareacademy7@gmil.com
              </a>
              <a
                href="mailto:isajid478@gmail.com"
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700 dark:text-slate-300"
              >
                <FaEnvelope className="text-sm text-brand-700" aria-hidden="true" />
                isajid478@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              Certifications
            </h4>
            <ul className="mt-4 space-y-2">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="text-sm font-semibold text-slate-600 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              Location & Headquarters
            </h4>
            <div className="mt-4 rounded-xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
              <p className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                  <FaMapMarkerAlt className="text-xs" aria-hidden="true" />
                </span>
                <span>
                  Office #480, First Floor, Deans Trade Center Saddar,
                  Peshawar, Pakistan
                </span>
              </p>
              <a
                href="https://maps.google.com/?q=Deans+Trade+Center+Saddar+Peshawar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
              >
                <FaRoute className="text-xs" aria-hidden="true" />
                Get Directions
              </a>
              <iframe
                title="LifeCare Academy headquarters map"
                src="https://maps.google.com/maps?q=Deans%20Trade%20Center%20Saddar%20Peshawar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="mt-4 h-36 w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5 text-center dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            &copy; {new Date().getFullYear()} LIFECAREACADEMY.ORG - All Rights
            Reserved
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Developed by LORD & Co.
          </p>
        </div>
      </div>
    </footer>
  );
}
