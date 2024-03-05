'use client';
import React, { useState, useEffect } from 'react'
import { Competition as CompetitionType } from './types';
import Score from './score';

export default function page() {
  const [competitions, setCompetitions] = useState<CompetitionType[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/competition/result/kesan_ampujaiset", { cache: 'default' })
      .then((res) => res.json())
      .then((json) => {
        setCompetitions([...competitions, json])
      })
  }, []);

  return (
    <main className="min-h-screen p-4">
      <h1 className='text-4xl mb-4'>Tulokset</h1>
      <div>
        <Score
          year={parseInt(competitions[0]?.creationDate.split("-")[0])}
          competitions={competitions}
        />
      </div>
    </main>
  )
}