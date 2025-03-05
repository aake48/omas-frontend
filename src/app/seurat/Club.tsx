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

    return (
        <div className="shadow p-2">
            <div>
                <p className="text-xl">{club.nameNonId}</p>
                <p className="text-slate-700">Seura luotu: {formatDate(club.creationDate)}</p>
            </div>
            <div>
                {/* Pass `joinedClub` state to JoinClub */}
                <JoinClub id={club.name} joinedClub={joinedClub} setJoinedClub={setJoinedClub} />

                {/* Display ChangeClubKey only for club admins */}
                {clubAdminRoles.includes(club.name) && <ChangeClubKey token={token} clubName={club.name} />}
            </div>
        </div>
    );
};
  
export default Club;
