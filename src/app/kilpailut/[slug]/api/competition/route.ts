import { useHTTPSAgent } from "@/lib/hooks/get-https-agent";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as Q from "@/lib/APIConstants";

//GET https://localhost:8080/api/user/teams
//getting users teams

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    const httpsAgent = useHTTPSAgent();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error("No auth header found in request.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    try {
      const response = await axios.get(Q.getUserCompetitions(), {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        httpsAgent,
      });
      return NextResponse.json(response.data);
    } catch (error: any) {
      console.error(error);
        return NextResponse.json({ message: error.response!.data, status: error.status });
    }
  }