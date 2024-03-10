'use client';
import React, { useState, useEffect } from 'react'
import { CompetitionResponse, QueryCompetition, competitionResults } from '@/types/commonTypes';
import { getCompetitionsQueryUrl } from '@/types/APIConstants';
import fetchData from './get';
import Score from './Score';
import Paginator from './Paginator';

export default function page() {
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
      return formattedDate > competition.endDate;
    })
    
    let groupPastCompetitionsByYear = Map.groupBy(competitions, (comp: competitionResults) => {
      const date = comp.creationDate.split("-")[0];
      return date;
    })

    const handlePageNumberChange = (page: number) => {
      if (page < 0 || page > content.totalPages - 1) return;
      setPageNumber(page);
    }

    return (
      <main className="min-h-screen p-4">
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
      </main>
    )
  } else {
    return (
      <h1 className='text-xl'>Tuloksia ei löytynyt</h1>
    )
  }
}