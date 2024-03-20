import { Button } from "@/components/ui/Button";
import { ScoreType } from "@/types/commonTypes";
import React from "react";

interface ScoreTypeSelectorContainerProps {
    onScoreTypeChange: (scoreType: ScoreType) => void;
}

export default function ScoreTypeSelectorContainer({
    onScoreTypeChange,
}: ScoreTypeSelectorContainerProps) {
    const [scoreType, setScoreType] = React.useState<ScoreType>("round");

    function handleClick(scoreType: ScoreType) {
        setScoreType(scoreType);
        onScoreTypeChange(scoreType);
    }
    return (
        <div className=" grid mx-auto text-center container justify-center">
            <div className=" w-full justify-around gap-7 flex p-5">
                <Button
                    className="border w-32 px-4 py-2 rounded-lg hover:bg-slate-100"
                    onClick={() => handleClick("round")}
                >
                    Kierros
                </Button>
                <Button
                    className="border px-4 py-2 rounded-lg hover:bg-slate-100"
                    onClick={() => handleClick("total")}
                >
                    Kokonaistulos
                </Button>
            </div>
        </div>
    );
}
