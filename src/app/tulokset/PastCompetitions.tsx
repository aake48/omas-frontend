'use client';
import React, { useState, useEffect } from 'react'
import { CompetitionResponse, QueryCompetition, competitionResults } from '@/types/commonTypes';
import Score from './Score';
import Paginator from '../components/Paginator';
import { groupBy } from 'lodash';
import { getCompetitionsQueryUrl } from '@/lib/APIConstants';
import axios from 'axios';
import Input from '@/components/ui/Input';

const PastCompetitions = () => {
  const [content, setContent] = useState<QueryCompetition>();
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  
  let currentDate = new Date();
  let apiUrl = getCompetitionsQueryUrl(search, pageNumber, 5);
  
  const fetchContent = async () => {
    try {
        const res = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setContent(res.data);
    } catch (e: any) {
        console.error(e);
    }
}

  useEffect(() => {
    fetchContent();
  }, [pageNumber, search])

  useEffect(() => {
    setPageNumber(0);
  }, [search])
  
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
        <div className="flex flex-col items-center gap-2 mb-8">
            <Input
                id="search"
                placeholder="Hae kilpailua"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                required={false}
            />
            <Paginator
              pageNumber={pageNumber}
              totalPages={content.totalPages}
              handlePageNumberChange={handlePageNumberChange}
            />
          </div>
          {groups.map((group: any, index) => (
            <Score
              key={index}
              year={parseInt(group[0])}
              competitionResults={group[1]}
            />
          ))}
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