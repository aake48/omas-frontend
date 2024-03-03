'use client';
import React, { useState, useEffect } from 'react'
import { Score as ScoreType } from './types';
import Score from './score';
import { scores } from './scores';

export default function page() {
  const [scores1, setScores] = useState<ScoreType[]>([]);

  // fetching does not do anything yet
  useEffect(() => {
    fetch("http://localhost:8080/api/competition/result/test_comp", {cache: 'default'})
      .then(res => {
        console.log(res);
        if (!res.ok) {
          throw new Error("could not fetch scores")
        }
        return res.json()
      })
      .then(json => {
        setScores(json);
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <main className="p-2 min-h-screen">
      <h1 className='text-4xl mb-2'>Tulokset</h1>
      {scores.sort((a, b,) => b.year - a.year).map((score, index) => (
        <Score key={index} year={score.year} divisions={score.divisions}/>
      ))}
    </main>
  )
}