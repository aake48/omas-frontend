'use client';
import { useEffect, useState } from "react";
import AdminView from "./AdminView";
import { AdminViewType, User } from "@/types/commonTypes";

export default function Admin() {
    const [type, setType] = useState(AdminViewType.Other);
    const [adminLogin, setAdminLogin] = useState(false);
    const [token, setToken] = useState("");

    const checkAdminLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                let user: User = JSON.parse(localStorage.getItem("userInfo")!);
                if (user.roles.includes("ROLE_ADMIN")) {
                    setAdminLogin(true);
                }
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkAdminLogin();
    }, [])

    if (!adminLogin) return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <h1>Vain ylläpitäjällä on oikeus muokata asetuksia</h1>
        </main>
    )
    
    return (
        <AdminView />
    )
}