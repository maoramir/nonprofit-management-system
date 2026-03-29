import { NextRequest, NextResponse } from "next/server";
import { createSubmission, listSubmissions } from "@/lib/server/submissions-repository";
import { mergeWithDefaults } from "@/lib/utils";

export async function GET() {
  const submissions = await listSubmissions();
  return NextResponse.json({ submissions });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const submission = await createSubmission(mergeWithDefaults(body.data));
  return NextResponse.json({ submission }, { status: 201 });
}
