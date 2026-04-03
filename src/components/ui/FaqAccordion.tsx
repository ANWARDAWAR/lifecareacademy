"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqItems = [
  {
    question: "What is NEBOSH IGC?",
    answer:
      "NEBOSH International General Certificate is a globally respected qualification that equips managers and safety practitioners with a practical framework for risk control and legal compliance."
  },
  {
    question: "What is IOSH Managing Safely?",
    answer:
      "IOSH Managing Safely is practical health and safety training developed for supervisors and managers to confidently manage risks and improve team safety performance."
  },
  {
    question: "What does OBE mean in training?",
    answer:
      "OBE stands for Outcome-Based Education, where learning is measured by demonstrated competence and practical application rather than theory alone."
  },
  {
    question: "How is fee payment managed?",
    answer:
      "We support flexible payments including installments. Once your admission is confirmed, our team shares secure payment details and due-date options."
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds may be considered according to enrollment stage and material access. Our admissions office reviews each case transparently and may offer transfer options when applicable."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
          FAQs
        </p>
        <h3 className="mt-2 text-3xl font-extrabold">
          Most Frequent Questions and Answers
        </h3>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const triggerId = `faq-trigger-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <article
              key={item.question}
              className={`rounded-xl border transition-colors duration-300 ${
                isOpen
                  ? "border-brand-200 bg-brand-50/60 dark:border-brand-700/60 dark:bg-brand-900/25"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <button
                type="button"
                id={triggerId}
                aria-controls={panelId}
                className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                  isOpen
                    ? "text-brand-800 dark:text-brand-100"
                    : "text-slate-800 dark:text-slate-100"
                }`}
                aria-expanded={isOpen}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold">{item.question}</span>
                <FaChevronDown
                  className={`text-brand-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
