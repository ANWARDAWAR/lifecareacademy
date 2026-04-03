"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaImage } from "react-icons/fa";
import { Course } from "@/types/course";

interface CourseImageDropdownProps {
  courses: Course[];
  value: string;
  onChange: (courseTitle: string) => void;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function CourseImageDropdown({
  courses,
  value,
  onChange,
  id,
  name,
  placeholder = "Choose a course...",
  required = false
}: CourseImageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.title === value),
    [courses, value]
  );

  const filteredCourses = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    if (!needle) {
      return courses;
    }

    return courses.filter((course) => {
      const blob = `${course.title} ${course.category}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [courses, searchTerm]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        id={id}
        type="button"
        className="glass-input flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex min-w-0 items-center gap-3">
          {selectedCourse ? (
            <Image
              src={selectedCourse.image}
              alt={selectedCourse.title}
              width={38}
              height={24}
              className="h-6 w-10 rounded object-contain"
            />
          ) : (
            <span className="inline-flex h-6 w-10 items-center justify-center rounded bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              <FaImage className="text-[10px]" aria-hidden="true" />
            </span>
          )}
          <span
            className={`truncate ${value ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}
          >
            {value || placeholder}
          </span>
        </span>
        <FaChevronDown
          className={`text-xs text-slate-500 transition-transform dark:text-slate-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <input type="hidden" name={name} value={value} required={required} />

      {isOpen ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/40 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <div className="border-b border-slate-200 p-2 dark:border-slate-700">
            <input
              type="text"
              placeholder="Search course..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="glass-input w-full rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <ul className="max-h-64 overflow-auto p-1" role="listbox">
            {filteredCourses.map((course) => (
              <li key={course.id} role="option" aria-selected={value === course.title}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-brand-50 dark:hover:bg-brand-900/20"
                  onClick={() => {
                    onChange(course.title);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={48}
                    height={28}
                    className="h-7 w-12 rounded object-contain"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {course.title}
                    </span>
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                      {course.category}
                    </span>
                  </span>
                </button>
              </li>
            ))}

            {filteredCourses.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                No matching courses found.
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}