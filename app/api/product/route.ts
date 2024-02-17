import { db } from "@/prisma/db"

export async function GET(req: Request) {
    // Auth
    const data = await db.product.findMany()
    return Response.json({ data })
}