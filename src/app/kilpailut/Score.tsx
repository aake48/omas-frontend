'use client';
import React, { useState } from 'react'
import Competition from './Competition';
import { Competition as CompetitionType } from './types';

interface ScoreProps {
  year: number,
  competitions: CompetitionType[]
}

const Score = ({ year, competitions }: ScoreProps) => {
  const [isHidden, setIsHidden] = useState(true);
  
  const arrowUp = 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>;
  const arrowDown =
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>;

  let hidden = "";

  const handleShowDivisions = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }

  if (isHidden) {
      hidden = "hidden";
  } else {
      hidden = "";
  }

  return (
    <div>
      <div
        className={`flex items-center h-16 w-full bg-slate-200 rounded-lg shadow-md mb-2 cursor-pointer`}
        onClick={handleShowDivisions}
      >
        <div className='ml-2'>
          {isHidden ? arrowDown : arrowUp}
        </div>
        <h1 className='ml-2'>{`Tulokset ${year}`}</h1>
      </div>
      <div className={hidden}>
        {competitions?.map((competition, index: number) => (
          <Competition
            key={competition.name}
            name={competition.name}
            creationDate={competition.creationDate}
            teams={competition.teams}
          />
        ))}
      </div>
    </div>
  )
}

export default Score;