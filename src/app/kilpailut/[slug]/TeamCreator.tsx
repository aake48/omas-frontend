"use client"

import React, { ChangeEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export default function TeamCreator({competition}: {competition: any}) {
    const [newTeamName, setNewTeamName] = useState("");
    const [info, setInfo] = useState("");
    const [isMember, setIsMember] = useState("");
    const pathName = usePathname();

    async function handleSubmit(teamName: string, competitionId: string) {
      const response = await fetch(`${pathName}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          teamName: teamName,
          competitionName: competitionId,
        }),
      });
      console.log(response);
    }
  return (
    <><Input
          id={"newTeamName"}
          placeholder={"Joukkueen nimi"}
          required={false}
          type={"text"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTeamName(e.target.value)}
          value={newTeamName}
          disabled={isMember !== ""}
      ></Input><Button
          variant="outline"
          className="hover:bg-slate-100 mx-2"
          onClick={() =>
            handleSubmit(newTeamName, competition.id)
          }

          disabled={isMember !== ""}
      >
              Luo joukkue
          </Button><p className="whitespace-pre">{info ? info : null}</p></>
        
  )
}
