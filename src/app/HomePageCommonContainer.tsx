import React from "react";
import { upcoming } from "@/../lib/constants";
import Link from "next/link";
import { CompetitionResponse, competitionResults } from "@/types/commonTypes";

interface HomePageCommonContainerProps {
  title: string;
  data?: CompetitionResponse[];
}

const HomePageCommonContainer = ({ title }: HomePageCommonContainerProps) => {
  return (

    <div className="w-full rounded-md shadow-md border mb-8 xl:mb-0">
      <div className="flex items-baseline p-4 mx-4">
        <h1 className="text-2xl">{title}</h1>
        <Link
          href="#"
          className="ml-8 text-slate-700 text-sm underline cursor-pointer"
        >
          Näytä kaikki
        </Link>
      </div>
      <div>
        {upcoming.map((comp, index) => (
          <div
            key={index}
            className="flex items-baseline mx-4 border-b-2 last:border-b-0 cursor-pointer"
          >
            <p className="p-4">{comp.displayName}</p>
            <p className="p-4 text-sm text-slate-700">{comp.creationDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCommonContainer;
