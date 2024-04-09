"use client"

import { ScoreType, UsersCompetition } from "@/types/commonTypes";
import React, { useEffect, useState } from "react";
import ScoreTypeSelectorContainer from "./ScoreTypeSelectorContainer";
import ScoreCard from "./ScoreForm";
import useLoggedIn from "@/lib/hooks/is-logged-in";

async function getUserCompetitions() {
    const response = await fetch("ilmoitus/api", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    })
    return response;
}


export default function NotificationClientWrapper() {
    const [scoreType, setScoreType] = useState<ScoreType | null>(null);
    const handleScoreTypeChange = (scoreType: ScoreType | null) => {
        setScoreType(scoreType as ScoreType);
    };
    const [competitions, setCompetitions] = useState<UsersCompetition[] | null>(null);
    const isLoggedin = useLoggedIn();

    useEffect(() => {
        getUserCompetitions().then((response) => {
                response.json().then((data) => {
                    if (data.status === 200) {
                        setCompetitions(data);
                    }
                });
        });
    }, []);

    if (!isLoggedin) {
        return (
            <h2>Kirjaudu sisään syöttääksesi tuloksia</h2>
        )
    }

    return (
        <>
            {competitions != null ? (
                <>
                    <ScoreTypeSelectorContainer
                        onScoreTypeChange={handleScoreTypeChange}
                    />
                    {scoreType && <ScoreCard scoreType={scoreType} competitions={competitions} />}
                </>
            ) : (
                <h2>Liity tiimiin syöttääksesi tuloksia.</h2>
            )}
        </>
    );
}
