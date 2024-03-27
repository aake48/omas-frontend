"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  addTeamMemberURL,
  addTeamToCompetitionURL,
  getCompetitionByIdUrl,
  getCompetitionInfoQueryURL,
} from "@/lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

type TTeamMember = {
  userId: number;
  competitionId: string;
  teamName: string;
  legalname: string;
};

type TTeam = {
  clubName: string;
  competitionId: string;
  teamName: string;
  teamDisplayName: string;
  teamMembers?: TTeamMember[];
};

export default function CompetitionPage(params: any) {
  const [competition, setCompetition] = useState<CompetitionResponse | null>(
    null
  );
  const [info, setInfo] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [isMember, setIsMember] = useState("");

  const competitionId: string = params.params.slug;
  const [teams, setTeams] = useState<TTeam[]>([]);

  const fetchCompetitionData = async (competitionId: string) => {
    axios
      .get(getCompetitionByIdUrl(competitionId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCompetition(res.data);
      });
  };

  const fetchTeams = async (competitionId: string) => {
    axios
      // size=100 is a temporary solution to get all teams, to be able to find out if use is a member of any team
      .get(getCompetitionInfoQueryURL(competitionId, 0, 100), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTeams(res.data.content);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchCompetitionData(competitionId);
      fetchTeams(competitionId);
    }
  }, [competitionId]);

  useEffect(() => {
    const checkIfMember = async (userId: number) => {
      teams.map((team) => {
        team.teamMembers?.map((member) => {
          if (member.userId === userId) {
            setIsMember(team.teamName);
          }
        });
      });
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
    const userId: number = userInfo.userId ?? -1;
    checkIfMember(userId);
  }, [teams]);

  const createTeam = async (teamName: string) => {
    const trimmedTeamName = teamName.trim();
    if (trimmedTeamName === "") return;

    const response = await axios.post(
      addTeamToCompetitionURL,
      { teamName: trimmedTeamName, competitionName: competitionId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setInfo(`Loit joukkueen ${trimmedTeamName} kilpailuun ${competitionId}`);
      setNewTeamName("");
      fetchTeams(competitionId);
    } else {
      console.log(response);
    }
  };

  const joinTeam = async (teamName: string) => {
    const trimmedTeamName = teamName.trim();
    const response = await axios.post(
      addTeamMemberURL,
      { teamName: trimmedTeamName, competitionName: competitionId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setIsMember(trimmedTeamName);
      setInfo(
        `Liityit joukkueeseen ${trimmedTeamName}\nkilpailussa ${competitionId}.`
      );
      fetchTeams(competitionId);
    } else {
      console.log(response);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
      {competition === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col p-10 gap-3 shadow-lg min-w-96">
          <p className="text-3xl">{competition.displayName}</p>
          <p>
            Tyyppi:{" "}
            {competition.type === "rifle" ? "ilmakivääri" : "ilmapistooli"}
          </p>
          <span className="flex flex-row gap-5">
            <p>Alkaa: {competition.startDate}</p>
            <p>Päättyy: {competition.endDate}</p>
          </span>
          <div>
            {teams.map((team, index) => (
              <div
                key={index}
                className={`flex flex-col cursor-pointer border-2 px-2 pb-2 my-1 rounded-md ${
                  isMember === team.teamName ? "bg-slate-200" : null
                }`}
              >
                <div className="flex flex-row items-baseline my-2">
                  <p>{team.teamDisplayName}</p>
                  <p className="ml-auto mr-5"></p>
                  <Button
                    variant="outline"
                    className="hover:bg-slate-100 mx-2 ml-auto"
                    onClick={() => joinTeam(team.teamName)}
                    disabled={isMember !== ""}
                  >
                    {isMember !== team.teamName
                      ? "Liity joukkueeseen"
                      : "Olet joukkueessa"}
                  </Button>
                </div>
                {team.teamMembers && team.teamMembers.length > 0 ? (
                  <div>
                    {team.teamMembers.map((member, index) => {
                      return <p key={index}>{member.legalname}</p>;
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Input
            id={"newTeamName"}
            placeholder={"Joukkueen nimi"}
            required={false}
            type={"text"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTeamName(e.target.value)
            }
            value={newTeamName}
            disabled={isMember !== ""}
          ></Input>
          <Button
            variant="outline"
            className="hover:bg-slate-100 mx-2"
            onClick={() => createTeam(newTeamName)}
            disabled={isMember !== ""}
          >
            Luo joukkue
          </Button>
          <p className="whitespace-pre">{info ? info : null}</p>
        </div>
      )}
    </div>
  );
}
