
import React from "react";
import { fetchData } from "@/api/get";
import * as Q from "@/lib/APIConstants"
import ClientWrapper from "./components/ClientWrapper";

export default async function Ilmoitus() {
    const competitions = await fetchData(Q.getAllCompetitionsURl);

    return (
        <main className="flex min-h-screen flex-col p-5 items-center md:p-24">
            <div className="flex flex-col  items-center gap-5 md:gap-10  justify-center p-10 rounded-lg shadow-lg container mx-auto">
                <h1 className="text-center text-3xl">Tuloksen ilmoittaminen</h1>
                <ClientWrapper competitions={competitions} />
            </div>
        </main>
    );
}
