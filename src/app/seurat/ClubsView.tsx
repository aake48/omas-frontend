'use client';
import React, { useEffect, useState } from 'react';
import useIsLoggedIn from '@/lib/hooks/is-logged-in';
import axios from 'axios';
import { getClubQueryUrl } from '@/lib/APIConstants';
import { ClubResponse, QueryClub, User } from '@/types/commonTypes';
import Paginator from '../components/Paginator';
import Input from '@/components/ui/Input';
import Club from './Club';

const ClubsView = () => {
	const [data, setData] = useState<QueryClub>();
	const [pageNumber, setPageNumber] = useState(0);
	const [search, setSearch] = useState("");
    const [clubAdminRoles, setClubAdminRoles] = useState<string[]>([]);
    const [joinedClub, setJoinedClub] = useState<string | null>(null);

	let apiUrl = getClubQueryUrl(search, pageNumber, 10);

	useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await axios.get(apiUrl, {
                    headers: { "Content-Type": "application/json" }
               });
               setData(res.data);
            } catch (error) {
                console.error("Error fetching clubs:", error);
            }
        };
        fetchClubs();
    }, [pageNumber, search]);

	const handlePageNumberChange = (page: number) => {
		if (!data) return;
		if (page < 0 || page > data.totalPages - 1) return;
		setPageNumber(page);
	}

	useEffect(() => {
		setPageNumber(0);
	}, [search]);

	useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
                if (storedUser?.club) setJoinedClub(storedUser.club);

                if (storedUser?.roles) {
                    const roles = storedUser.roles.replace(/[[\]]/g, "").split(",");
                    const adminRoles = roles
                        .filter(role => role.endsWith("/admin"))
                        .map(role => role.replace("/admin", "").trim());

                    setClubAdminRoles(adminRoles);
                }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }, []);
	
	if (!useIsLoggedIn()) return (
		<main className="flex min-h-screen flex-col sm:items-center p-4 gap-2">
			<h1 className='text-4xl'>Seurat</h1>
			<p className='text-md'>Kirjaudu sisään tarkastellaksesi ja liittyäksesi seuraan.</p>
		</main>
	)

	if (!data) return (
		<main className="flex min-h-screen flex-col sm:items-center p-4 gap-2">
			<h1 className='text-4xl'>Seurat</h1>
			<p className='text-md'>Virhe seurojen haussa.</p>
		</main>
	)

	return (
        <main className="flex min-h-screen flex-col items-center p-4 gap-10">
            <h1 className="text-4xl">Seurat</h1>
                <Input id="search" placeholder="Hae seuraa" type="text" onChange={(e) => setSearch(e.target.value)} />
                <Paginator pageNumber={pageNumber} totalPages={data.totalPages} handlePageNumberChange={handlePageNumberChange} />
                <div className="flex flex-col gap-2 w-full">
                    {data.content.map((club: ClubResponse, index: number) => (
                        <Club
                            key={club.id ?? `club-${index}`}
                            club={club}
                            joinedClub={joinedClub}
                            setJoinedClub={setJoinedClub}
                            clubAdminRoles={clubAdminRoles}
                        />
                    ))}
                </div>
            </main>
        );
    };

export default ClubsView;