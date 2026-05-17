import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/drizzle/schema";

export function getDb() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    return null;
  }

  const client = neon(url);
  return drizzle(client, { schema });
}
