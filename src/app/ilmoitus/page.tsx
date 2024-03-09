"use client"

import React, {useState} from 'react'
import ScoreTypeSelectorContainer from './ScoreTypeSelectorContainer'
import { upcoming } from '@/../lib/constants'
import CompetitionSelectorContainer from './CompetitionSelectorContainer'

export default function Ilmoitus() {
  const competitions = upcoming
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);


  const handleCompetitionChange = (competition: string | null) => {
    setSelectedCompetition(competition);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <CompetitionSelectorContainer competitions={competitions} onCompetitionChange={handleCompetitionChange} />
    <ScoreTypeSelectorContainer selectedCompetition={selectedCompetition} />
    
  </main>
  )
}
