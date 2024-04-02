import { addTeamToCompetitionURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    console.log(requestBody);
    const trimmedTeamName = requestBody.teamName.trim();
    if (trimmedTeamName === "") return;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.post(
          addTeamToCompetitionURL,
          { teamName: trimmedTeamName, competitionName: requestBody.competitionName },
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Virhe joukkueen luonnissa"})
    }
  };