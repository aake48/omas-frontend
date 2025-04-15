import React from "react";
import ClientWrapper from "./components/ClientWrapper";

export default async function Ilmoitus() {


    return (
        <main className="flex md:min-h-screen flex-col p-5 items-center md:p-24">
            <div className="flex flex-col  items-center gap-5 md:gap-10  justify-center p-5 md:p-10 rounded-lg shadow-lg container mx-auto">
                <h1 className="text-center text-3xl">Tuloksen ilmoittaminen</h1>
                <h2 className="text-center text-2xl">Valitse tuloksen tyyppi:</h2>
                <ClientWrapper />
            </div>
        </main>
    );
}
