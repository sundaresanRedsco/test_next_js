import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { adminUrl } from "@/app/Services/auth";

export async function POST(req: NextRequest) {
  const { method, endpoint, data } = await req.json();

  console.log(adminUrl, method, endpoint, data, "adminUrl");

  try {
    const response = await axios({
      method,
      // url: `https://api.apiflow.pro/${endpoint}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
      data,
      // headers: req?.headers,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
