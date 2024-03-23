import { db } from "@/prisma/db"

export const dynamic = "force-dynamic";

// HTTP method GET
export async function GET(req: Request) {
    // Auth
    const data = await db.product.findMany()
    return Response.json({ data })
}