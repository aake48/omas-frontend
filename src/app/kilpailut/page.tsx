"use client"

import React, { useEffect, useState } from "react";
import Competitions from "./Competitions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CompetitionResponse } from "@/types/commonTypes";


export default function LisääKilpailu() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);

  useEffect(() => {
    fetch("https://localhost:8080/api/competition/result/kesan_ampujaiset", { cache: 'default' })
      .then((res) => res.json())
      .then((json) => {
        setCompetitions([...competitions, json])
      })
  }, [competitions]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-8 sm:p-24">
      <div className="container shadow-lg p-4 sm:p-10 mx-auto">

        <Button variant={"outline"} className="ml-10">
          <Link href="/kilpailut/lisaaKilpailu">Lisää kilpailu</Link>
        </Button>{" "}
        <h1 className="text-3xl text-center">Tulevat kilpailut</h1>
        <Competitions />
      </div>
    </main>
  );
}