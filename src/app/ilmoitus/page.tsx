"use client"

import React, {useState} from 'react'
import ScoreTypeSelectorContainer from './ScoreTypeSelectorContainer'
import { upcoming } from '@/../lib/constants'
import CompetitionSelectorContainer from './CompetitionSelectorContainer'
import ScoreCard from './ScoreCard'

type ScoreType = "round" | "total"

export default function Ilmoitus() {
  const competitions = upcoming
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [scoreType, setScoreType] = useState<ScoreType | null>(null);


  const handleCompetitionChange = (competition: string | null) => {
    setSelectedCompetition(competition);
  };

  const handleScoreTypeChange = (scoreType: string | null) => {
    setScoreType(scoreType as ScoreType);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <CompetitionSelectorContainer competitions={competitions} onCompetitionChange={handleCompetitionChange} />
    <ScoreTypeSelectorContainer selectedCompetition={selectedCompetition} onScoreTypeChange={handleScoreTypeChange} />
    {scoreType &&  <ScoreCard scoreType={scoreType} />}
    
  </main>
  )
}
