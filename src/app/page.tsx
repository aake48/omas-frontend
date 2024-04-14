"use server";

import React, { useState } from "react";
import { CompetitionResponse, QueryCompetition } from "@/types/commonTypes";
import {
  getCompetitionsQueryUrl,
  getUpcomingCompetitions,
  getUserCompetitions,
} from "@/lib/APIConstants";
import fetchData from "@/lib/get";
import LatestResults from "./components/LatestResults";
import UpcomingCompetitions from "./components/UpcomingCompetitions";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import CurrentCompetitions from "./components/CurrentCompetitions";

export type competitionListProps = {
  competitions: CompetitionResponse[];
};

// TODO ohjeistus esim liity seuraan, jos ei ole vielä

export default async function Home() {
  let futureCompetitions: CompetitionResponse[] = [];
  let pastOwnCompetitions: CompetitionResponse[] = [];
  let currentOwnCompetitions: CompetitionResponse[] = [];

  // const isLoggedIn = useIsLoggedIn();
  const currentDate = new Date();

  const headers = typeof window
    ? {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    : {};

  try {
    const futureCompetitionsUrl = getUpcomingCompetitions(0, 10);

    const futureCompetitionsData: QueryCompetition = await fetchData(
      futureCompetitionsUrl,
      headers
    );

    if (futureCompetitionsData.content !== null) {
      const futureCompetitionsAscending =
        futureCompetitionsData.content.reverse();
      futureCompetitions = futureCompetitionsAscending;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const ownCompetitionsUrl = getUserCompetitions();

    const ownCompetitionsData: QueryCompetition = await fetchData(
      ownCompetitionsUrl
    );

    if (ownCompetitionsData.content !== null) {
      ownCompetitionsData.content.forEach((competition) => {
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
      });
    }
  } catch (error) {
    console.log(error);
  }

  // TODO tee refaktorointi client-server ja vapauta kirjautumisen tarkistusjutut kommenteista
  return (
    <main className="min-h-screen p-8">
      <UpcomingCompetitions competitions={futureCompetitions} />
      {/* {isLoggedIn && <CurrentCompetitions competitions={currentOwnCompetitions} />} */}
      <CurrentCompetitions competitions={currentOwnCompetitions} />
      {/* {isLoggedIn && <LatestResults competitions={pastCompetitions} />} */}
      <LatestResults competitions={pastOwnCompetitions} />
    </main>
  );
}
