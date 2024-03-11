"use client"


import { Button } from "@/components/ui/Button";
import React from "react";

interface ScoreTypeSelectorContainerProps {
    selectedCompetition: string | null;
    onScoreTypeChange: (scoreType: "round" | "total") => void;
}

export default function ScoreTypeSelectorContainer({selectedCompetition, onScoreTypeChange }: ScoreTypeSelectorContainerProps) {

    const [scoreType, setScoreType] = React.useState<ScoreType>("round");

    type ScoreType = "round" | "total"

    function handleClick(scoreType:ScoreType) {
        setScoreType(scoreType)
        onScoreTypeChange(scoreType)
    }
    return (
        <div className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-lg container mx-auto">
            <h1>Tuloksen ilmoittaminen</h1>
            <h2> {selectedCompetition}</h2>
            <div className=" w-full justify-around flex p-5">
                <Button
                    className="border px-4 py-2 rounded-lg"
                    onClick={() => handleClick("round")}
                >
                    Kierros
                </Button>
                <Button className="border px-4 py-2 rounded-lg" onClick={() => handleClick('total')} >Kokonaistulos</Button>
            </div>
        </div>
    );
}
