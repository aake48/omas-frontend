import { StringSchema } from "yup";
import JoinClub from "./JoinClub";
import { formatDate } from "@/lib/utils";

interface ClubProps {
  displayName: string;
  id: string;
  creationDate: string;
}

const Club = ({ displayName, id, creationDate }: ClubProps) => {
  return (
    <div className="shadow p-2">
      <div>
        <p className="text-xl">{displayName}</p>
        <p>{formatDate(creationDate)}</p>
      </div>
      <div>
        <JoinClub clubName={id} />
      </div>
    </div>
  );
};

export default Club;
