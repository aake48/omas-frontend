'use client';
import React, { useState, useEffect } from 'react'
import Score from './Score';
import axios from 'axios';
import { competitionResults, queryResult } from '@/types/commonTypes';
import { getCompetitionsQueryUrl } from '@/types/APIConstants';

export default function page() {
  const [content, setContent] = useState<queryResult>();
  const [pageNumber, setPageNumber] = useState(0);

  let apiUrl = getCompetitionsQueryUrl("", pageNumber, 10);
  
  useEffect(() => {
    axios.get(apiUrl)
      .then(res => {
        const data: queryResult = res.data;
        setContent(data);
      })
  }, [pageNumber])

  if (
    content?.content !== undefined &&
    content.content !== null &&
    content.content.length !== 0
  ) {
    let groupCompetitionsByYear = Map.groupBy(content.content, (comp: competitionResults) => {
      const date = comp.creationDate.split("-")[0];
      return date;
    })

    const handlePageNumberChange = (page: number) => {
      if (page < 0 || page > content.totalPages - 1) return;
      setPageNumber(page);
    }

    let pageElements: any[] = [];
    let start = pageNumber - 2;
    let end = pageNumber + 2;

    if (pageNumber < 2) {
      start = 0;
      end = 4;
    } else if (pageNumber > content.totalPages - 2) {
      start = pageNumber - 3;
      end = content.totalPages;
    }

    for (let i = start; i < end; i++) {
      let selectedPageStyle = "";
      if (pageNumber === i) {
        selectedPageStyle = "bg-slate-300";
      }

      pageElements.push(
        <li
          className={`${selectedPageStyle} flex items-center justify-center p-3 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2`}
          onClick={() => handlePageNumberChange(i)}
          key={i}
        >
          {i + 1}
        </li>
      );
    }
  
    return (
      <main className="min-h-screen p-4">
        <h1 className='text-4xl mb-4'>Tulokset</h1>
        <div>
          {Array.from(groupCompetitionsByYear).map((year: any) => (
            <Score
              year={parseInt(year[0])}
              competitionResults={content.content}
            />
          ))}
        </div>
        <div className='flex items-center justify-center mt-6'>
          <div className='border-slate-100 border-2 rounded-md'>
            <ul className="flex items-center h-8 text-sm">
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
              </li>
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(pageNumber - 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </li>
              {pageElements}
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2"
                onClick={() => handlePageNumberChange(pageNumber + 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(content.totalPages - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </main>
    )
  } else {
    <h1 className='text-xl'>Tuloksia ei löytynyt</h1>
  }
}