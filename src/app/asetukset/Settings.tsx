'use client';
import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

export default function Settings() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            setToken(token);
        }
    }, [loggedIn])

    
    if (!loggedIn) return (
        <main className="flex flex-col min-h-screen items-center justify-between p-2">
            <p>Asetuksia ei voi muuttaa, ennen kuin olet kirjautunut sisään</p>
        </main>
    )

    return (
        <div>
            <ChangePassword token={token} />
            <ChangeEmail token={token} />
        </div>
    );
}