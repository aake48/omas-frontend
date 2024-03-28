import { addTeamToCompetitionURL } from "@/lib/APIConstants";
import axios from "axios";

export   const createTeam = async (teamName: string, competitionId: string) => {
    const trimmedTeamName = teamName.trim();
    if (trimmedTeamName === "") return;

    try {
        const response = await axios.post(
          addTeamToCompetitionURL,
          { teamName: trimmedTeamName, competitionName: competitionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
    } catch (error) {
        console.error(error)
    }
  };