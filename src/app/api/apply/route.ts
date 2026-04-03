import { NextResponse } from "next/server";

interface ApplyRequestBody {
  studentName?: string;
  fatherName?: string;
  dateOfBirth?: string;
  education?: string;
  preferredCourse?: string;
  preferredTime?: string;
  contactNo?: string;
  email?: string;
  address?: string;
  termsAccepted?: boolean;
}

export async function POST(request: Request) {
  let body: ApplyRequestBody;

  try {
    body = (await request.json()) as ApplyRequestBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON payload."
      },
      { status: 400 }
    );
  }

  const requiredFields: Array<keyof ApplyRequestBody> = [
    "studentName",
    "fatherName",
    "dateOfBirth",
    "education",
    "preferredCourse",
    "preferredTime",
    "contactNo",
    "email",
    "address"
  ];

  const missingFields = requiredFields.filter(
    (field) => !String(body[field] || "").trim()
  );

  if (!body.termsAccepted) {
    missingFields.push("termsAccepted");
  }

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required application fields.",
        missingFields
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Application request received successfully.",
    data: {
      ...body,
      createdAt: new Date().toISOString()
    }
  });
}
