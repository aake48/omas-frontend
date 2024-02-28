import Link from "next/link";
import React from "react";

export default function ScoreTypeSelectorContainer() {
    return (
        <main className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-lg container mx-auto">
            <h1>Tuloksen ilmoittaminen</h1>
            <div className=" w-full justify-around flex p-5">
                <Link href="/kierrostulos">Kierros</Link>
                <Link href="/kokonaistulos">Kokonaistulos</Link>
            </div>
        </main>
    );
}
