import { addTeamMemberURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { useHTTPSAgent } from "@/lib/hooks/get-https-agent";

export async function POST(request: NextRequest) {
    const requestbody = await request.json();
    const trimmedTeamName = requestbody.teamName.trim();
    const httpsAgent = useHTTPSAgent();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const response = await axios.post(
          addTeamMemberURL,
          { teamName: trimmedTeamName, competitionName: requestbody.competitionName },
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            httpsAgent,
          }
        );
        return NextResponse.json({body: response.data, status: response.status });
        
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: "Virhe joukkueeseen liittymisessä"}, { status: 500 })
    }
  };