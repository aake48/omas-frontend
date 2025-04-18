import JoinClub from "./JoinClub";
import ChangeClubKey from "./ChangeClubKey";
import { ClubResponse} from "@/types/commonTypes";
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
        <div className="shadow p-4 rounded text-center">
            <div>
                <p className="text-xl font-semibold">{club.nameNonId}</p>
                <p className="text-slate-700">Seura luotu: {formatDate(club.creationDate)}</p>
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
                <JoinClub
                    id={club.name}
                    joinedClub={joinedClub}
                    setJoinedClub={setJoinedClub}
                />
                {clubAdminRoles.includes(club.name) && (
                    <ChangeClubKey token={token} clubName={club.name} />
                )}
            </div>
        </div>
    );
};
  
export default Club;
