"use client";

import Dropdown from "@/components/ui/Dropdown";
import { CompetitionResponse } from "@/types/commonTypes";
import React from "react";

interface CompetitionSelectorContainerProps {
    competitions: CompetitionResponse[];
    onCompetitionChange: (competition: CompetitionResponse | null) => void;

}

export default function CompetitionSelectorContainer({
    competitions,
    onCompetitionChange,
}: CompetitionSelectorContainerProps) {
    const [selectedCompetition, setSelectedCompetition] = React.useState<
        CompetitionResponse | null
    >(null);

    const competitionNames = competitions.map((competition) => competition.displayName);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const displayName = competitions.find((c) => c.displayName === e.target.value) ?? null;
        setSelectedCompetition(displayName);
        onCompetitionChange(displayName);
    };
    return (
        <div>
            <Dropdown
                id="competitionlist"
                options={competitionNames}
                selected={selectedCompetition?.displayName}
                required
                onChange={handleDropdownChange}
            />
        </div>
    );
}
