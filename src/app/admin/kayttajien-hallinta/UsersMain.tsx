'use client';
import { getAdminUserQueryUrl } from "@/lib/APIConstants";
import { AdminQueryUser } from '@/types/commonTypes';
import React, { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import Input from "@/components/ui/Input";
import axios from "axios";
import Users from "./Users";
import useUserInfo from "@/lib/hooks/get-user.info";
import AdminNavbar from "../AdminNavbar";
import {Button} from "@/components/ui/Button";
import CreateUserForm from "./CreateUser";

const UsersMain = () => {
    const [data, setData] = useState<AdminQueryUser>();
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { token } = useUserInfo();

    let apiUrl = getAdminUserQueryUrl(search, pageNumber, 10);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    const handleUserCreated = () => {
        fetchUsers();
    }

    useEffect(() => {
        if (token) fetchUsers();
    }, [pageNumber, search, token]);

    useEffect(() => {
        setPageNumber(0);
    }, [search]);

    return (
        <div className="p-4">
            <AdminNavbar />
            <div className="py-2">
                <p className="text-md">Tällä sivulla voit hallinnoida käyttäjiä, voit muokata heidän rooleja sekä poistaa käyttäjiä</p>
                <p className="text-md">Tiedot päivittyvät sivun päivittämisen jälkeen.</p>
                <p className="text-md">Etsiminen tapahtuu koko nimen (etunimi ja sukunimi) perusteella.</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-100"
                    onClick={() => setIsFormOpen(true)}>
                    Luo käyttäjä
                </Button>
            </div>
            <div className="flex min-h-screen w-full flex-col items-center p-4 gap-2">
                <div className="flex flex-col items-center mb-4 w-full max-w-2xl">
                    <div className="flex w-full gap-2">
                        <Input
                            id="search"
                            placeholder="Hae käyttäjää"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            required={false}
                        />
                    </div>
                </div>
                {
                    (data) ?
                        <div className="w-full">
                            <Paginator
                                pageNumber={pageNumber}
                                totalPages={data.totalPages}
                                handlePageNumberChange={handlePageNumberChange}
                            />
                            <Users data={data} />
                        </div>
                        : <h1>Käyttäjätietoja ei löytynyt.</h1>
                }

                <CreateUserForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onUserCreated={handleUserCreated}
                />
            </div>
        </div>
    )
}

export default UsersMain;