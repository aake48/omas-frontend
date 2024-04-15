import { useHTTPSAgent } from "@/lib/hooks/get-https-agent";
import * as Q from "../../../lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface LoginRequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const requestBody: LoginRequestBody = await request.json();
  const httpsAgent = useHTTPSAgent();

  try {
    const response = await axios.post(
      Q.loginURL,
      {
        username: requestBody.username,
        password: requestBody.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );
    return NextResponse.json({ body: response.data, status: response.status });
  } catch (error: any) {
    console.error(error.response!.data);
    return NextResponse.json(
      { message: error.response!.data },
      { status: error.status }
    );
  }
}
