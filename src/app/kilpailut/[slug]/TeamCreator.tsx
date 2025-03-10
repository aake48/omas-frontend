"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { CompetitionResponse } from "@/types/commonTypes";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import useUserInfo from "@/lib/hooks/get-user.info";


export default function TeamCreator({
  competition,
}: {
    competition: CompetitionResponse;
}) {
  const [newTeamName, setNewTeamName] = useState("");
  const [teamDisplayShort, setTeamDisplayShort] = useState("");
  const [info, setInfo] = useState("");
  const [isMember, setIsMember] = useState("");
  const pathName = usePathname();
  const isLoggedIn = useIsLoggedIn();
  const user = useUserInfo();
  const [isPartOfClub, setIsPartOfClub] = useState(false);


  useEffect(() => {
      if (user.userInfo != null) {
          setIsPartOfClub(user.userInfo.club != null);
      }
  }, [user]);

  async function handleSubmit(teamName: string, teamDisplayShort: string) {
    const response = await fetch(`${pathName}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        teamName: teamName,
        competitionName: competition.competitionId,
        teamDisplayShort: teamDisplayShort,
      }),
    });
    const data = await response.json();
    setInfo(data.message);
  }

  {
    return (isLoggedIn && isPartOfClub) ? (
      <>
        <Input
          id={"search"}
          placeholder={"Joukkueen nimi"}
          required={false}
          type={"text"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTeamName(e.target.value)
          }
          value={newTeamName}
          disabled={isMember !== ""}
        ></Input>
         <Input
          id={"search"}
          placeholder={"Joukkueen lyhenne"}
          required={false}
          type={"text"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTeamDisplayShort(e.target.value)
          }
          value={teamDisplayShort}
          disabled={isMember !== ""}
        ></Input>
        <Button
          variant="outline"
          className="hover:bg-slate-100 mx-2"
          onClick={() => handleSubmit(newTeamName, teamDisplayShort) }
          disabled={isMember !== ""}
        >
          Luo joukkue
        </Button>
        <p className="whitespace-pre">{info ? info : null}</p>
      </>
    ) : null;
  }
}
