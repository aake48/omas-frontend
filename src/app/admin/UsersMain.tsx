'use client';
import { getAdminUserQueryUrl } from "@/lib/APIConstants";
import { AdminQueryUser, User as UserType } from '@/types/commonTypes';
import React, { useEffect, useState } from "react";
import Paginator from "../components/Paginator";
import Input from "@/components/ui/Input";
import axios from "axios";
import Users from "./Users";

const UsersMain = () => {
    const [user, setUser] = useState<UserType>();
    const [adminLogin, setAdminLogin] = useState(false);
    const [data, setData] = useState<AdminQueryUser>();
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState("");

    let apiUrl = getAdminUserQueryUrl(search, pageNumber, 10);

    const checkAdminLogin = async () => {
        try {
            let user: UserType = JSON.parse(localStorage.getItem("userInfo")!);
            if (user.roles.includes("ROLE_ADMIN")) {
                setAdminLogin(true);
                setUser(user);
                fetchUsers();
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(res.data);
        } catch (e: any) {
            console.error(e);
        }
    }

    const handlePageNumberChange = (page: number) => {
        if (!data) return;
        if (page < 0 || page > data.totalPages - 1) return;
        setPageNumber(page);
    }

    useEffect(() => {
        checkAdminLogin();
    }, [pageNumber, search]);

    if (!adminLogin) return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <h1>Vain ylläpitäjällä on oikeus muokata asetuksia</h1>
        </main>
    )
    
    if (!data) return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <h1>Virhe käyttäjätietojen haussa</h1>
        </main>
    )

    return (
        <div className="flex min-h-screen w-full flex-col items-center p-4 gap-2">
            <div className="flex flex-col items-center gap-8">
                <Input
                    id="search"
                    placeholder="Hae käyttäjää"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    required={false}
                />
                <p className="text-md">Muista mennä ensimmäiselle sivulle, ennen kuin etsit</p>
            </div>
            <Paginator
                pageNumber={pageNumber}
                totalPages={data.totalPages}
                handlePageNumberChange={handlePageNumberChange}
            />
            <Users data={data} />
        </div>
    )
}

export default UsersMain;