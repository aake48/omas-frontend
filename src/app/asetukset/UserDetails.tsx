import { Button } from '@/components/ui/Button';
import { User } from '@/types/commonTypes';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

interface UserProps {
    user: User,
    token: string
}

const UserDetails = ({ user, token }: UserProps) => {

    return (
        <div>
            <h1>{`Käyttäjänimi: ${user.username}`}</h1>
            <h1>{`Nimi: ${user.legalName}`}</h1>
            <h1>{`Sähköposti: ${user.email}`}</h1>
            <ChangeEmail token={token} />
            <h1>Salasana: ******</h1>
            <ChangePassword token={token} />
            <h1>{(user.club) ? `seura: ${user.club}`: `seura: et ole seurassa`}</h1>
            <h1>{`Luontipäivä: ${user.creationDate}`}</h1>
        </div>
    )
}

export default UserDetails;
