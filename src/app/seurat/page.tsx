'use client';
import React, { useEffect, useState } from 'react';
import useIsLoggedIn from '@/lib/hooks/is-logged-in';
import axios from 'axios';
import { getClubQueryUrl } from '@/lib/APIConstants';
import { ClubResponse, QueryClub } from '@/types/commonTypes';
import Paginator from '../components/Paginator';
import Input from '@/components/ui/Input';
import Club from './Club';
import { useRouter } from 'next/navigation';

const fetchClubs = async (apiUrl: string, setData: (data: QueryClub) => void) => {
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

export default function Seurat() {
	const [data, setData] = useState<QueryClub>();
	const [pageNumber, setPageNumber] = useState(0);
	const [search, setSearch] = useState("");

    const router = useRouter();
	
	let apiUrl = getClubQueryUrl(search, pageNumber, 10);


	const handlePageNumberChange = (page: number) => {
		if (!data) return;
		if (page < 0 || page > data.totalPages - 1) return;
		setPageNumber(page);
	}

	useEffect(() => {
		fetchClubs(apiUrl, setData);
	}, [pageNumber, search, apiUrl]);

	useEffect(() => {
		setPageNumber(0);
	}, [search]);

	if (!useIsLoggedIn || !data) return (
		<main className="flex min-h-screen flex-col sm:items-center p-4 gap-2">
			<h1 className='text-4xl'>Seurat</h1>
			<p className='text-md'>Kirjaudu sisään tarkastellaksesi ja liittyäksesi seuraan.</p>
		</main>
	)
}