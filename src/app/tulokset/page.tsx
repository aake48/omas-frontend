import React from 'react'
import { Score as ScoreType } from './types';
import Score from './score';
import { scores } from './scores';

export default function page() {
  return (
    <main className="p-2 h-screen">
      {scores.sort((a, b) => b.year - a.year).map(score => (
        <Score year={score.year} divisions={score.divisions}/>
      ))}
    </main>
  )
}