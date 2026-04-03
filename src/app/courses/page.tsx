"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import ApplyModal from "@/components/modals/ApplyModal";
import CourseDetailsModal from "@/components/modals/CourseDetailsModal";
import CourseCard from "@/components/ui/CourseCard";
import { COURSE_CATEGORIES, COURSES } from "@/data/courses";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<(typeof COURSE_CATEGORIES)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyCourseName, setApplyCourseName] = useState("");

  useEffect(() => {
    if (!searchParams) return;

    if (searchParams.get("apply") === "1") {
      const courseFromQuery = searchParams.get("course") ?? "";
      setApplyCourseName(courseFromQuery);
      setApplyModalOpen(true);
    }

    const courseQuery = searchParams.get("course");
    if (courseQuery) {
      const normalizedQuery = courseQuery.trim().toLowerCase();
      const matchedCourse = COURSES.find(
        (course) =>
          course.id.toLowerCase() === normalizedQuery ||
          course.title.toLowerCase() === normalizedQuery
      );

      if (matchedCourse) {
        setSelectedCourseId(matchedCourse.id);
      }
    }
  }, [searchParams]);

  const selectedCourse = useMemo(
    () => (selectedCourseId ? COURSES.find((course) => course.id === selectedCourseId) ?? null : null),
    [selectedCourseId]
  );

  const filteredCourses = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const textBlob = (
        course.title +
        " " +
        course.category +
        " " +
        course.shortDescription +
        " " +
        course.overview
      ).toLowerCase();
      const matchesSearch = !needle || textBlob.includes(needle);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            All Courses
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Explore a Variety of Quality Programs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Search by keyword or filter by category. Every program opens in a
            detailed in-page modal with structured information.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 md:grid-cols-[1.3fr_2fr]">
            <label className="relative block">
              <span className="sr-only">Search courses</span>
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="course-search"
                type="text"
                placeholder="Search courses, standards, or outcomes"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-brand-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {COURSE_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    className={`category-filter rounded-full border px-4 py-2 text-sm font-semibold ${
                      active
                        ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
                        : "border-slate-300"
                    }`}
                    data-category={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "All" ? "All Programs" : category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div id="courses-grid" className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onReadMore={(courseId) => setSelectedCourseId(courseId)}
            />
          ))}
        </div>

        <p
          id="courses-empty"
          className={`${filteredCourses.length > 0 ? "hidden" : ""} mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200`}
        >
          No courses matched your filter. Try a broader keyword or switch
          categories.
        </p>
      </div>

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
