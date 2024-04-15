import { useHTTPSAgent } from "@/lib/hooks/get-https-agent";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as Q from "../../lib/APIConstants";
import { getUpcomingCompetitions } from "../../lib/APIConstants";

export async function GET(request: NextRequest) {
  const httpsAgent = useHTTPSAgent();
  const targetUrl = request.headers.get("url") ?? "";

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent,
    });
    return NextResponse.json(
      { body: response.data.json() },
      { status: response.status }
    );
  } catch (error: any) {
    console.error(error.response.data);
    return NextResponse.json({
      body: error.response.data,
      status: error.response.status,
    });
  }
}
