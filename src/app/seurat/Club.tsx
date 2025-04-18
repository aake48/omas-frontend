import JoinClub from "./JoinClub";
import ChangeClubKey from "./ChangeClubKey";
import { useEffect, useState } from "react";
import { ClubResponse, User } from "@/types/commonTypes";
import { formatDate } from "@/lib/utils";
import useUserInfo from "@/lib/hooks/get-user.info";

interface ClubProps {
    club: ClubResponse;
    clubAdminRoles: string[];
    joinedClub: string | null;
    setJoinedClub: (club: string | null) => void;
}

const Club = ({ club, clubAdminRoles, joinedClub, setJoinedClub }: ClubProps) => {
    const { token } = useUserInfo();
    const isUserInThisClub = joinedClub === club.name;

    return (
        <div className={`shadow p-4 w-full rounded-md border ${isUserInThisClub ? "bg-slate-200" : ""}`}>
            <div className="text-center">
                <p className="text-xl font-semibold">{club.nameNonId}</p>
                <p className="text-slate-700">Seura luotu: {formatDate(club.creationDate)}</p>
            </div>
            <div className="mt-4 flex flex-col items-center">
                {(joinedClub === null || isUserInThisClub) && (
                    <div className={`mt-2 w-full ${isUserInThisClub ? "bg-white p-4 rounded-md" : ""}`}>
                        <JoinClub id={club.name} joinedClub={joinedClub} setJoinedClub={setJoinedClub} />
                    </div>
                )}
                {clubAdminRoles.includes(club.name) && (
                    <div className={`mt-2 w-full ${isUserInThisClub ? "bg-white p-4 rounded-md" : ""}`}>
                        <ChangeClubKey token={token} clubName={club.name} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Club;