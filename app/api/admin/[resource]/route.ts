import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import { authOptions } from "@/lib/auth-options";
import { resourceSchemas } from "@/lib/validators";
import { createResourceItem, listResource } from "@/lib/store";
import type { AdminResourceKey } from "@/lib/types";

function assertResource(resource: string): AdminResourceKey | null {
  if (resource in resourceSchemas) {
    return resource as AdminResourceKey;
  }

  return null;
}

async function ensureSession() {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ resource: string }> }
) {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource: rawResource } = await context.params;
  const resource = assertResource(rawResource);

  if (!resource) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const items = await listResource(resource);
  return NextResponse.json(items);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ resource: string }> }
) {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource: rawResource } = await context.params;
  const resource = assertResource(rawResource);

  if (!resource) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const payload = await request.json();
    const item = resourceSchemas[resource].parse(payload);
    const saved = await createResourceItem(resource, item);

    revalidatePath("/", "layout");

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    console.error(`[maven-forge] POST /api/admin/${resource} error:`, error);
    return NextResponse.json({ error: "Unable to save item" }, { status: 500 });
  }
}
