import React from "react";
import { contacts } from "@/lib/constants";
import Link from "next/link";

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
            <div className=" p-5 text-xl container rounded-lg shadow-lg  border w-full">
                <h1 className="text-4xl">Yhteystiedot</h1>
                {contacts.map((contact, index) => (
                    <div className=" grid gap-5 p-4" key={index}>
                        <p>Sähköposti: {contact.email}</p>
                        <p>Osoite: {contact.address}</p>
                        <Link className="text-blue-600 hover:underline" target="_blank" href="https://www.omas.fi/">OMAS.fi</Link>
                        {/* <p>Puhelinnumero: {contact.phone}</p> */}
                    </div>
                ))}
            </div>
        </main>
    );
}
