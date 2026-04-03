"use client";

import html2canvas from "html2canvas";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  PointerEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { FaTimes, FaUser } from "react-icons/fa";
import { COURSES } from "@/data/courses";
import CourseImageDropdown from "@/components/ui/CourseImageDropdown";

interface ApplyModalProps {
  isOpen: boolean;
  initialCourse?: string;
  onClose: () => void;
}

interface AdmissionReceiptData {
  studentName: string;
  fatherName: string;
  preferredCourse: string;
  contactNo: string;
  dateOfBirth: string;
  address: string;
  studentPhoto: string;
  cnicFront: string;
  cnicBack: string;
  signatureDataUrl: string;
  generatedAt: string;
}

interface ApplySubmissionPayload {
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  education: string;
  preferredCourse: string;
  preferredTime: string;
  contactNo: string;
  email: string;
  address: string;
  termsAccepted: boolean;
}

const WHATSAPP_TEXT =
  "Assalam o Alaikum! I am applying for admission. My details are in the downloaded form image, which I am attaching here.";

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const waitForReceiptImages = async (receiptElement: HTMLElement) => {
  const images = Array.from(receiptElement.querySelectorAll("img"));

  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const done = () => resolve();
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
      });
    })
  );
};

export default function ApplyModal({ isOpen, initialCourse = "", onClose }: ApplyModalProps) {
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseValue, setCourseValue] = useState(initialCourse || "");
  const [studentPhoto, setStudentPhoto] = useState("");
  const [cnicFront, setCnicFront] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [receiptData, setReceiptData] = useState<AdmissionReceiptData | null>(null);

  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingSignatureRef = useRef(false);
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const studentPhotoCameraInputRef = useRef<HTMLInputElement | null>(null);
  const studentPhotoGalleryInputRef = useRef<HTMLInputElement | null>(null);
  const cnicFrontCameraInputRef = useRef<HTMLInputElement | null>(null);
  const cnicFrontGalleryInputRef = useRef<HTMLInputElement | null>(null);
  const cnicBackCameraInputRef = useRef<HTMLInputElement | null>(null);
  const cnicBackGalleryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCourseValue(initialCourse || "");
  }, [initialCourse]);

  const handleImageUpload = useCallback(
    (
      event: ChangeEvent<HTMLInputElement>,
      setTargetState: Dispatch<SetStateAction<string>>
    ) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const result = typeof reader.result === "string" ? reader.result : "";
        setTargetState(result);
      };

      reader.onerror = () => {
        setTargetState("");
        setFeedbackTone("error");
        setFeedback("Failed to read selected image. Please try another file.");
      };

      reader.readAsDataURL(file);
      event.target.value = "";
    },
    []
  );

  const setupSignatureCanvas = useCallback(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.floor(rect.width));
    const cssHeight = Math.max(1, Math.floor(rect.height));

    canvas.width = cssWidth * ratio;
    canvas.height = cssHeight * ratio;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(ratio, ratio);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, cssWidth, cssHeight);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#0f172a";
    context.lineWidth = 2;
  }, []);

  const clearSignatureCanvas = useCallback(() => {
    setupSignatureCanvas();
    setSignatureDataUrl("");
  }, [setupSignatureCanvas]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      setupSignatureCanvas();
      setStudentPhoto("");
      setCnicFront("");
      setCnicBack("");
      setSignatureDataUrl("");
      setReceiptData(null);
      setFeedbackTone("success");
      setFeedback("");
    });
  }, [isOpen, setupSignatureCanvas]);

  const getSignaturePoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const onSignaturePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    const context = canvas?.getContext("2d");
    const point = getSignaturePoint(event);

    if (!canvas || !context || !point) return;

    isDrawingSignatureRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(point.x + 0.01, point.y + 0.01);
    context.stroke();
    event.preventDefault();
  };

  const onSignaturePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingSignatureRef.current) return;

    const canvas = signatureCanvasRef.current;
    const context = canvas?.getContext("2d");
    const point = getSignaturePoint(event);

    if (!context || !point) return;

    context.lineTo(point.x, point.y);
    context.stroke();
    event.preventDefault();
  };

  const onSignaturePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas || !isDrawingSignatureRef.current) return;

    isDrawingSignatureRef.current = false;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      // no-op
    }

    const context = canvas.getContext("2d");
    context?.closePath();
    setSignatureDataUrl(canvas.toDataURL("image/png"));
    event.preventDefault();
  };

  const submitAdmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const studentName = String(formData.get("studentName") || "").trim();
    const fatherName = String(formData.get("fatherName") || "").trim();
    const dateOfBirth = String(formData.get("dateOfBirth") || "").trim();
    const education = String(formData.get("education") || "").trim();
    const preferredCourse = (
      courseValue || String(formData.get("preferredCourse") || "")
    ).trim();
    const preferredTime = String(formData.get("preferredTime") || "").trim();
    const contactNo = String(formData.get("contactNo") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const termsAccepted = formData.get("terms") === "on";

    const formReceiptData: AdmissionReceiptData = {
      studentName,
      fatherName,
      dateOfBirth,
      preferredCourse,
      contactNo,
      address,
      studentPhoto,
      cnicFront,
      cnicBack,
      signatureDataUrl,
      generatedAt: new Date().toLocaleDateString("en-PK", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      })
    };

    const submissionPayload: ApplySubmissionPayload = {
      studentName,
      fatherName,
      dateOfBirth,
      education,
      preferredCourse,
      preferredTime,
      contactNo,
      email,
      address,
      termsAccepted
    };

    if (!preferredCourse) {
      setFeedbackTone("error");
      setFeedback("Please select a preferred course before submitting.");
      setIsSubmitting(false);
      return;
    }

    if (!formReceiptData.signatureDataUrl) {
      setFeedbackTone("error");
      setFeedback("Please draw your signature before generating the admission form.");
      setIsSubmitting(false);
      return;
    }

    if (!formReceiptData.studentPhoto || !formReceiptData.cnicFront || !formReceiptData.cnicBack) {
      setFeedbackTone("error");
      setFeedback("Please upload student photo, CNIC front, and CNIC back images.");
      setIsSubmitting(false);
      return;
    }

    if (
      !studentName ||
      !fatherName ||
      !dateOfBirth ||
      !education ||
      !preferredTime ||
      !contactNo ||
      !email ||
      !address
    ) {
      setFeedbackTone("error");
      setFeedback("Please complete all required fields before generating the form.");
      setIsSubmitting(false);
      return;
    }

    if (!termsAccepted) {
      setFeedbackTone("error");
      setFeedback("Please agree to terms and conditions before submitting.");
      setIsSubmitting(false);
      return;
    }

    setReceiptData(formReceiptData);

    try {
      const submissionResponse = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionPayload)
      });

      if (!submissionResponse.ok) {
        throw new Error("Application submission failed");
      }

      await waitForNextPaint();
      await waitForNextPaint();

      if (!receiptRef.current) {
        throw new Error("Receipt container was not found");
      }

      const receiptElement = receiptRef.current;
      await waitForReceiptImages(receiptElement);

      const canvas = await html2canvas(receiptElement, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: "#ffffff"
      });

      const receiptImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = receiptImage;
      downloadLink.download = "LifeCare-Admission-Form.png";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      const message = WHATSAPP_TEXT;
      window.open(
        "https://wa.me/923489196200?text=" + encodeURIComponent(message),
        "_blank",
        "noopener,noreferrer"
      );

      form.reset();
      setCourseValue("");
      setStudentPhoto("");
      setCnicFront("");
      setCnicBack("");
      clearSignatureCanvas();
      setReceiptData(null);
      setFeedback("");
      setIsSubmitting(false);
      onClose();
    } catch {
      setFeedbackTone("error");
      setFeedback("Failed to submit the application form. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="apply-modal"
      className="modal-shell"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-label="Apply online"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-panel p-5 sm:p-7">
        <div className="apply-modal-inner">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
                Admissions
              </p>
              <h3 className="mt-2 text-3xl font-extrabold">Apply Online</h3>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Close apply modal"
              onClick={onClose}
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={submitAdmission}>
            <div className="grid gap-4 lg:grid-cols-[1.85fr_1fr]">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="apply-student-name"
                    className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Student Name
                  </label>
                  <input
                    id="apply-student-name"
                    name="studentName"
                    type="text"
                    required
                    className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="apply-father-name"
                    className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Father Name
                  </label>
                  <input
                    id="apply-father-name"
                    name="fatherName"
                    type="text"
                    required
                    className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="apply-date-of-birth"
                    className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="apply-date-of-birth"
                    name="dateOfBirth"
                    type="date"
                    required
                    className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="apply-education"
                    className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Education
                  </label>
                  <input
                    id="apply-education"
                    name="education"
                    type="text"
                    required
                    className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="glass-soft rounded-xl p-3">
                <p className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Passport / Student Photo</p>
                <div className="relative mb-3 flex h-44 items-center justify-center overflow-hidden rounded-lg border border-slate-300/80 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80">
                  {studentPhoto ? (
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${studentPhoto})` }}
                    />
                  ) : (
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                      <FaUser className="text-2xl" aria-hidden="true" />
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => studentPhotoCameraInputRef.current?.click()}
                    className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-800/60 dark:bg-brand-900/20 dark:text-brand-200 dark:hover:bg-brand-900/35"
                  >
                    Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => studentPhotoGalleryInputRef.current?.click()}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Choose from Gallery
                  </button>
                </div>

                <input
                  ref={studentPhotoCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(event) => handleImageUpload(event, setStudentPhoto)}
                  className="hidden"
                />
                <input
                  ref={studentPhotoGalleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setStudentPhoto)}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="apply-preferred-course"
                  className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Preferred Course
                </label>
                <CourseImageDropdown
                  id="apply-preferred-course"
                  name="preferredCourse"
                  courses={COURSES}
                  value={courseValue}
                  onChange={setCourseValue}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="apply-preferred-time"
                  className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Preferred Time
                </label>
                <select
                  id="apply-preferred-time"
                  name="preferredTime"
                  required
                  className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="Morning">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Evening">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="apply-contact-no"
                  className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Contact No.
                </label>
                <input
                  id="apply-contact-no"
                  name="contactNo"
                  type="tel"
                  required
                  className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="apply-email"
                  className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <input
                  id="apply-email"
                  name="email"
                  type="email"
                  required
                  className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                />
              </div>

              <div className="rounded-xl border border-slate-300/80 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">CNIC Front</p>
                <div className="mt-2 flex h-24 items-center justify-center overflow-hidden rounded-lg border border-slate-300/80 bg-white dark:border-slate-700 dark:bg-slate-800">
                  {cnicFront ? (
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${cnicFront})` }}
                    />
                  ) : (
                    <span className="text-xs font-medium text-slate-400">No image selected</span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => cnicFrontCameraInputRef.current?.click()}
                    className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-800/60 dark:bg-brand-900/20 dark:text-brand-200 dark:hover:bg-brand-900/35"
                  >
                    Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => cnicFrontGalleryInputRef.current?.click()}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Choose from Gallery
                  </button>
                </div>
                <input
                  ref={cnicFrontCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(event) => handleImageUpload(event, setCnicFront)}
                  className="hidden"
                />
                <input
                  ref={cnicFrontGalleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setCnicFront)}
                  className="hidden"
                />
              </div>

              <div className="rounded-xl border border-slate-300/80 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">CNIC Back</p>
                <div className="mt-2 flex h-24 items-center justify-center overflow-hidden rounded-lg border border-slate-300/80 bg-white dark:border-slate-700 dark:bg-slate-800">
                  {cnicBack ? (
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${cnicBack})` }}
                    />
                  ) : (
                    <span className="text-xs font-medium text-slate-400">No image selected</span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => cnicBackCameraInputRef.current?.click()}
                    className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-800/60 dark:bg-brand-900/20 dark:text-brand-200 dark:hover:bg-brand-900/35"
                  >
                    Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => cnicBackGalleryInputRef.current?.click()}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Choose from Gallery
                  </button>
                </div>
                <input
                  ref={cnicBackCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(event) => handleImageUpload(event, setCnicBack)}
                  className="hidden"
                />
                <input
                  ref={cnicBackGalleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setCnicBack)}
                  className="hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="apply-address"
                  className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Address
                </label>
                <input
                  id="apply-address"
                  name="address"
                  type="text"
                  required
                  className="glass-input w-full rounded-lg px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <input
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Agree to terms and conditions
            </label>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Draw Signature</label>
                <button
                  type="button"
                  onClick={clearSignatureCanvas}
                  className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Clear Signature
                </button>
              </div>
              <div className="rounded-xl border border-slate-300/80 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                <canvas
                  ref={signatureCanvasRef}
                  onPointerDown={onSignaturePointerDown}
                  onPointerMove={onSignaturePointerMove}
                  onPointerUp={onSignaturePointerUp}
                  onPointerLeave={onSignaturePointerUp}
                  onPointerCancel={onSignaturePointerUp}
                  className="h-32 w-full touch-none rounded-lg border border-slate-300 bg-white dark:border-slate-600"
                />
                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Sign using mouse or touch.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gradient-to-r from-brand-700 via-brand-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_16px_34px_-16px_rgba(31,99,203,0.95)] ring-1 ring-brand-200/70 hover:from-brand-800 hover:via-brand-700 hover:to-cyan-600"
              >
                {isSubmitting ? "Generating Form..." : "Submit form"}
              </button>

              <p
                className={`${feedback ? "" : "hidden"} rounded-lg border px-3 py-2 text-sm font-semibold ${
                  feedbackTone === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200"
                    : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-200"
                }`}
              >
                {feedback}
              </p>
            </div>
          </form>

          <div
            ref={receiptRef}
            className="absolute left-[-9999px] top-0 w-[860px] bg-white p-8 text-slate-900"
            aria-hidden="true"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_24px_64px_-32px_rgba(15,23,42,0.45)]">
              <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="LifeCare Academy logo"
                    crossOrigin="anonymous"
                    className="h-14 w-14 object-contain"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">LifeCare Academy</p>
                    <h4 className="mt-2 text-3xl font-black text-slate-900">Admission Summary / Receipt</h4>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Generated Date</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{receiptData?.generatedAt || "-"}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Student Name</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.studentName || "-"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Father&apos;s Name</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.fatherName || "-"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Course</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.preferredCourse || "-"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Phone</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.contactNo || "-"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Date of Birth</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.dateOfBirth || "-"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Address</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{receiptData?.address || "-"}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Student Photo</p>
                  <div className="mt-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-white">
                    {receiptData?.studentPhoto ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={receiptData.studentPhoto}
                        alt="Student"
                        crossOrigin="anonymous"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">Not provided</span>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">CNIC Front</p>
                  <div className="mt-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-white">
                    {receiptData?.cnicFront ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={receiptData.cnicFront}
                        alt="CNIC front"
                        crossOrigin="anonymous"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">Not provided</span>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">CNIC Back</p>
                  <div className="mt-2 flex h-28 items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-white">
                    {receiptData?.cnicBack ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={receiptData.cnicBack}
                        alt="CNIC back"
                        crossOrigin="anonymous"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Drawn Signature</p>
                <div className="mt-2 flex h-28 items-center justify-center rounded-lg border border-slate-300 bg-white p-2">
                  {receiptData?.signatureDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={receiptData.signatureDataUrl}
                      alt="Student signature"
                      crossOrigin="anonymous"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-sm text-slate-400">Signature not available</p>
                  )}
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                This form was generated directly in-browser by LifeCare Academy&apos;s admission modal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
