import { CompetitionResponse } from "@/types/commonTypes";
import Link from "next/link";
import React from "react";
import { competitionListProps } from "../page";

export default function LatestResults(props: competitionListProps) {
  const pastCompetitions = props.competitions;
  // TODO näytetään omat viimeisimmät tulokset
  // Pitäskö kopioida tuloksista sama tyyli?
  return (
    <div className="w-full rounded-md shadow-md border mb-8">
      <div className="flex items-baseline p-4 mx-4">
        <h1 className="text-2xl">Viimeisimmät tuloksesi</h1>
        <Link
          href="/tulokset"
          className="ml-8 text-slate-700 text-sm underline cursor-pointer"
        >
          Näytä kaikki tulokset
        </Link>
      </div>
      <div>
        {pastCompetitions !== undefined &&
          pastCompetitions.slice(0, 3).map((comp, index) => (
            <div key={index} className="mx-4 border-b-2 last:border-b-0">
              <p className="p-2">{comp.displayName}</p>
              <p className="pb-2 px-2 text-sm text-slate-700">
                {comp.startDate}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
