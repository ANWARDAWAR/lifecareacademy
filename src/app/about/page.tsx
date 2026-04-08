import Image from "next/image";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaGlobeAsia,
  FaShieldAlt,
  FaUserGraduate,
  FaUsers
} from "react-icons/fa";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 px-8 py-14 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
            About LifeCare Academy
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold">
            Professional Safety Education with Real-World Relevance
          </h2>
          <p className="mt-4 max-w-3xl text-brand-100">
            We are a consultancy-led academy focused on helping professionals
            and organizations elevate safety standards through practical,
            internationally aligned training.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-extrabold">Who We Are</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            LifeCare Academy is an occupational health and safety consultancy and
            training center based in Peshawar, Pakistan. We work with individual
            professionals, corporate teams, and project-driven organizations to
            close competency gaps in health, safety, and environmental
            management.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Our instructors combine industry exposure with practical teaching
            methods, helping learners apply standards in construction sites,
            industrial facilities, and high-risk operational environments from
            day one.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-extrabold">Our Vision and Core Values</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Our vision is to become the most trusted regional center for
            occupational safety leadership development.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 dark:border-brand-900/40 dark:bg-brand-900/20">
              <h4 className="font-bold text-brand-700 dark:text-brand-200">
                Integrity
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Transparent guidance, ethical practice, and measurable outcomes.
              </p>
            </div>
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 dark:border-brand-900/40 dark:bg-brand-900/20">
              <h4 className="font-bold text-brand-700 dark:text-brand-200">
                Practical Excellence
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Training that solves real workplace challenges, not only exam
                requirements.
              </p>
            </div>
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 dark:border-brand-900/40 dark:bg-brand-900/20">
              <h4 className="font-bold text-brand-700 dark:text-brand-200">
                Accessibility
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Flexible learning pathways for working professionals and aspiring
                officers.
              </p>
            </div>
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 dark:border-brand-900/40 dark:bg-brand-900/20">
              <h4 className="font-bold text-brand-700 dark:text-brand-200">
                Continuous Improvement
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Programs evolve with global standards and industry feedback.
              </p>
            </div>
          </div>
        </article>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-extrabold">Why Choose LifeCare Academy</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal delay={0.04} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                <FaGlobeAsia className="text-xl text-brand-600" aria-hidden="true" />
                <h4 className="mt-3 font-bold">
                  Internationally Aligned Programs
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Courses mapped to recognized standards and employer
                  expectations.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                <FaChalkboardTeacher className="text-xl text-brand-600" aria-hidden="true" />
                <h4 className="mt-3 font-bold">Industry-Focused Trainers</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Learn from professionals with field and audit-level experience.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.16} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                <FaUsers className="text-xl text-brand-600" aria-hidden="true" />
                <h4 className="mt-3 font-bold">Dedicated Student Support</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Admissions, scheduling, and progression guidance throughout your
                  journey.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.22} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                <FaShieldAlt className="text-xl text-brand-600" aria-hidden="true" />
                <h4 className="mt-3 font-bold">Career-Oriented Outcomes</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Build credentials and confidence that translate directly into
                  workplace value.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Our Team
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">
            Leadership and Administration
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal delay={0.05} className="h-full">
            <article className="team-card h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow dark:border-slate-700">
                <Image
                  src="/sajid_ullah.jpeg"
                  alt="Sajid Ullah"
                  width={240}
                  height={240}
                  className="h-full w-full object-cover object-bottom"
                />
              </div>
              <h4 className="text-xl font-bold">SAJID ULLAH</h4>
              <p className="mt-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
                Owner of LifeCareAcademy.org
              </p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <FaEnvelope className="mr-2 inline" aria-hidden="true" />
                <a href="mailto:isajid478@gmail.com" className="text-brand-600 hover:underline">isajid478@gmail.com</a>
              </p>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                With over 15 years of experience in occupational safety and health
                training.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.11} className="h-full">
            <article className="team-card h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow dark:border-slate-700">
                <Image
                  src="/tj.jpeg"
                  alt="TARIQ JAMEEL"
                  width={240}
                  height={240}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "50% 92%" }}
                />
              </div>
              <h4 className="text-xl font-bold">TARIQ JAMEEL</h4>
              <p className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                Branch Administrator Incharge
              </p>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Manages branch operations and student support services.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.17} className="h-full">
            <article className="team-card h-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-emerald-100 shadow dark:border-slate-700 dark:bg-emerald-900/30">
                <FaUserGraduate className="text-4xl text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold">RUKHSAR SAJID</h4>
              <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                Branch Administrator
              </p>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Handles admissions, certificates, and administrative coordination.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </section>
  );
}
