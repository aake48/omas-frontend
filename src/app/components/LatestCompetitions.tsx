"use client";

import Link from "next/link";
import React from "react";
import { competitionListProps } from "../page";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";

export default function LatestCompetitions(props: competitionListProps) {
  const pastCompetitions = props.competitions;
  const isLoggedIn = useIsLoggedIn();
  return (
    isLoggedIn && (
      <div className="w-full rounded-md shadow-md border mb-8">
        <div className="flex items-baseline p-4 mx-4">
          <h1 className="text-2xl">Viimeisimmät kilpailusi</h1>
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
                  {comp.startDate} - {comp.endDate}
                </p>
              </div>
            ))}
        </div>
      </div>
    )
  );
}
