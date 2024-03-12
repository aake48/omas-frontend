"use client";

import React, { useState } from "react";
import ScoreTypeSelectorContainer from "./components/ScoreTypeSelectorContainer";
import { upcoming } from "@/../lib/constants";
import CompetitionSelectorContainer from "./components/CompetitionSelectorContainer";
import ScoreCard from "./components/ScoreCard";

export type ScoreType = "round" | "total";

export default function Ilmoitus() {
    const competitions = upcoming;
    const [selectedCompetition, setSelectedCompetition] = useState<
        string | null
    >(null);
    const [scoreType, setScoreType] = useState<ScoreType | null>(null);

    const handleCompetitionChange = (competition: string | null) => {
        setSelectedCompetition(competition);
    };

    const handleScoreTypeChange = (scoreType: string | null) => {
        setScoreType(scoreType as ScoreType);
    };

    return (
        <main className="flex min-h-screen flex-col p-5 items-center md:p-24">
            <div className="flex flex-col  items-center gap-5 md:gap-24  justify-center p-10 rounded-lg shadow-lg container mx-auto">
                <h1 className="text-center text-3xl">Tuloksen ilmoittaminen</h1>

                <CompetitionSelectorContainer
                    competitions={competitions}
                    onCompetitionChange={handleCompetitionChange}
                />
                <ScoreTypeSelectorContainer
                    selectedCompetition={selectedCompetition}
                    onScoreTypeChange={handleScoreTypeChange}
                />
                {scoreType && <ScoreCard scoreType={scoreType} />}
            </div>
        </main>
    );
}
