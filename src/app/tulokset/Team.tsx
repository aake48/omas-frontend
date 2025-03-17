import React from "react";
import Member from "./Member";
import { competitionResultsUser } from "@/types/commonTypes";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";

interface TeamProps {
    teamDisplayName: string;
    position: number;
    scores: competitionResultsUser[] | null;
}

const Team = ({ teamDisplayName, position, scores }: TeamProps) => {
    const isLoggedIn = useIsLoggedIn();

    if (scores !== null) {
        const totalScores = scores.reduce(
            (acc, member) => acc + member.sum,
            0
        ).toFixed(1);

        return (
            <div data-testid={`team-${position}`}>
                <div className="flex gap-5">
                    <h1 className="font-medium">{`${position + 1}. ${teamDisplayName}`}</h1>
                    <p className="font-bold">{totalScores}p</p>
                </div>
                {isLoggedIn && (
                    <div>
                        {scores.map((member) => (
                            <Member key={member.userId} name={member.name} score={member.sum} />
                        ))}
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="font-medium">{`${position + 1}. ${teamDisplayName}`}</h1>
                <div>
                    <p>Virhe joukkueen jäsenten haussa</p>
                </div>
            </div>
        );
    }
};

export default Team;
