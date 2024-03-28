import { getCompetitionInfoQueryURL } from "@/lib/APIConstants";
import axios from "axios";

export const fetchTeams = async (competitionId: string) => {

    try {
        axios
            // size=100 is a temporary solution to get all teams, to be able to find out if use is a member of any team
            .get(getCompetitionInfoQueryURL(competitionId, 0, 100), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.data;
            });

    } catch (error) {
        console.error(error)
    }
};