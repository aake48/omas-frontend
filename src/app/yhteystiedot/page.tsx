import React from "react";
import { contacts } from "../lib/constants";

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
            <div className=" p-5 text-xl container rounded-lg shadow-lg  border w-full">
                <h1 className="text-4xl">Yhteystiedot</h1>
                {contacts.map((contact, index) => (
                    <div className=" grid gap-5 p-4" key={index}>
                        <p>Sähköposti: {contact.email}</p>
                        <p>Osoite: {contact.address}</p>
                        <p>Puhelinnumero: {contact.phone}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
