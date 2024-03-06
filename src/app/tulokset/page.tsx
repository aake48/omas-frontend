'use client';
import React, { useState, useEffect } from 'react'
import { Competition, CompetitionNoDetails, Years } from './types';
import Score from './Score';

export default function page() {
  const [competitionsNoDetails, setCompetitionsNoDetails] = useState<CompetitionNoDetails[]>([]);

  useEffect(() => {
    fetch("https://localhost:8080/api/competition/all", { cache: 'default' })
      .then(res => res.json())
      .then(json => {
        setCompetitionsNoDetails(json)
      })
  }, [])

  const groupCompetitionsByYear = Map.groupBy(competitionsNoDetails, (comp: Competition) => {
    const date = comp.creationDate.split("-")[0];
    return date;
  })

  if (competitionsNoDetails.length !== 0) {
    return (
      <main className="min-h-screen p-4">
        <h1 className='text-4xl mb-4'>Tulokset</h1>
        <div>
          {Array.from(groupCompetitionsByYear).map((year: any) => (
            <Score
              year={parseInt(year[0])}
              competitionsNoDetails={competitionsNoDetails}
            />
          ))}
        </div>
      </main>
    )
  } else {
    return (
      <h1 className='text-xl m-12'>Ei näytettäviä tuloksia</h1>
    )
  }
}