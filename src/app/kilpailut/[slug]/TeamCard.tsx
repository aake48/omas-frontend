"use client";

import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { joinTeam } from "./api/join-team";
import useIsLoggedIn from "@/lib/is-logged-in";

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

export default function TeamCard({
    competition,
    team,
}: {
    competition: any;
    team: TTeam;
}) {
    const isLoggedIn = useIsLoggedIn();
    const [isMember, setIsMember] = useState(false); // Initialize state

    function handleClick(teamName: string, competitionId: string) {
        joinTeam(teamName, competitionId);
    }

    useEffect(() => {
        if (isLoggedIn) {
            const checkIfMember = async (userId: number) => {
                const isMember = team.teamMembers?.some(member => member.userId === userId) ?? false;
                setIsMember(isMember); // Update state based on check
            };

            const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
            const userId: number = userInfo.userId ?? -1;
            checkIfMember(userId);
        }
    }, [isLoggedIn, team]);
    return (
        <div className="flex flex-col items-center justify-between">
            <div
                className={`flex flex-col cursor-pointer border-2 px-2 pb-2 my-1 rounded-md ${
                    isMember ? "bg-slate-200" : null
                }`}
            >
                <div className="flex flex-row items-baseline my-2">
                    <p>{team.teamDisplayName}</p>
                    <p className="ml-auto mr-5"></p>
                    {isLoggedIn && 
                    <Button
                        variant="outline"
                        className="hover:bg-slate-100 mx-2 ml-auto"
                        onClick={() =>
                            handleClick(team.teamName, team.competitionId)
                        }
                        disabled={isMember}
                    >
                        {isMember === false
                            ? "Liity joukkueeseen"
                            : "Olet joukkueessa"}
                    </Button>
                    
                    }
                </div>
                {team.teamMembers && team.teamMembers.length > 0 ? (
                    <div>
                        {team.teamMembers.map((member, index) => {
                            return <p key={index}>{member.legalname}</p>;
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
