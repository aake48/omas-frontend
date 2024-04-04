"use client";

import {
    CompetitionResponse,
    TTeam,
    UsersCompetition,
} from "@/types/commonTypes";
import TeamCard from "./TeamCard";
import useUserInfo from "@/lib/hooks/get-user.info";
import { useEffect, useState } from "react";

async function getUserCompetitions(slug: string, token: any) {
    if (token) {
        const response = await fetch(`/kilpailut/${slug}/api/competition`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        return response;
    }
    return null;
}

export default function CardContainer({
    teams,
    competition,
    slug,
}: {
    teams: { content: [TTeam] };
    competition: CompetitionResponse;
    slug: string;
}) {
    const [competitions, setCompetitions] = useState<UsersCompetition[]>();
    const { token } = useUserInfo();
    const [memberOf, setIsMemberOf] = useState<string | null>(null);

    // Fetch user's competitions
    useEffect(() => {
        getUserCompetitions(slug, token).then((response) => {
            if (response && response.ok) {
                response.json().then((data) => {
                    setCompetitions(data);
                });
            }
        });
    }, [token, slug]);

    // Check if user is member of any team
    useEffect(() => {
        if (competitions) {
            const memberOf = competitions.find(
                (comp) => comp.competitionId === competition.competitionId
            );
            memberOf ? setIsMemberOf(memberOf.teamName) : setIsMemberOf(null);
        }
    }, [competitions, competition]);

    return (
        <div className="grid my-5 justify-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {teams.content.map((team: TTeam) => (
                <TeamCard key={team.teamName} team={team} memberOf={memberOf} />
            ))}
        </div>
    );
}
