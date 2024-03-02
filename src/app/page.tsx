import React from 'react';
import Link from 'next/link';
import HomePageCommonContainer from './HomePageCommonContainer';
import { Button } from '@/components/ui/Button';
import { upcoming } from '@/../lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className='w-full rounded-md shadow-md border mb-8'>
        <div className='items-baseline p-4'>
          <h1 className='text-2xl'>Sarjakilpailukausi</h1>
          <p className='lg:ml-8 text-slate-700 text-sm'>6.11.2023-5.3.2024</p>
        </div>
        <div className='flex gap-4 items-center p-4'>
          <Button variant="outline" className='hover:bg-slate-'>
            <Link href="#">Sarjakilpailun säännöt</Link>
          </Button>
          <Button variant="outline" className='hover:bg-slate-100'>
            <Link href="#">Ilmoita joukkue</Link>
          </Button>
        </div>
      </div>
      <div className='xl:flex xl:justify-between xl:items-center gap-8'>
        <HomePageCommonContainer title="Tulevat kilpailut" data={upcoming}/>
        <HomePageCommonContainer title="Menneet kilpailut" data={upcoming}/>
      </div>
    </main>
  );
}
