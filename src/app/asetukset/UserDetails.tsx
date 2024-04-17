import { User } from "@/types/commonTypes";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { formatDate } from "@/lib/utils";

interface UserDetailsProps {
  user: User;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div>
      <h1>{`Käyttäjänimi: ${user.username}`}</h1>
      <h1>{`Nimi: ${user.legalName}`}</h1>
      <h1>{`Sähköposti: ${user.email}`}</h1>
      <ChangeEmail />
      <h1>Salasana: ******</h1>
      <ChangePassword />
      <h1>{user.club ? `seura: ${user.club}` : `seura: et ole seurassa`}</h1>
      <h1>{`Luontipäivä: ${formatDate(user.creationDate)}`}</h1>
    </div>
  );
};

export default UserDetails;
