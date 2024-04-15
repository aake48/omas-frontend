import React from "react";
import { CompetitionResponse } from "@/types/commonTypes";
import {
  getUpcomingCompetitions,
  getUserCompetitions,
} from "@/lib/APIConstants";
import UpcomingCompetitions from "./components/UpcomingCompetitions";
import CurrentCompetitions from "./components/CurrentCompetitions";
import LatestCompetitions from "./components/LatestCompetitions";
import JoinClubTip from "./components/JoinClubTip";

export type competitionListProps = {
  competitions: CompetitionResponse[];
};

export default async function Home() {
  let futureCompetitions: CompetitionResponse[] = [];
  let pastOwnCompetitions: CompetitionResponse[] = [];
  let currentOwnCompetitions: CompetitionResponse[] = [];

  const currentDate = new Date();
  const futureCompetitionsUrl = getUpcomingCompetitions(0, 10);
  const ownCompetitionsUrl = getUserCompetitions();

  try {
    // TODO muuta pois kovakoodattu osoite
    await fetch("https://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        url: futureCompetitionsUrl,
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.status === 200) {
          const futureCompetitionsData = data.body;

          if (futureCompetitionsData.content !== null) {
            const futureCompetitionsAscending =
              futureCompetitionsData.content.reverse();
            futureCompetitions = futureCompetitionsAscending;
          }
        } else {
          console.log("Error fetching upcoming competitions");
          console.log(data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  try {
    // TODO muuta pois kovakoodattu osoite
    await fetch("https://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        url: ownCompetitionsUrl,
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.status === 200) {
          const ownCompetitionsData = data.body;

          if (ownCompetitionsData.content !== null) {
            ownCompetitionsData.content.forEach(
              (competition: CompetitionResponse) => {
                const competitionStartDate = new Date(competition.startDate);
                const competitionEndDate = new Date(competition.endDate);

                switch (true) {
                  case competitionStartDate < currentDate &&
                    competitionEndDate > currentDate:
                    currentOwnCompetitions.push(competition);
                    break;
                  case competitionEndDate < currentDate:
                    pastOwnCompetitions.push(competition);
                    break;
                  default:
                    break;
                }
              }
            );
            currentOwnCompetitions.sort((a, b) => {
              return (
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
              );
            });
            pastOwnCompetitions.sort((a, b) => {
              return (
                new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
              );
            });
          }
        } else {
          console.log("Error fetching own competitions");
          console.log(data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="min-h-screen p-8">
      <JoinClubTip />
      <UpcomingCompetitions competitions={futureCompetitions} />
      <CurrentCompetitions competitions={currentOwnCompetitions} />
      <LatestCompetitions competitions={pastOwnCompetitions} />
    </main>
  );
}
