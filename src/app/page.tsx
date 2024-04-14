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

export type competitionListProps = {
  competitions: CompetitionResponse[];
};

export default async function Home() {
  let futureCompetitions: CompetitionResponse[] = [];
  let pastCompetitions: CompetitionResponse[] = [];

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
  // const currentDate = new Date();

  // const headers = typeof window
  //   ?? {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     }

  // const futureCompetitionsUrl = getUpcomingCompetitions(1, 10);
  // const ownCompetitionsUrl = getUserCompetitions();

  // const futureCompetitionsData: QueryCompetition = await fetchData(
  //   futureCompetitionsUrl,
  //   undefined,
  //   headers
  // );
  // const ownCompetitionsData: QueryCompetition = await fetchData(
  //   ownCompetitionsUrl
  // );

  // const futureCompetitions: CompetitionResponse[] = [];
  // const currentOwnCompetitions: CompetitionResponse[] = [];
  // const pastOwnCompetitions: CompetitionResponse[] = [];

  // ownCompetitionsData.content.forEach((competition) => {
  //   const competitionStartDate = new Date(competition.startDate);
  //   const competitionEndDate = new Date(competition.endDate);

  //   if (competitionStartDate > currentDate) {
  //     pastCompetitions.push(competition);
  //   } else {
  //     futureCompetitions.push(competition);
  //   }
  // });

  // TODO laita kirjautuminen ehdoksi sille mihin tarvii
  return (
    <main className="min-h-screen p-8">
      <UpcomingCompetitions competitions={futureCompetitions} />
      {/* <LatestResults competitions={pastCompetitions} /> */}
    </main>
  );
}
