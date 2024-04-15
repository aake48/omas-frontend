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
  const userHasCompetitions =
    props.competitions !== undefined && props.competitions.length > 0;

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
          {userHasCompetitions ? (
            props.competitions.map((comp, index) => (
              <div
                key={index}
                className="flex mx-4 border-b-2 last:border-b-0 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push("/kilpailut/" + comp.competitionId)}
              >
                <div>
                  <p className="p-2">
                    {comp.displayName} - {competitionTypes[comp.type]}
                  </p>
                  <p className="pb-2 px-2 text-sm text-slate-700">
                    {comp.startDate} - {comp.endDate}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mx-4 my-2 hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/ilmoitus");
                  }}
                >
                  Ilmoita tuloksesi
                </Button>
              </div>
            ))
          ) : (
            <div className="mx-4">
              <p className="p-2">
                Et ole ilmottautunut yhteenkään käynnissä olevaan kilpailuun.
                Voit etsiä kilpailuja yläpalkin Kilpailut-välilehdeltä.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );
}
