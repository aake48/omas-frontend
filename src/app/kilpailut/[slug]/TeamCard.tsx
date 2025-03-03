"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect, useState } from "react";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import {TTeam,TTeamMember} from "@/types/commonTypes";
import useUserInfo from "@/lib/hooks/get-user.info";
import { addTeamMemberURL } from "@/lib/APIConstants";

export async function joinTeam(
    token: string,
    teamName: string,
    competitionName: string
  ) {
    const trimmedTeamName = teamName.trim();
  
    if (token == null) {
      return { message: "Virheellinen käyttäjä", status: 400 };
    }
    try {
      const response = await fetch(addTeamMemberURL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName: trimmedTeamName, competitionName: competitionName })
      });
  
      if (!response.ok) {
        return { message: "Virhe joukkueeseen liittymisessä", status: response.status };
      }
  
      return { body: "Joukkueesen liittyminen onnistui", status: response.status };
    } catch (error: any) {
      console.error(error);
      return { message: "Virhe joukkueeseen liittymisessä: ", status: 500 };
    }
  }

export default function TeamCard({ team, memberOf, setIsMember, userClubName, token, userLegalName}: 
    { team: TTeam , memberOf: string | null, setIsMember: (teamName: string | null) => void, userClubName: string | null, token: string, userLegalName: string} ) {
    const isLoggedIn = useIsLoggedIn();
    const [teamMembers, setTeamMembers] = useState(team.teamMembers)
    const [isFull , setIsFull] = useState<boolean>(false);
    const isPartOfClub = userClubName === team.clubName;
    const [isInTeam, setIsInTeam] = useState<boolean>(memberOf === team.teamName)

    useEffect(() => {
        if (team.teamMembers && team.teamMembers.length === 5) {
            setIsFull(true);
        }
    }, [team]);

    useEffect(() => {
        if (isInTeam) {
            setIsMember(memberOf);
        }
        memberOf === team.teamName ? setIsInTeam(true) : setIsInTeam(false);
    }, [memberOf, teamMembers, setIsMember]);

    async function handleClick(teamName: string, competitionId: string) {
        const response = await joinTeam(token, teamName, competitionId);
        if (response.status === 200){
            setIsMember(teamName);
            const currentUser: TTeamMember = {userId: 0, competitionId: competitionId, teamName: teamName, legalName: userLegalName}
            teamMembers?.push(currentUser);
            setTeamMembers(teamMembers);
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div
                className={`flex flex-col border-2 shadow-md p-5 gap-5 rounded-md ${
                    isInTeam ? "bg-slate-200" : null
                }`}
            >
                <div className="flex flex-col gap-2 justify-between md:flex-row items-center">
                    <p className="text-lg truncate">{team.teamDisplayName}</p>
                    {isLoggedIn && (
                        <Button
                            variant="outline"
                            className="hover:bg-slate-100"
                            onClick={() =>
                                handleClick(team.teamName, team.competitionId)
                            }
                            disabled={memberOf !== null || isFull || !isPartOfClub}
                        >
                            {isInTeam
                                ? "Olet joukkueessa" : !isPartOfClub ? "Et ole tässä seurassa": isFull ? "Joukkue on täynnä" : "Liity joukkueeseen"}
                        </Button>
                    )}
                </div>

                <div className="grid gap-1">
                    <p className=" text-md">Jäsenet:</p>
                    {teamMembers && teamMembers.length > 0 ? (
                        <div className="grid border h-full border-slate-300 gap-x-4 bg-slate-100 p-2 shadow-md rounded-md grid-cols-2">
                            {teamMembers.map((member, index) => {
                                return <p key={index}>{member.legalName}</p>;
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </Suspense>
    );
}
