import { db } from "@/prisma/db"

// HTTP method GET
export async function GET(req: Request) {
    // Auth
    const data = await db.product.findMany()
    return Response.json({ data })
}