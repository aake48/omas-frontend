"use client";

import Link from "next/link";
import React from "react";
import { competitionListProps } from "../page";
import { competitionTypes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";

export default function CurrentCompetitions(props: competitionListProps) {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  return (
    isLoggedIn && (
      <div className="w-full rounded-md shadow-md border mb-8 py-2">
        <div className="flex items-baseline p-4 mx-4">
          <h2 className="text-2xl">Käynnissä olevat kilpailusi</h2>
          <Link
            href="/kilpailut"
            className="ml-8 text-slate-700 text-sm underline cursor-pointer"
          >
            Näytä kaikki kilpailut
          </Link>
        </div>
        <div>
          {props.competitions !== undefined &&
            props.competitions.map((comp, index) => (
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
                <Button
                  variant="outline"
                  className="hover:bg-slate-100"
                  onClick={() => router.push("/ilmoitus")}
                >
                  Ilmoita tuloksesi
                </Button>
              </div>
            ))}
        </div>
      </div>
    )
  );
}
