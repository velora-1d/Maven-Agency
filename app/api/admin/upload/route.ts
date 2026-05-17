import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Vercel Serverless Functions have a read-only filesystem (except /tmp).
  // For zero-config production deployments, convert the uploaded image to a Base64 Data URL.
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const base64Url = `data:${file.type};base64,${buffer.toString("base64")}`;
    return NextResponse.json({ url: base64Url });
  }

  // In local development, write to public/uploads
  const safeFileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const outputPath = path.join(uploadDir, safeFileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(outputPath, buffer);

  return NextResponse.json({
    url: `/uploads/${safeFileName}`
  });
}
