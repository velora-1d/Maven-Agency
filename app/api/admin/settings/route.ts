import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";

import { authOptions } from "@/lib/auth-options";
import { getSettings, saveSettings } from "@/lib/store";
import { settingsSchema } from "@/lib/validators";

async function ensureSession() {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
}

export async function GET() {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = settingsSchema.parse(await request.json());
    const saved = await saveSettings(payload);

    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to save settings" }, { status: 500 });
  }
}
