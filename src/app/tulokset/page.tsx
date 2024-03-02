import React from 'react'
import { Score as ScoreType } from './types';
import Score from './score';
import { scores } from './scores';

export default function page() {
  return (
    <main className="p-2 h-screen">
      <h1 className='text-4xl mb-2'>Tulokset</h1>
      {scores.sort((a, b,) => b.year - a.year).map((score, index) => (
        <Score key={index} year={score.year} divisions={score.divisions}/>
      ))}
    </main>
  )
}