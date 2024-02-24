'use client';
import React, { useState } from 'react'
import { Club as ClubType } from './types';
import Club from './club';

interface DivisionProps {
    name: string,
    clubs: ClubType[]
}

const Division = ({ name, clubs }: DivisionProps) => {
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
  
    const handleShowClubs = () => {
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
            className='flex items-center h-16 bg-slate-200 rounded-md mb-2 shadow-md ml-8 cursor-pointer'
            onClick={handleShowClubs}
        >
            <div className='ml-2'>
                {isHidden ? arrowDown : arrowUp}
            </div>
            <h1 className='ml-2'>{name}</h1>
        </div>
        <div className={hidden}>
            {clubs.sort((a, b) => a.position - b.position).map((club, index) => (
                <Club key={index} name={club.name} shortName={club.shortName} position={club.position} members={club.members}/>
            ))}
        </div>
    </div>
  )
}

export default Division;