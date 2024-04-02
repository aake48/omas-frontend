"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect, useState } from "react";
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

export default function TeamCard({ team }: { competition: any; team: TTeam }) {
    const isLoggedIn = useIsLoggedIn();
    const [isMember, setIsMember] = useState(false); // Initialize state

    function handleClick(teamName: string, competitionId: string) {
        joinTeam(teamName, competitionId);
    }

    useEffect(() => {
        if (isLoggedIn) {
            const checkIfMember = async (userId: number) => {
                const isMember =
                    team.teamMembers?.some(
                        (member) => member.userId === userId
                    ) ?? false;
                setIsMember(isMember); // Update state based on check
            };

            const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
            const userId: number = userInfo.userId ?? -1;
            checkIfMember(userId);
        }
    }, [isLoggedIn, team]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div
                className={`flex flex-col border-2 shadow-md p-5 gap-5 rounded-md ${
                    isMember ? "bg-slate-200" : null
                }`}
            >
                <div className="flex flex-col md:flex-row items-center">
                    <p className="text-xl">{team.teamDisplayName}</p>
                    {isLoggedIn && (
                        <Button
                            variant="outline"
                            className="hover:bg-slate-100"
                            onClick={() =>
                                handleClick(team.teamName, team.competitionId)
                            }
                            disabled={isMember}
                        >
                            {isMember === false
                                ? "Liity joukkueeseen"
                                : "Olet joukkueessa"}
                        </Button>
                    )}
                </div>

                <div className="grid gap-1">
                    <p className=" text-lg">Jäsenet:</p>
                    {team.teamMembers && team.teamMembers.length > 0 ? (
                        <div className="grid border h-full border-slate-300 bg-slate-100 p-2 shadow-md rounded-md grid-cols-2">
                            {team.teamMembers.map((member, index) => {
                                return <p key={index}>{member.legalname}</p>;
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </Suspense>
    );
}
