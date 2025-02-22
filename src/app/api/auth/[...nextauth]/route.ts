import { authOptions } from "@/lib/auth";
import NextAuth, { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions);
// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
