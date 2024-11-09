import { errorHandling } from "@/app/Services/errorHandling";
import { getApi, postApi } from "../../services/requests";

export async function POST(req: Request) {
  try {
    const { data, token } = await req.json();
    const rdata = await postApi(
      "/Api/Workspace_/workspace_create",
      data,
      token
    );
    return new Response(JSON.stringify(rdata), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    throw new Error(errorHandling(error));
    // console.error(error, "Error creating workspace");
    // return new Response(JSON.stringify(error), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  }
}
