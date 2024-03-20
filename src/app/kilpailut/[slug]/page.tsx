"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  addTeamMemberURL,
  addTeamToCompetitionURL,
  baseURL,
  getCompetitionByIdUrl,
  getTeamMembersURL,
  getTeamsByCompetitionIdURL,
} from "@/lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

type TTeamMember = {
  userId: number;
  competitionId: string;
  teamName: string;
};

type TTeam = {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
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
          .get(getTeamsByCompetitionIdURL(competitionId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setTeams(res.data.teams);
          });
      };

      fetchCompetitionData(competitionId);
      fetchTeams(competitionId);
    }
  }, [competitionId]);

  const fetchTeamMemberData = async (teamName: string) => {
    axios
      .get(getTeamMembersURL(teamName, competitionId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const teamIndex = teams.findIndex(
            (team) => team.teamName === teamName
          );
          if (teamIndex !== -1) {
            const tempTeams = [...teams];
            tempTeams[teamIndex].teamMembers = res.data;
            setTeams(tempTeams);
          }
        } else {
          console.log(res);
        }
      });
  };

  const checkIfMember = async (teamName: string) => {
    const data = {
      competitionId: competitionId,
      teamName: teamName,
    };
    await axios
      .get(`${baseURL}/api/competition/team/member/isMember`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "true") {
            setIsMember(teamName);
          }
        }
      });
  };

  // useEffect(() => {
  //   teams.map((team) => checkIfMember(team.teamName));
  // }, [teams]);

  const createTeam = async (teamName: string, competitionName: string) => {
    if (teamName === "") return;

    const response = await axios.post(
      addTeamToCompetitionURL,
      { teamName, competitionName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setInfo(`Loit joukkueen ${teamName} kilpailuun ${competitionName}`);
      setNewTeamName("");
    } else {
      console.log(response);
    }
  };

  const joinTeam = async (teamName: string, competitionName: string) => {
    const response = await axios.post(
      addTeamMemberURL,
      { teamName, competitionName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setIsMember(teamName);
      setInfo(
        `Liityit joukkueeseen ${teamName} kilpailussa ${competitionName}`
      );
    } else {
      console.log(response);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
      {competition === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col p-10 gap-3 shadow-lg">
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
                className="flex flex-col cursor-pointer border-2 px-2 my-1 rounded-md hover:bg-slate-100"
                onClick={() => {
                  fetchTeamMemberData(team.teamName);
                }}
              >
                <div className="flex flex-row items-baseline my-2">
                  <p>{team.teamDisplayName}</p>
                  <p className="ml-auto mr-5"></p>
                  <Button
                    variant="outline"
                    className="hover:bg-slate-100 mx-2 ml-auto"
                    onClick={() =>
                      joinTeam(team.teamName, competition.competitionId)
                    }
                    disabled={isMember !== ""}
                  >
                    Liity joukkueeseen
                  </Button>
                </div>
                {team.teamMembers && team.teamMembers.length > 0 ? (
                  <div>
                    {team.teamMembers.map((member, index) => {
                      console.log("tapahtuu");
                      return <p key={index}>{member.userId}</p>;
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
            onClick={() => createTeam(newTeamName, competition.competitionId)}
            disabled={isMember !== ""}
          >
            Luo joukkue
          </Button>
          <p>{info ? info : null}</p>
        </div>
      )}
    </div>
  );
}
