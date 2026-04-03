"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  onReadMore: (courseId: string) => void;
  index?: number;
}

export default function CourseCard({ course, onReadMore, index = 0 }: CourseCardProps) {
  return (
    <ScrollReveal delay={Math.min(index * 0.08, 0.32)} className="h-full">
      <article className="course-card flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
          <Image
            src={course.image}
            alt={course.title}
            width={500}
            height={220}
            className="h-full w-full object-contain p-2"
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
            {course.category}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {course.duration}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-extrabold">{course.title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {course.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-extrabold text-brand-700 dark:text-brand-300">
            {course.fee}
          </p>
          <button
            type="button"
            onClick={() => onReadMore(course.id)}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Read More
          </button>
        </div>
      </article>
    </ScrollReveal>
  );
}
