"use client";

import { getUpcomingCompetitions } from "@/lib/APIConstants";
import fetchData from "@/lib/get";
import { CompetitionResponse, QueryCompetition } from "@/types/commonTypes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { competitionListProps } from "../page";
import { competitionTypes } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function UpcomingCompetitions(props: competitionListProps) {
  const router = useRouter();
  return (
    <div className="w-full rounded-md shadow-md border mb-8 py-2">
      <div className="flex items-baseline p-4 mx-4">
        <h2 className="text-2xl">Seuraavat kilpailut</h2>
        <Link
          href="/kilpailut"
          className="ml-8 text-slate-700 text-sm underline cursor-pointer"
        >
          Näytä kaikki
        </Link>
      </div>
      <div>
        {props.competitions !== undefined &&
          props.competitions.slice(0, 3).map((comp, index) => (
            <div
              key={index}
              className="mx-4 border-b-2 last:border-b-0 cursor-pointer hover:bg-slate-100"
              onClick={() => router.push("/kilpailut/" + comp.competitionId)}
            >
              <p className="p-2">
                {comp.displayName} - {competitionTypes[comp.type]}
              </p>
              <p className="pb-2 px-2 text-sm text-slate-700">
                {comp.startDate} - {comp.endDate}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
