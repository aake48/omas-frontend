'use client';
import fetchData from "@/lib/get";
import { getAdminUserQueryUrl } from "@/lib/APIConstants";
import { AdminQueryUser, User as UserType } from '@/types/commonTypes';
import React, { useEffect, useState } from "react";
import Paginator from "../components/Paginator";
import User from "./User";
import Input from "@/components/ui/Input";
import { testDataAdminViewUsers } from '@/lib/constants';

const Admin = () => {
    const [user, setUser] = useState<UserType>();
    const [adminLogin, setAdminLogin] = useState(false);
    const [data, setData] = useState<AdminQueryUser>();
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState("");

    let apiUrl = getAdminUserQueryUrl(search, pageNumber, 10);

    const checkAdminLogin = () => {
        let user: UserType = JSON.parse(localStorage.getItem("userInfo")!);
        if (user.roles.includes("ROLE_ADMIN")) {
            setAdminLogin(true);
            setUser(user);
        }
    }

    const fetchUsers = async () => {
        const data: any = await fetchData(apiUrl);
        setData(data);
    }

    const handlePageNumberChange = (page: number) => {
        if (!data) return;
        if (page < 0 || page > data.totalPages - 1) return;
        setPageNumber(page);
    }

    useEffect(() => {
        checkAdminLogin();
        fetchUsers();
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
        <main className="flex min-h-screen flex-col items-center p-4 gap-2">
            <h1>admin logged in</h1>
            <Input
                id="search"
                placeholder="Hae käyttäjää"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                required={false}
            />
            {data.content && data.content.map((user: UserType) => (
                <User user={user} key={user.userId} />
            ))}
            <Paginator
                pageNumber={pageNumber}
                totalPages={data.totalPages}
                handlePageNumberChange={handlePageNumberChange}
            />
        </main>
    )
}

export default Admin;