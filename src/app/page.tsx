import React from "react";
import { CompetitionResponse, QueryCompetition } from "@/types/commonTypes";
import { getCompetitionsQueryUrl } from "@/lib/APIConstants";
import fetchData from "@/lib/get";
import SeasonComponent from "./components/SeasonComponent";
import LatestResults from "./components/LatestResults";
import UpcomingCompetitions from "./components/UpcomingCompetitions";

export default async function Home() {

    const apiUrl = getCompetitionsQueryUrl("", 0, 10);
    const currentDate = new Date();
    
    const data: QueryCompetition = await fetchData(apiUrl);
    const competitions = data.content;
    
    const pastCompetitions: CompetitionResponse[] = [];
    const futureCompetitions: CompetitionResponse[] = [];
    
    competitions!.forEach((competition) => {
      const competitionDate = new Date(competition.startDate);
    
      if (competitionDate < currentDate) {
        pastCompetitions.push(competition);
      } else {
        futureCompetitions.push(competition);
      }
    });


        return (
            <main className="min-h-screen p-8">
                <SeasonComponent />
                <UpcomingCompetitions futureCompetitions={futureCompetitions} />
                <LatestResults pastCompetitions={pastCompetitions} />
            </main>
        );
    } 