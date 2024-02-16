import { db } from "@/prisma/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
        clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
        clientSecret: "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"
    })
  ]
})

export { handler as GET, handler as POST }