'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useIsLoggedIn from '@/lib/hooks/is-logged-in';
import { getClubQueryUrl } from '@/lib/APIConstants';
import { ClubResponse, QueryClub } from '@/types/commonTypes';
import Paginator from '../components/Paginator';
import JoinClubTip from '../components/JoinClubTip';
import Input from '@/components/ui/Input';
import Club from './Club';
import { Button } from '@/components/ui/Button';

const ClubsView = () => {
  const isLoggedIn = useIsLoggedIn();

  const [data, setData] = useState<QueryClub>();
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [clubAdminRoles, setClubAdminRoles] = useState<string[]>([]);
  const [joinedClub, setJoinedClub] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAllClubs, setShowAllClubs] = useState(false);

  const apiUrl = getClubQueryUrl(search, pageNumber, 10);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchClubs = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(apiUrl, {
          headers: { 'Content-Type': 'application/json' },
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [pageNumber, search, apiUrl, isLoggedIn]);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
      if (storedUser?.club) setJoinedClub(storedUser.club);

      if (storedUser?.roles) {
        const roles: string[] = storedUser.roles.replace(/[[\]]/g, '').split(',');
        const adminRoles = roles
          .filter((role) => role.endsWith('/admin'))
          .map((role) => role.replace('/admin', '').trim());

        setClubAdminRoles(adminRoles);
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
    }
  }, []);

  useEffect(() => {
    setPageNumber(0);
  }, [search]);

  const handlePageNumberChange = (page: number) => {
    if (!data) return;
    if (page < 0 || page >= data.totalPages) return;
    setPageNumber(page);
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 gap-2">
        <h1 className="text-4xl">Seurat</h1>
        <p className="text-md">Kirjaudu sisään tarkastellaksesi ja liittyäksesi seuraan.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 gap-2">
        <h1 className="text-4xl">Seurat</h1>
        <p className="text-md">Ladataan seuroja...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 gap-2">
        <h1 className="text-4xl">Seurat</h1>
        <p className="text-md">Virhe seurojen haussa.</p>
      </main>
    );
  }

  const visibleClubs = joinedClub && !showAllClubs
    ? data.content.filter(club => club.name === joinedClub)
    : data.content;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 gap-10">
      <h1 className="text-4xl">Seurat</h1>

      <JoinClubTip joinedClub={joinedClub} />

      <Input
        id="search"
        placeholder="Hae seuraa"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />

      <Paginator
        pageNumber={pageNumber}
        totalPages={data.totalPages}
        handlePageNumberChange={handlePageNumberChange}
      />

      <div className="flex flex-col gap-2 w-full items-center">
        {visibleClubs.map((club: ClubResponse) => (
          <Club
            key={club.name}
            club={club}
            joinedClub={joinedClub}
            setJoinedClub={setJoinedClub}
            clubAdminRoles={clubAdminRoles}
          />
        ))}

        {joinedClub && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setShowAllClubs(prev => !prev)}
          >
            {showAllClubs ? "Piilota muut seurat" : "Näytä muut seurat"}
          </Button>
        )}
      </div>
    </main>
  );
};

export default ClubsView;
