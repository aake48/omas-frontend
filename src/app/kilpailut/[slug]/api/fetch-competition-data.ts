import { getCompetitionByIdUrl } from "@/lib/APIConstants";
import axios from "axios";

export const fetchCompetitionData = async (competitionId: string) => {
    try {
        axios
            .get(getCompetitionByIdUrl(competitionId), {
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