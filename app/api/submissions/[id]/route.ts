import { NextRequest, NextResponse } from "next/server";
import {
  getSubmissionById,
  updateSubmissionStatus
} from "@/lib/server/submissions-repository";
import { SubmissionStatus } from "@/lib/types";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const submission = await getSubmissionById(id);

  if (!submission) {
    return NextResponse.json({ message: "הפנייה לא נמצאה" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = (await request.json()) as { status?: SubmissionStatus };

  if (!body.status) {
    return NextResponse.json({ message: "חסר סטטוס" }, { status: 400 });
  }

  const submission = await updateSubmissionStatus(id, body.status);

  if (!submission) {
    return NextResponse.json({ message: "הפנייה לא נמצאה" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}
