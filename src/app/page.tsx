import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className='w-full rounded-md shadow-md border mb-8'>
        <div className='flex items-center p-4 mx-4 border-b-2'>
          <h1 className='text-2xl'>Sarjakilpailukausi</h1>
          <p className='ml-8 text-slate-700 text-sm'>6.11.2023-5.3.2024</p>
        </div>
        <div>
          <p className='mx-4 p-4 border-b-2 w-1/2'>Sarjakilpailun säännöt</p>
          <p className='mx-4 p-4 border-b-2 w-1/2'>Ilmoita joukkue</p>
          <p className='mx-4 p-4 w-1/2'>Kolmas linkki</p>
        </div>
      </div>
      <div className='lg:flex lg:justify-between lg:items-center gap-8'>
        <div className='w-full rounded-md shadow-md border mb-8 lg:mb-0'>
          <div className='flex items-center p-4 mx-4 border-b-2'>
            <h1 className='text-2xl'>Sarjakilpailukausi</h1>
            <p className='ml-8 text-slate-700 text-sm'>6.11.2023-5.3.2024</p>
          </div>
          <div>
            <p className='mx-4 p-4 border-b-2 w-1/2'>Sarjakilpailun säännöt</p>
            <p className='mx-4 p-4 border-b-2 w-1/2'>Ilmoita joukkue</p>
            <p className='mx-4 p-4 w-1/2'>Kolmas linkki</p>
          </div>
        </div>
        <div className='w-full rounded-md shadow-md border'>
          <div className='flex items-center p-4 mx-4 border-b-2'>
            <h1 className='text-2xl'>Sarjakilpailukausi</h1>
            <p className='ml-8 text-slate-700 text-sm'>6.11.2023-5.3.2024</p>
          </div>
          <div>
            <p className='mx-4 p-4 border-b-2 w-1/2'>Sarjakilpailun säännöt</p>
            <p className='mx-4 p-4 border-b-2 w-1/2'>Ilmoita joukkue</p>
            <p className='mx-4 p-4 w-1/2'>Kolmas linkki</p>
          </div>
        </div>
      </div>
    </main>
  );
}
