

import Link from "next/link";
import React from "react";

export default function ScoreTypeSelectorContainer({selectedCompetition }: {selectedCompetition: string | null}) {
    console.log(selectedCompetition)

    return (
        <div className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-lg container mx-auto">
            <h1>Tuloksen ilmoittaminen</h1>
            <h2> {selectedCompetition}</h2>
            <div className=" w-full justify-around flex p-5">
                <Link
                    className="border px-4 py-2 rounded-lg"
                >
                    Kierros
                </Link>
                <Link >Kokonaistulos</Link>
            </div>
        </div>
    );
}
