import JoinClub from "./JoinClub";
import ChangeClubKey from "./ChangeClubKey";
import { useEffect, useState } from "react";
import { ClubResponse, User } from "@/types/commonTypes";
import { formatDate } from "@/lib/utils";
import useUserInfo from "@/lib/hooks/get-user.info";

interface ClubProps {
    club: ClubResponse,
    clubAdminRoles: string[]
}

const Club = ({ club, clubAdminRoles }: ClubProps) => {
    const { token } = useUserInfo();

    return (
        <div className="shadow p-2">
            <div>
                <p className="text-xl">{club.nameNonId}</p>
                <p className="text-slate-700">Seura luotu: {formatDate(club.creationDate)}</p>
            </div>
            <div>
			    <JoinClub id={club.name} />
                { (clubAdminRoles && clubAdminRoles.includes(club.name)) ? <ChangeClubKey token={token} clubName={club.name} /> : null }
            </div>
        </div>
    )
}
  
export default Club;
