"use client";

import Input from "@/components/ui/Input";
import { getCompetitionsQueryUrl } from "../../lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Paginator from "../components/Paginator";
import fetchData from "@/api/get";


export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);


  const getCompetitions = useCallback(async () => {
    const competitions = await fetchData(getCompetitionsQueryUrl(search, page));
    setCompetitions(competitions.content);
    setTotalPage(competitions.totalPages);
  }, [search, page]);

  useEffect(() => {
    getCompetitions();
  }, [page]);

  useEffect(() => {
    setPage(0);
    getCompetitions();
  }, [search]);

  const handlePageNumberChange = (page: number) => {
    if (page < 0 || page > totalPages - 1) return;
    setPage(page);
  };

  return (
    <div className="flex flex-col py-5">
      <Input
        id={"search"}
        placeholder={"Hae"}
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />
      {competitions &&
        competitions.map((competition, index) => (
          <Link
            key={index}
            className={`flex rounded-md cursor-pointer sm:flex-row flex-col items-baseline border my-1 p-2 sm:pl-10 hover:bg-slate-100 ${(Date.now() > new Date(competition.startDate).getTime() && Date.now() < new Date(competition.endDate).getTime()) ? "bg-slate-200" : ""}`}
            href={"/kilpailut/" + competition.competitionId}
          >
            <p>{competition.displayName}</p>
            <p className="sm:ml-auto sm:mr-5 text-slate-700">
              {formatDate(competition.startDate) +
                " - " +
                formatDate(competition.endDate)}
            </p>
          </Link>
        ))}
      <Paginator
        pageNumber={page}
        totalPages={totalPages}
        handlePageNumberChange={handlePageNumberChange}
      />
    </div>
  );
}
