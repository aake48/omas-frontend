"use client"

import { CompetitionResponse, ScoreType } from "@/types/commonTypes";
import React, { useState } from "react";
import ScoreTypeSelectorContainer from "./ScoreTypeSelectorContainer";
import ScoreCard from "./ScoreForm";

export default function NotificationClientWrapper({ competitions }: { competitions: CompetitionResponse[] }) {

    const [scoreType, setScoreType] = useState<ScoreType | null>(null);
    const handleScoreTypeChange = (scoreType: ScoreType | null) => {
        setScoreType(scoreType as ScoreType);
    };

    return (
        <>
            <ScoreTypeSelectorContainer
                onScoreTypeChange={handleScoreTypeChange}
            />
            {scoreType && <ScoreCard scoreType={scoreType} competitions={competitions} />}
        </>
    );
}
