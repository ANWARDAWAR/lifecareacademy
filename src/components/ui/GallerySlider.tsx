"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const galleryImages = ["/ad1.png", "/ad2.png", "/ad3.png", "/ad4.png", "/ad5.png"];

export default function GallerySlider() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 6000);

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
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Gallery
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">Inside LifeCare Academy</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="gallery-prev"
            type="button"
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Previous gallery image"
            onClick={() =>
              setGalleryIndex(
                (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
              )
            }
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            id="gallery-next"
            type="button"
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Next gallery image"
            onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div
          id="gallery-track"
          className="gallery-track"
          style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
        >
          {galleryImages.map((image, index) => (
            <div key={image} className="gallery-slide p-4">
              <button
                type="button"
                className="w-full"
                onClick={() => {
                  setModalSrc(image);
                  setIsOpen(true);
                }}
                aria-label={`Open gallery image ${index + 1} full view`}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={1400}
                  height={900}
                  className="h-[360px] w-full cursor-zoom-in rounded-xl object-cover"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={`gallery-dot-${index}`}
              type="button"
              className={`gallery-dot h-2.5 w-2.5 rounded-full bg-white/75 ${
                galleryIndex === index ? "active" : ""
              }`}
              aria-label={`Gallery slide ${index + 1}`}
              onClick={() => setGalleryIndex(index)}
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
            alt="Gallery full view"
            width={1600}
            height={1000}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      </div>
      )}
    </>
  );
}
