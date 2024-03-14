"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  addTeamMemberURL,
  addTeamToCompetitionURL,
  getCompetitionsQueryUrl,
} from "@/types/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [info, setInfo] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const competitions = await axios.get(getCompetitionsQueryUrl(search, 0), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setCompetitions(competitions.data.content);
    }
    fetchData();
  }, [search]);

  const createTeam = async (competitionName: string) => {
    const response = await axios.post(
      addTeamToCompetitionURL,
      { competitionName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setInfo("Loit tiimin kilpailuun " + competitionName);
    } else {
      console.log(response);
    }
  };

  const joinTeam = async (competitionName: string) => {
    const response = await axios.post(
      addTeamMemberURL,
      { competitionName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setInfo("Liityit tiimiin kilpailussa " + competitionName);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <Input
        id={"search"}
        placeholder={"Hae"}
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />
      {competitions &&
        competitions.map((competition, index) => (
          <div key={index} className="flex flex-row items-baseline border my-1">
            <p>{competition.displayName}</p>
            <Button
              variant="outline"
              className="hover:bg-slate-100 mx-2"
              onClick={() => createTeam(competition.displayName)}
            >
              Luo tiimi
            </Button>
            <Button
              variant="outline"
              className="hover:bg-slate-100 mx-2"
              onClick={() => joinTeam(competition.displayName)}
            >
              Liity tiimiin
            </Button>
          </div>
        ))}
      <p hidden={!info}>{info}</p>
    </div>
  );
}
