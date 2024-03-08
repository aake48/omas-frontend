import React, { useEffect, useState } from 'react'
import { competitionResults } from "@/types/commonTypes";
import Team from './Team';
import axios from 'axios';
import { getCompetitionByNameUrl } from '@/types/APIConstants';

interface CompetitionProps {
  name: string,
  creationDate: string,
}

const Competition = ({ name, creationDate }: CompetitionProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [competition, setCompetition] = useState<competitionResults>();

  let apiUrl = getCompetitionByNameUrl(name);

  useEffect(() => {
    axios.get(apiUrl)
    .then(res => {
      const data: competitionResults = res.data;
      setCompetition(data);
    })
  }, [])
  
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

  if (competition !== undefined && competition.teams !== null) {
    return (
      <div>
        <div
          className='flex items-center h-16 bg-slate-100 rounded-md mb-2 shadow-md ml-8 cursor-pointer'
          onClick={handleShowClubs}
          >
          <div className='ml-2'>
            {isHidden ? arrowDown : arrowUp}
          </div>
          <div className='block'>
            <h1 className='ml-2'>{name}</h1>
            <p className='ml-2 text-slate-700 text-sm'>{creationDate}</p>
          </div>
        </div>
        <div className={`${hidden} h-full p-4 bg-slate-50 rounded-md mb-2 shadow-md ml-16`}>
          {competition.teams.slice(0, 8).map((team, index) => (
            <Team clubName={team.club} position={index} key={index}/>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div
          className='flex items-center h-16 bg-slate-100 rounded-md mb-2 shadow-md ml-8 cursor-pointer'
          onClick={handleShowClubs}
          >
          <div className='ml-2'>
            {isHidden ? arrowDown : arrowUp}
          </div>
          <h1 className='ml-2'>{name}</h1>
          <p className='ml-2 text-slate-700 text-sm'>{creationDate}</p>
        </div>
        <div className={`${hidden} h-full p-4 bg-slate-50 rounded-md mb-2 shadow-md ml-16`}>
          <h1>{`Tuloksia ei löytynyt kilpailulle ${name}`}</h1>
        </div>
      </div>
    )
  }
}

export default Competition;