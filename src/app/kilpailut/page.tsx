'use client';
import React, { useState, useEffect } from 'react'
import Competition from './Competition';

interface CompetitionType {
  name: string,
  creationDate: string
}

export default function page() {
  const [competitions, setCompetitions] = useState<CompetitionType[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/competition/all", {cache: 'default'})
      .then((res) => res.json())
      .then((json) => {
        setCompetitions(json);
      })
  }, []);

  return (
    <main className="min-h-screen p-4">
      <h1 className='text-4xl mb-4'>Kilpailut</h1>
      <div className='w-full rounded-md shadow-md border p-4'>
        {competitions.map(competition => (
          <Competition name={competition.name} creationDate={competition.creationDate}/>
        ))}
      </div>
    </main>
  )
}