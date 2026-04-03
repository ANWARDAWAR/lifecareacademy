import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
      <CoursesClient />
    </Suspense>
  );
}
