"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect, useState } from "react";
import useIsLoggedIn from "@/lib/is-logged-in";
import { usePathname } from "next/navigation";

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
    const pathName = usePathname();
    const isLoggedIn = useIsLoggedIn();
    const [isMember, setIsMember] = useState(false); // Initialize state

    async function handleClick(teamName: string, competitionId: string) {
        const response = await fetch(`${pathName}/api/join`, {
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
        const data = await response.json();
        data.status === 200 ? setIsMember(true) : null;
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
                <div className="flex flex-col gap-2 justify-between md:flex-row items-center">
                    <p className="text-lg truncate">{team.teamDisplayName}</p>
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
                    <p className=" text-md">Jäsenet:</p>
                    {team.teamMembers && team.teamMembers.length > 0 ? (
                        <div className="grid border h-full border-slate-300 gap-x-4 bg-slate-100 p-2 shadow-md rounded-md grid-cols-2">
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
