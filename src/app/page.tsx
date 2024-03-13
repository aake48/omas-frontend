'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CompetitionResponse, QueryCompetition, competitionResults } from '@/types/commonTypes';
import { getCompetitionsQueryUrl } from '@/types/APIConstants';
import fetchData from '../../lib/get';

export default function Home() {
  const [content, setContent] = useState<QueryCompetition>();
  const [currentDate, setCurrentDate] = useState(new Date());

  let formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
  let apiUrl = getCompetitionsQueryUrl("", 0, 10);
  
  const fetchContent = async () => {
    const data: QueryCompetition = await fetchData(apiUrl);
    setContent(data)
  };

  useEffect(() => {
    fetchContent();
  }, [])

  if (
    content?.content !== undefined &&
    content.content !== null &&
    content.content.length !== 0
  ) {
    let competitions = content.content;
    console.log(formattedDate);

    let pastCompetitions: CompetitionResponse[] = competitions.filter(competition => {
      return formattedDate > competition.endDate;
    })

    let futureCompetitions: CompetitionResponse[] = competitions.filter(competition => {
      return formattedDate < competition.startDate;
    })

    return (
      <main className="min-h-screen p-8">
        <div className='w-full rounded-md shadow-md border mb-8'>
          <div className='items-baseline p-4'>
            <h1 className='text-2xl'>Sarjakilpailukausi</h1>
            <p className='lg:ml-8 text-slate-700 text-sm'>6.11.2023-3.3.2024</p>
          </div>
          <div className='sm:flex items-center p-4'>
            <Button variant="outline" className='hover:bg-slate-100 mb-2 sm:mb-0 mr-4'>
              <Link href="#">Sarjakilpailun säännöt</Link>
            </Button>
            <Button variant="outline" className='hover:bg-slate-100'>
              <Link href="/joukkueet">Ilmoita joukkue</Link>
            </Button>
          </div>
        </div>
        <div className='xl:flex xl:justify-between xl:items-center gap-8'>
          <div className="w-full rounded-md shadow-md border mb-8 xl:mb-0">
            <div className="flex items-baseline p-4 mx-4">
              <h1 className="text-2xl">Tulevat kilpailut</h1>
              <Link
                href="/kilpailut"
                className="ml-8 text-slate-700 text-sm underline cursor-pointer"
              >
                Näytä kaikki
              </Link>
            </div>
            <div>
              {futureCompetitions !== undefined && futureCompetitions.slice(0, 3).map((comp, index) => (
                <div
                  key={index}
                  className="flex items-baseline mx-4 border-b-2 last:border-b-0"
                >
                  <p className="p-4">{comp.displayName}</p>
                  <p className="p-4 text-sm text-slate-700">{comp.startDate}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-md shadow-md border mb-8 xl:mb-0">
            <div className="flex items-baseline p-4 mx-4">
              <h1 className="text-2xl">Viimeisimmät tulokset</h1>
              <Link
                href="/tulokset"
                className="ml-8 text-slate-700 text-sm underline cursor-pointer"
              >
                Näytä kaikki
              </Link>
            </div>
            <div>
              {pastCompetitions !== undefined && pastCompetitions.slice(0, 3).map((comp, index) => (
                <div
                  key={index}
                  className="flex items-baseline mx-4 border-b-2 last:border-b-0"
                >
                  <p className="p-4">{comp.displayName}</p>
                  <p className="p-4 text-sm text-slate-700">{comp.startDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } else {

  }
}
