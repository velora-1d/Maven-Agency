import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";

import { authOptions } from "@/lib/auth-options";
import { deleteResourceItem, updateResourceItem } from "@/lib/store";
import type { AdminResourceKey } from "@/lib/types";
import { resourceSchemas } from "@/lib/validators";

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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource: rawResource, id } = await context.params;
  const resource = assertResource(rawResource);

  if (!resource) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const payload = await request.json();
    const item = resourceSchemas[resource].parse(payload);
    const saved = await updateResourceItem(resource, id, item);

    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    console.error(`[maven-forge] PATCH /api/admin/${resource}/${id} error:`, error);
    return NextResponse.json({ error: "Unable to update item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await ensureSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource: rawResource, id } = await context.params;
  const resource = assertResource(rawResource);

  if (!resource) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const result = await deleteResourceItem(resource, id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(`[maven-forge] DELETE /api/admin/${resource}/${id} error:`, error);
    return NextResponse.json({ error: "Unable to delete item" }, { status: 500 });
  }
}
