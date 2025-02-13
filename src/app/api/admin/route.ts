import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { adminUrl } from "@/app/Services/auth";

export async function POST(req: NextRequest) {
  const { method, endpoint, data } = await req.json();

  try {
    const response = await axios({
      method,

      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
      data,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
