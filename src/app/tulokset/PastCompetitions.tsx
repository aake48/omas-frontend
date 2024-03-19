'use client';
import React, { useState, useEffect } from 'react'
import { CompetitionResponse, QueryCompetition, competitionResults } from '@/types/commonTypes';
import { getCompetitionsQueryUrl } from '@/types/APIConstants';
import fetchData from '../../../lib/get';
import Score from './Score';
import Paginator from './Paginator';
import { groupBy } from 'lodash';

const PastCompetitions = () => {
  const [content, setContent] = useState<QueryCompetition>();
  const [pageNumber, setPageNumber] = useState(0);
  
  let currentDate = new Date();
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

    let pastCompetitions: CompetitionResponse[] = competitions
      .sort((a, b) => {
        return a.startDate.localeCompare(b.startDate);
      })
      .filter(competition => {
      let compDate = new Date(competition.startDate);
      return compDate < currentDate;
    })

    let groupPastCompetitionsByYear = groupBy(pastCompetitions, (comp: competitionResults) => {
      const date = new Date(comp.startDate);
      return date.getFullYear();
    })

    let groups = Object.entries(groupPastCompetitionsByYear);

    if (groups.length === 0) {
      scoresNotFound();
    }

    const handlePageNumberChange = (page: number) => {
      if (page < 0 || page > content.totalPages - 1) return;
      setPageNumber(page);
    }

    return (
      <div className="p-4">
        <h1 className='text-3xl mb-4'>Viimeisimmät tulokset</h1>
          {groups.map((group: any, index) => (
            <Score
              key={index}
              year={parseInt(group[0])}
              competitionResults={group[1]}
            />
          ))}
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

const scoresNotFound = () => {
  return (
      <div className="p-4">
      <h1 className='text-3xl mb-4'>Vimmeisimmät tulokset</h1>
      <div>
        <h1 className='text-xl'>Tuloksia ei löytynyt</h1>
      </div>
    </div>
    )
}

export default PastCompetitions;