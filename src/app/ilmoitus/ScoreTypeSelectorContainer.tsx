import Link from "next/link";
import React from "react";

export default function ScoreTypeSelectorContainer() {
    return (
        <div className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-lg container mx-auto">
            <h1>Tuloksen ilmoittaminen</h1>
            <div className=" w-full justify-around flex p-5">
                <Link className="border px-4 py-2 rounded-lg" href="/ilmoitus/kierros">Kierros</Link>
                <Link href="/ilmoitus/kokonais">Kokonaistulos</Link>
            </div>
        </div>
    );
}
