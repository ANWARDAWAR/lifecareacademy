"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FaDownload, FaPaperPlane, FaTimes } from "react-icons/fa";
import { Course } from "@/types/course";

interface CourseDetailsModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onApply: (courseTitle: string) => void;
}

export default function CourseDetailsModal({
  isOpen,
  course,
  onClose,
  onApply
}: CourseDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) {
    return null;
  }

  return (
    <div
      id="course-modal"
      className="modal-shell"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-label="Course details modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-panel p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
            <div>
              <p
                id="course-modal-category"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300"
              >
                {course.category}
              </p>
              <h3 id="course-modal-title" className="mt-2 text-3xl font-extrabold">
                {course.title}
              </h3>
            </div>
            <button
              id="course-modal-close"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Close course modal"
              onClick={onClose}
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Image
              id="course-modal-image"
              src={course.image}
              alt={course.title}
              width={900}
              height={600}
              className="h-64 w-full rounded-xl object-cover"
            />
            <div>
              <p
                id="course-modal-overview"
                className="text-sm leading-7 text-slate-600 dark:text-slate-300"
              >
                {course.overview}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-xs uppercase text-slate-500">Duration</p>
                  <p id="course-modal-duration" className="mt-1 text-sm font-bold">
                    {course.duration}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-xs uppercase text-slate-500">Course Fee</p>
                  <p id="course-modal-fee" className="mt-1 text-sm font-bold">
                    {course.fee}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-bold">What You Will Learn</h4>
              <ul
                id="course-modal-learn"
                className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"
              >
                {course.learn.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold">Course Modules</h4>
              <ul
                id="course-modal-modules"
                className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"
              >
                {course.modules.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/forms/application-form.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <FaDownload aria-hidden="true" />
              Download Application Form
            </a>
            <button
              id="course-modal-apply"
              type="button"
              className="apply-now inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              data-course={course.title}
              onClick={() => onApply(course.title)}
            >
              <FaPaperPlane aria-hidden="true" />
              Apply Now
            </button>
          </div>
      </div>
    </div>
  );
}
