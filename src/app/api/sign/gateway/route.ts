import { getApi, postApi } from "../../services/requests";

export async function POST(req: Request) {
  try {
    const { data, token } = await req.json();
    const rdata = await postApi(
      "/api/ImportFromApiGateWay/import_from_api_gateway",
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
    return new Response(JSON.stringify(error?.message), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
