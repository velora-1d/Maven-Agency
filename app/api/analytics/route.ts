import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { recordPageView } from "@/lib/store";

const analyticsSchema = z.object({
  path: z.string().min(1),
  locale: z.enum(["id", "en"]),
  referrer: z.string().default("direct")
});

export async function POST(request: Request) {
  const payload = analyticsSchema.parse(await request.json());
  const cookieStore = await cookies();
  let visitorId = cookieStore.get("maven_visitor_id")?.value;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
  }

  await recordPageView({
    path: payload.path,
    locale: payload.locale,
    referrer: payload.referrer || "direct",
    visitorId
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("maven_visitor_id", visitorId, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/"
  });
  return response;
}
