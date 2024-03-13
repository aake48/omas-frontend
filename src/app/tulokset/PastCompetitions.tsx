'use client';
import React, { useState, useEffect } from 'react'
import { CompetitionResponse, QueryCompetition, competitionResults } from '@/types/commonTypes';
import { getCompetitionsQueryUrl } from '@/types/APIConstants';
import fetchData from '../../../lib/get';
import Score from './Score';
import Paginator from './Paginator';

const PastCompetitions = () => {
  const [content, setContent] = useState<QueryCompetition>();
  const [pageNumber, setPageNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  let formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
  let apiUrl = getCompetitionsQueryUrl("", pageNumber, 5);
  
  const fetchContent = async () => {
    const data: QueryCompetition = await fetchData(apiUrl);
    setContent(data)
  };

  useEffect(() => {
    fetchContent();
  }, [pageNumber])
  
  if (
    content?.content !== undefined &&
    content.content !== null &&
    content.content.length !== 0
    ) {
    let competitions = content.content;

    let pastCompetitions: CompetitionResponse[] = competitions.filter(competition => {
      let date1 = new Date(competition.startDate);
      let date2 = new Date(formattedDate);
      return date2 < date1;
    })

    console.log(pastCompetitions);
    
    let groupPastCompetitionsByYear = Map.groupBy(pastCompetitions, (comp: CompetitionResponse) => {
      const date = new Date(comp.endDate);
      return date.getFullYear();
    })

    console.log(groupPastCompetitionsByYear);

    if (pastCompetitions.length === 0 || groupPastCompetitionsByYear === undefined) {
      return (
        <div className="p-4">
        <h1 className='text-3xl mb-4'>Menneiden kilpailuiden tulokset</h1>
        <div>
          <h1 className='text-xl'>Tuloksia ei löytynyt</h1>
        </div>
      </div>
      )
    }

    const handlePageNumberChange = (page: number) => {
      if (page < 0 || page > content.totalPages - 1) return;
      setPageNumber(page);
    }

    return (
      <div className="p-4">
        <h1 className='text-3xl mb-4'>Menneiden kilpailuiden tulokset</h1>
        <div>
          {Array.from(groupPastCompetitionsByYear).map((year: any) => (
            <Score
              year={parseInt(year[0])}
              competitionResults={competitions}
            />
          ))}
        </div>
        <Paginator
          pageNumber={pageNumber}
          totalPages={content.totalPages}
          handlePageNumberChange={handlePageNumberChange}
        />
      </div>
    )
  } else {
    scoresNotFound();
  }

}

const getCompetitionsPerYear = () => {
  
}

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) => {
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

const scoresNotFound = () => {
  return (
      <div className="p-4">
      <h1 className='text-3xl mb-4'>Menneiden kilpailuiden tulokset</h1>
      <div>
        <h1 className='text-xl'>Tuloksia ei löytynyt</h1>
      </div>
    </div>
    )
}

export default PastCompetitions;