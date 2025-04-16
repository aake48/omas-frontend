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
import { ChevronUp, ChevronDown } from "lucide-react";


export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [seriesFilter, setSeriesFilter] = useState("")
  const[sortType, setSortType] = useState<"" | "display_name" | "start_date" | "end_date">("");
  const[sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getCompetitions = useCallback(async () => {
    const competitions = await fetchData(getCompetitionsQueryUrl(search, page, seriesFilter.replace(/-/g, "_"), sortType, sortOrder));
    setCompetitions(competitions.content);
    setTotalPage(competitions.totalPages);
  }, [search, page, seriesFilter, sortType, sortOrder]);

  useEffect(() => {
    getCompetitions();
  }, [page, sortType, sortOrder]);

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

  const handleSortTypeChange = (type: "display_name" | "start_date" | "end_date") => {
    if(sortType === type){
      if(sortOrder === "desc"){
        setSortType("");
        setSortOrder("asc");
      }
      else{
        setSortOrder("desc");
      }
    }
    else{
      setSortType(type);
      setSortOrder("asc");
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
        width={"w-80"}
      />
      <div className="mt-1 mb-1 text-lg">Järjestä nousevasti tai laskevasti</div>
      <div className="flex flex-col sm:flex-row gap-2 rounded-md my-1">
        <button
          onClick={() => handleSortTypeChange("display_name")}
          className={`flex justify-between items-center px-5 py-2 border-2 rounded-md transition-all ${
        	sortType === "display_name" ? "border-slate-400 bg-slate-100" : ""} hover:bg-slate-100`}
        >
          Nimi
          {sortType === "display_name" && (
            <span className="ml-8">{sortOrder === "asc" ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</span>
          )}
        </button>
        <button
          onClick={() => handleSortTypeChange("start_date")}
          className={`flex justify-between items-center px-5 py-2 border-2 rounded-md transition-all ${
            sortType === "start_date" ? "border-slate-400 bg-slate-100" : ""} hover:bg-slate-100`}
        >
          Alkamispäivämäärä
          {sortType === "start_date" && (
            <span className="ml-8">{sortOrder === "asc" ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</span>
          )}
        </button>
        <button
          onClick={() => handleSortTypeChange("end_date")}
          className={`flex justify-between items-center px-5 py-2 border-2 rounded-md transition-all ${
            sortType === "end_date" ? "border-slate-400 bg-slate-100" : ""} hover:bg-slate-100`}
        >
          Loppumispäivämäärä
          {sortType === "end_date" && (
            <span className="ml-8">{sortOrder === "asc" ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</span>
          )}
        </button>
      </div>
      {competitions &&
        competitions.map((competition, index) => (
          <Link
            key={index}
            className={`flex rounded-md cursor-pointer sm:flex-row transition-all flex-col items-baseline border my-1 p-2 sm:pl-10 hover:bg-slate-100 
              ${(Date.now() > new Date(competition.startDate).getTime() && Date.now() < new Date(competition.endDate).getTime()) ? "bg-slate-200" : ""}`}
            href={"/kilpailut/" + competition.competitionId}
          >
            <p>
              {competition.displayName}
            </p>
            <p className="sm:ml-auto sm:mr-5 text-slate-700">
              <span 
                className="text-sm text-black mr-10 text-base">{competition.competitionSeries.join(", ")}
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
