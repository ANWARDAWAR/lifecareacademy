"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function GlobalBackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
      <button
        type="button"
        onClick={handleBack}
        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-600 dark:hover:text-brand-200"
      >
        <FaArrowLeft
          className="text-[11px] transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Go Back
      </button>
    </div>
  );
}
