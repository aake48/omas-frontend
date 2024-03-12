"use client";

import Dropdown from "@/components/ui/Dropdown";
import { CompetitionResponse } from "@/types/commonTypes";
import React from "react";
import Competition from "../../tulokset/Competition";

interface CompetitionSelectorContainerProps {
    competitions: Object[];
    onCompetitionChange: (competition: string | null) => void;
}

export default function CompetitionSelectorContainer({
    competitions,
    onCompetitionChange,
}: CompetitionSelectorContainerProps) {
    const [selectedCompetition, setSelectedCompetition] = React.useState<
        string | null
    >(null);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompetition(e.target.value);
        onCompetitionChange(e.target.value);
    };
    return (
        <div >
            <Dropdown
                id="competitionlist"
                options={competitions}
                required
                onChange={handleDropdownChange}
            />
        </div>
    );
}
