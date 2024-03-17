"use client";

import { getCompetitionByNameUrl } from "@/types/APIConstants";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CompetitionPage() {
  const router = useRouter();

  const competitionId = router.query.competitionId;
  console.log(competitionId);

  // useEffect(() => {
  //   async function fetchData() {
  //     const competitions = await axios.get(
  //       getCompetitionByNameUrl(competitionId),
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setCompetitions(competitions.data.content);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24"></div>
  );
}
