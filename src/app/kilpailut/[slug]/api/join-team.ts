import { addTeamMemberURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextResponse } from "next/server";

export const joinTeam = async (teamName: string, competitionId: string) => {
    const trimmedTeamName = teamName.trim();
    try {
        const response = await axios.post(
          addTeamMemberURL,
          { teamName: trimmedTeamName, competitionName: competitionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        return NextResponse.json(response.data);
        
    } catch (error) {
        console.error(error)
    }
  };