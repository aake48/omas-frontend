import React from 'react';
import { upcoming } from './lib/constants';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className='w-full rounded-md shadow-md border mb-8'>
        <div className='flex items-baseline p-4 mx-4'>
          <h1 className='text-2xl'>Sarjakilpailukausi</h1>
          <p className='ml-8 text-slate-700 text-sm'>6.11.2023-5.3.2024</p>
        </div>
        <div className='flex items-center'>
          <Link href="#" className='mx-4 p-4 cursor-pointer'>Sarjakilpailun säännöt</Link>
          <Link href="#" className='mx-4 p-4 cursor-pointer'>Ilmoita joukkue</Link>
        </div>
      </div>
      <div className='xl:flex xl:justify-between xl:items-center gap-8'>
      <div className='w-full rounded-md shadow-md border mb-8 xl:mb-0'>
          <div className='flex items-baseline p-4 mx-4'>
            <h1 className='text-2xl'>Tulevat kilpailut</h1>
            <Link href="#" className='ml-8 text-slate-700 text-sm underline cursor-pointer'>Näytä kaikki</Link>
          </div>
          <div>
            {upcoming.map(comp => (
              <div className='flex items-baseline mx-4 border-b-2 last:border-b-0 cursor-pointer'>
                <p className='p-4'>{comp.name}</p>
                <p className='p-4 text-sm text-slate-700'>{comp.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full rounded-md shadow-md border'>
          <div className='flex items-baseline p-4 mx-4'>
            <h1 className='text-2xl'>Menneet kilpailut</h1>
            <Link href="#" className='ml-8 text-slate-700 text-sm underline cursor-pointer'>Näytä kaikki</Link>
          </div>
          <div>
            {upcoming.map(comp => (
              <div className='flex items-baseline mx-4 border-b-2 last:border-b-0 cursor-pointer'>
                <p className='p-4'>{comp.name}</p>
                <p className='p-4 text-sm text-slate-700'>{comp.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
