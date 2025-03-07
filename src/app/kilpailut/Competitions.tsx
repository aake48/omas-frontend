"use client";

import Input from "@/components/ui/Input";
import { getCompetitionsQueryUrl } from "../../lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Paginator from "../components/Paginator";
import fetchData from "@/api/get";
import SeriesDropdown from "@/components/ui/SeriesDropdown"


export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [seriesFilter, setSeriesFilter] = useState("")

  const getCompetitions = useCallback(async () => {
    const competitions = await fetchData(getCompetitionsQueryUrl(search, page, seriesFilter));
    setCompetitions(competitions.content);
    setTotalPage(competitions.totalPages);
  }, [search, page, seriesFilter]);

  useEffect(() => {
    getCompetitions();
  }, [page]);

  useEffect(() => {
    setPage(0);
    getCompetitions();
  }, [search, seriesFilter]);

  const handlePageNumberChange = (page: number) => {
    if (page < 0 || page > totalPages - 1) return;
    setPage(page);
  };

  const handleSeriesFilterChange = (series: string) => {
    if(series !== "Kaikki sarjat"){
      setSeriesFilter(series)
    }
    else{
      setSeriesFilter("")
    }
  }

  return (
    <div className="flex flex-col py-5">
      <Input
        id={"search"}
        placeholder={"Hae"}
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />
      <SeriesDropdown
        id={"seriesDropdown"}
        options={["Kaikki sarjat", "Y-mestaruussarja", "Y-suomisarja", "Y50-mestaruussarja", "Y50-suomisarja"]}
        selected={seriesFilter}
        onChange={(e) => handleSeriesFilterChange(e.target.value)}
        required={false}
      />
      {competitions &&
        competitions.map((competition, index) => (
          <Link
            key={index}
            className={`flex rounded-md cursor-pointer sm:flex-row flex-col items-baseline border my-1 p-2 sm:pl-10 hover:bg-slate-100 
              ${(Date.now() > new Date(competition.startDate).getTime() && Date.now() < new Date(competition.endDate).getTime()) ? "bg-slate-200" : ""}`}
            href={"/kilpailut/" + competition.competitionId}
          >
            <p>
              {competition.displayName}
            </p>
            <p className="sm:ml-auto sm:mr-5 text-slate-700">
              <span 
                className="text-sm text-black mr-10 text-base">{competition.competitionSeries}
              </span>
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
