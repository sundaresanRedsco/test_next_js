import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  // Parse the JSON body from the request
  const data = await req.json();

  // Get session info using getServerSession
  let session: any = await getServerSession(authOptions); // Use getServerSession with authOptions

  // If no session is found, return an unauthorized response
  if (!session) {
    return new Response(
      JSON.stringify({ error: "You must be logged in to update your profile" }),
      {
        status: 401,
      }
    );
  }
  session.user = { ...session.user, ...data };
  // Assuming you update the user profile in a database here

  // You can store updated user info in the session or database as needed
  return new Response(JSON.stringify(session), {
    status: 200,
  });
}
