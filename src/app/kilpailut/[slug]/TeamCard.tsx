"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect, useState } from "react";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import { TTeam, TTeamMember } from "@/types/commonTypes";
import { addTeamMemberURL, removeTeamMemberURL } from "@/lib/APIConstants";
import Notification from "@/components/component/Notification";
import ConfirmDialog from "@/components/component/ConfirmDialog";

export async function joinTeam(
    token: string,
    teamName: string,
    competitionName: string
) {
    const trimmedTeamName = teamName.trim();

    if (!token) {
        return { message: "Virheellinen käyttäjä", status: 400 };
    }

    try {
        const response = await fetch(addTeamMemberURL, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ teamName: trimmedTeamName, competitionName }),
        });

        if (!response.ok) {
            return { message: "Virhe joukkueeseen liittymisessä", status: response.status };
        }

        return { body: "Joukkueeseen liittyminen onnistui", status: response.status };
    } catch (error) {
        console.error(error);
        return { message: "Virhe joukkueeseen liittymisessä", status: 500 };
    }
}

export async function leaveTeam(
    token: string,
    teamName: string,
    competitionName: string
) {
    const trimmedTeamName = teamName.trim();

    if (!token) {
        return { message: "Virheellinen käyttäjä", status: 400 };
    }

    try {
        const response = await fetch(removeTeamMemberURL, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ teamName: trimmedTeamName, competitionName }),
        });

        if (!response.ok) {
            return { message: "Virhe joukkueesta poistumisessa", status: response.status };
        }

        return { body: "Joukkueesta poistuminen onnistui", status: response.status };
    } catch (error) {
        console.error(error);
        return { message: "Virhe joukkueesta poistumisessa", status: 500 };
    }
}

export default function TeamCard({
    team,
    memberOf,
    setIsMember,
    userClubName,
    token,
    userLegalName,
    userId
}: Readonly<{
    team: TTeam;
    memberOf: string | null;
    setIsMember: (teamName: string | null) => void;
    userClubName: string | null;
    token: string;
    userLegalName: string;
    userId: number;
}>) {
    const isLoggedIn = useIsLoggedIn();
    const [teamMembers, setTeamMembers] = useState(team.teamMembers);
    const [isFull, setIsFull] = useState<boolean>(false);
    const [isInTeam, setIsInTeam] = useState<boolean>(memberOf === team.teamName);
    const isPartOfClub = userClubName === team.clubName;
    const [message, setMessage] = useState<{ message: string,  type: "success" | "error", id: number} | null>(null);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);

    useEffect(() => {
        setIsFull((teamMembers?.length ?? 0) >= 5);
    }, [teamMembers]);

    useEffect(() => {
        const isUserInThisTeam = memberOf === team.teamName;
        setIsInTeam(isUserInThisTeam);

        /* if (!isUserInThisTeam) {
            setTeamMembers((prev) =>
                prev?.filter((member) => member.userId !== userId) || []
            );
        } else {
            setIsMember(memberOf);
        } */
    }, [memberOf, team.teamName, userId]);

    async function handleClick(teamName: string, competitionId: string, leave: boolean) {
        const currentUser: TTeamMember = {
            userId,
            competitionId,
            teamName,
            legalName: userLegalName,
        };

        if (!leave) {
            const response = await joinTeam(token, teamName, competitionId);
            if (response.status === 200) {
                setIsMember(teamName);
                setTeamMembers((prev) => [...(prev || []), currentUser]);
                setMessage({
                    message: "Ilmoittautuminen onnistui",
                    type: "success",
                    id: Date.now()
                    })
            }
            else{
                setMessage({
                    message: "Ilmoittautuminen epäonnistui",
                    type: "success",
                    id: Date.now()
                    })
            }
        } else {
            const response = await leaveTeam(token, teamName, competitionId);
            if (response.status === 200) {
                setIsMember("");
                setTeamMembers((prev) =>
                    prev?.filter((member) => member.userId !== userId) || []
                );
            }
        }
    }

    let buttonDisabled = memberOf !== "" || isFull || !isPartOfClub;
    buttonDisabled = isInTeam ? false : buttonDisabled;

    let buttonText = "Ilmoittaudu";
    if (isInTeam) {
        buttonText = "Poistu joukkueesta";
    } else if (!isPartOfClub) {
        buttonText = "Et ole tässä seurassa";
    } else if (isFull) {
        buttonText = "Joukkue on täynnä";
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {message && (
                <Notification
                key={message.id}
                message={message.message}
                type={message.type}
                />
            )}
            <ConfirmDialog
                open={showConfirmMessage}
                message="Haluatko varmasti poistua joukkueesta?"
                onConfirm={async () => {
                    await handleClick(team.teamName, team.competitionId, true);
                    setShowConfirmMessage(false);
                }}
                onCancel={() => setShowConfirmMessage(false)}
                confirmText="Kyllä"
                cancelText="Ei"
            />
            <div
                className={`flex flex-col border-2 shadow-md p-5 gap-2 rounded-md ${
                    isInTeam ? "bg-slate-200" : ""
                }`}
            >
                <div className="flex flex-col justify-between md:flex-row items-center">
            <div className="flex flex-col">
              <p className="text-lg truncate"><strong>{team.clubName}</strong></p>
                      <p className="text-md truncate mt-2">{team.teamDisplayName}</p>
                      <p className="text-md truncate mt-2">{team.teamDisplayShort}</p>
                      <p className="text-md truncate mt-2">{team.teamSeries}</p>
                  </div>
                    {isLoggedIn && (
                        <Button
                            variant="outline"
                            className="hover:bg-slate-100 border-slate-500 border-2 bg-white"
                            onClick={() => {
                                if(isInTeam){
                                    setShowConfirmMessage(true);
                                }
                                else{
                                    handleClick(team.teamName, team.competitionId, isInTeam)
                                }
                            }}
                            disabled={buttonDisabled}
                        >
                            {buttonText}
                        </Button>
                    )}
                </div>

                {isLoggedIn && teamMembers && teamMembers.length > 0 && (
                    <div className="grid gap-1">
                        <p className="text-md">Jäsenet:</p>
                        <div className="grid border h-full border-slate-300 gap-x-4 bg-slate-100 p-2 shadow-md rounded-md grid-cols-2">
                            {teamMembers.map((member) => (
                                <p key={member.userId}>{member.legalName}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Suspense>
    );
}
