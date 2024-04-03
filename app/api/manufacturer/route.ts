import { db } from "@/prisma/db";

export const dynamic = "force-dynamic";

// HTTP method GET
export async function GET(req: Request) {
  const data = await db.manufacturer.findMany();
  return Response.json({ data });
}
