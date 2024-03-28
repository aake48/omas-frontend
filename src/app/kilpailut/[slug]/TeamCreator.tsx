"use client"

import React, { ChangeEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import { Button } from '@/components/ui/Button';
import { createTeam } from './api/create-team';

export default function TeamCreator({competition}: {competition: any}) {
    const [newTeamName, setNewTeamName] = useState("");
    const [info, setInfo] = useState("");
    const [isMember, setIsMember] = useState("");
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
          onClick={() => createTeam(newTeamName, competition.competitionId)}
          disabled={isMember !== ""}
      >
              Luo joukkue
          </Button><p className="whitespace-pre">{info ? info : null}</p></>
        
  )
}
