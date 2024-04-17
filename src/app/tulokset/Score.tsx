'use client';
import React, { useState } from 'react'
import Competition from './Competition';
import { CompetitionResponse } from '@/types/commonTypes';

interface ScoreProps {
  year: number,
  competitionResults: CompetitionResponse[] | null
}

const Score = ({ year, competitionResults }: ScoreProps) => {

  if (!competitionResults || competitionResults.length === 0) return (
    <div>
      <h1 className='text-2xl'>Tuloksia ei löytynyt vuodelta {year}</h1>
    </div>
  )

    return (
      <div>
        <h1 className='text-3xl mb-4'>Tulokset vuodelta {year}</h1>
        {competitionResults.map((competition, index) => (
            <Competition
              key={index}
              name={competition.competitionId}
              displayName={competition.displayName}
              endDate={competition.endDate}
              startDate={competition.startDate}
              type={competition.type}
            />
          ))}
      </div>
    )
}

export default Score;