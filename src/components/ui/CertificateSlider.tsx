"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const certificates = ["/1.png", "/2.png", "/3.png", "/4.png"];

export default function CertificateSlider() {
  const [certIndex, setCertIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCertIndex((prev) => (prev + 1) % certificates.length);
    }, 5500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // prevent background scroll when modal open
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
          Approved Certificates
        </p>
        <h3 className="mt-2 text-3xl font-extrabold">
          Recognized Training Ecosystem
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div
          id="cert-track"
          className="slider-track"
          style={{ transform: `translateX(-${certIndex * 100}%)` }}
        >
          {certificates.map((image, index) => (
            <div key={image} className="slider-slide p-6 sm:p-8">
              <button
                type="button"
                className="w-full"
                onClick={() => {
                  setModalSrc(image);
                  setIsOpen(true);
                }}
                aria-label={`Open certificate ${index + 1} full view`}
              >
                <Image
                  src={image}
                  alt={`Certificate ${index + 1}`}
                  width={1200}
                  height={800}
                  className="h-[320px] w-full cursor-zoom-in rounded-xl object-contain"
                />
              </button>
            </div>
          ))}
        </div>

        <button
          id="cert-prev"
          type="button"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-700 shadow hover:bg-white dark:bg-slate-800/90 dark:text-slate-100"
          aria-label="Previous certificate"
          onClick={() =>
            setCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
          }
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button
          id="cert-next"
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-700 shadow hover:bg-white dark:bg-slate-800/90 dark:text-slate-100"
          aria-label="Next certificate"
          onClick={() => setCertIndex((prev) => (prev + 1) % certificates.length)}
        >
          <FaChevronRight aria-hidden="true" />
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {certificates.map((_, index) => (
            <button
              key={`cert-dot-${index}`}
              type="button"
              className={`slider-dot h-2.5 w-2.5 rounded-full bg-white/75 ${
                certIndex === index ? "active" : ""
              }`}
              aria-label={`Certificate slide ${index + 1}`}
              onClick={() => setCertIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
      {isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        role="dialog"
        aria-modal="true"
        onClick={() => setIsOpen(false)}
      >
        <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Close full view"
            className="absolute right-2 top-2 z-50 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white dark:bg-slate-800/90 dark:text-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes aria-hidden="true" />
          </button>
          <Image
            src={modalSrc}
            alt="Certificate full view"
            width={1400}
            height={1000}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      </div>
      )}
    </>
  );
}
