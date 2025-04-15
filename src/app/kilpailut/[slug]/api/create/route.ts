import { addTeamToCompetitionURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from 'https'

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const trimmedTeamName = requestBody.teamName.trim();
    if (trimmedTeamName === "") {
      return NextResponse.json({ message: "Joukkueen nimi ei voi olla tyhjä" }, { status: 400 });
    }
    if(requestBody.teamDisplayShort === ""){
      return NextResponse.json({ message: "Joukkueen lyhenne ei voi olla tyhjä" }, { status: 400 });
    }
    if(requestBody.teamSeries === ""){
      return NextResponse.json({ message: "Valitse joukkueelle sarja" }, { status: 400 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.post(
          addTeamToCompetitionURL,
          { teamName: trimmedTeamName, competitionName: requestBody.competitionName, 
            teamDisplayShort: requestBody.teamDisplayShort, teamSeries: requestBody.teamSeries},
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
          }
        );
        return NextResponse.json({body: response.data, status: response.status });
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: error.response.data.message}, { status: 500 })
    }
  };