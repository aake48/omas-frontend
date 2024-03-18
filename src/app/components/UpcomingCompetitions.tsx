import { CompetitionResponse } from '@/types/commonTypes'
import Link from 'next/link'
import React from 'react'

export default function UpcomingCompetitions({futureCompetitions} : {futureCompetitions: CompetitionResponse[]}) {
  return (
    <div className="w-full rounded-md shadow-md border mb-8">
    <div className="flex items-baseline p-4 mx-4">
        <h2 className="text-2xl">Tulevat kilpailut</h2>
        <Link
            href="/kilpailut"
            className="ml-8 text-slate-700 text-sm underline cursor-pointer"
        >
            Näytä kaikki
        </Link>
    </div>
    <div>
        {futureCompetitions !== undefined &&
            futureCompetitions
                .slice(0, 3)
                .map((comp, index) => (
                    <div
                        key={index}
                        className="mx-4 border-b-2 last:border-b-0"
                    >
                        <p className="p-2">
                            {comp.displayName}
                        </p>
                        <p className="pb-2 px-2 text-sm text-slate-700">
                            {comp.startDate}
                        </p>
                    </div>
                ))}
    </div>
</div>
  )
}
