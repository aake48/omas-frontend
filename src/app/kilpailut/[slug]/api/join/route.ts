import { addTeamMemberURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const requestbody = await request.json();
    const trimmedTeamName = requestbody.teamName.trim();

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
          }
        );
        return NextResponse.json(response.data);
        
    } catch (error: any) {
        console.log("Route error");
        console.log(error);
        return NextResponse.json({ error: "Virhe joukkueeseen liittymisessä"})
    }
  };