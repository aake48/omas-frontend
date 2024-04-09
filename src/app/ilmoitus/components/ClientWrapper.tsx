"use client"

import { ScoreType, UsersCompetition } from "@/types/commonTypes";
import React, { useEffect, useState } from "react";
import ScoreTypeSelectorContainer from "./ScoreTypeSelectorContainer";
import ScoreCard from "./ScoreForm";
import useLoggedIn from "@/lib/hooks/is-logged-in";

async function getUserCompetitions() {
    const response = fetch("ilmoitus/api", {
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
    const [competitions, setCompetitions] = useState<UsersCompetition[]>([]);
    const isLoggedin = useLoggedIn();

    useEffect(() => {
        getUserCompetitions().then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCompetitions(data);
                    console.log(data[0]);
                });
            }
        });
    }, []);

    return (
        <>
            {isLoggedin ? (
                <>
                    <ScoreTypeSelectorContainer
                        onScoreTypeChange={handleScoreTypeChange}
                    />
                    {scoreType && <ScoreCard scoreType={scoreType} competitions={competitions} />}
                </>
            ) : (
                <h2>Kirjaudu sisään syöttääksesi tuloksia</h2>
            )}
        </>
    );
}
