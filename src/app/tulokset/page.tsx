'use client';
import React, { useState, useEffect } from 'react'
import { Competition, Content } from './types';
import Score from './Score';

export default function page() {
  const [content, setContent] = useState<Content>();
  const [pageNumber, setPageNumber] = useState(0);

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/competition/query?search=&page=${pageNumber}&size=10`;
  
  useEffect(() => {
    fetch(apiUrl, { cache: 'default' })
      .then(res => res.json())
      .then(json => {
        setContent(json)
      })
  }, [pageNumber])

  if (content?.content !== undefined && content.content.length !== 0) {
    let groupCompetitionsByYear = Map.groupBy(content.content, (comp: Competition) => {
      const date = comp.creationDate.split("-")[0];
      return date;
    })

    const handlePageNumberChange = (page: number) => {
      if (page < 0 || page > content.totalPages - 1) {
        return;
      }
      setPageNumber(page);
    }

    let pages: any[] = [];
    for (let i = 0; i < content.totalPages; i++) {
      pages.push(
        <li
          className="flex items-center justify-center px-5 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2"
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
              competitionsNoDetails={content.content}
            />
          ))}
        </div>
        <div className='flex items-center justify-center mt-12'>
          <div className='border-slate-100 border-2 rounded-md'>
            <ul className="flex items-center h-8 text-sm">
              <li
                className="flex items-center justify-center px-3 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(pageNumber - 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </li>
              {pages}
              <li
                className="flex items-center justify-center px-3 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2"
                onClick={() => handlePageNumberChange(pageNumber + 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </main>
    )
  } else {
  }
}