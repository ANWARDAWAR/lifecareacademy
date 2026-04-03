"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ApplyModal from "@/components/modals/ApplyModal";
import CourseDetailsModal from "@/components/modals/CourseDetailsModal";
import CourseCard from "@/components/ui/CourseCard";
import { COURSE_CATEGORIES, COURSES } from "@/data/courses";

export default function FeaturedCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof COURSE_CATEGORIES)[number]>(
    "All"
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyCourseName, setApplyCourseName] = useState("");

  const filteredCourses = useMemo(() => {
    const categoryCourses =
      selectedCategory === "All"
        ? COURSES
        : COURSES.filter((course) => course.category === selectedCategory);

    return categoryCourses.slice(0, 4);
  }, [selectedCategory]);

  const selectedCourse = useMemo(
    () => (selectedCourseId ? COURSES.find((course) => course.id === selectedCourseId) ?? null : null),
    [selectedCourseId]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Top Rated Courses
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">
            Most In-Demand Training Programs
          </h3>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
        >
          View All Courses
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {COURSE_CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                active
                  ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
                  : "border-slate-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "All" ? "All Programs" : category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredCourses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            index={index}
            onReadMore={(courseId) => setSelectedCourseId(courseId)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
          No courses are available for this category right now.
        </p>
      ) : null}

      {selectedCourse ? (
        <CourseDetailsModal
          isOpen
          course={selectedCourse}
          onClose={() => setSelectedCourseId(null)}
          onApply={(courseTitle) => {
            setApplyCourseName(courseTitle);
            setApplyModalOpen(true);
          }}
        />
      ) : null}

      {applyModalOpen ? (
        <ApplyModal
          isOpen
          initialCourse={applyCourseName}
          onClose={() => setApplyModalOpen(false)}
        />
      ) : null}
    </section>
  );
}
