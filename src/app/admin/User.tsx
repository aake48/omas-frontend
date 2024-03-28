import { useState } from 'react';
import { User as UserType } from '@/types/commonTypes';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { getAdminDemoteUserUrl, getAdminPromoteUserUrl } from '@/lib/APIConstants';

interface UserProps {
    user: UserType
}

const User = ({ user }: UserProps) => {
    const [message, setMessage] = useState("");
    // const [club, setClub] = useState("ei seuraa");

    // if (user.club !== null) {
    //     setClub(user.club);
    // }
    
    if (user.username === "admin") return;

    const handleSubmit = async (data: FormData) => {
        const role = data.get("role");
        if (data.get("promote")) {
            try {
                const res = await axios.post(getAdminPromoteUserUrl(), {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        userId: user.id,
                        role: role,
                    }
                });

                if (res.status !== 200) {
                    setMessage("roolin lisääminen onnistui");
                } else {
                    setMessage("Virhe roolin lisäämisessä");
                }
            } catch (error) {
                console.log(error);
                setMessage("Virhe roolin lisäämisessä");
            }
        } else {
            try {
                const res = await axios.post(getAdminDemoteUserUrl(), {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        userId: user.id,
                        role: role,
                    }
                });

                if (res.status !== 200) {
                    setMessage("roolin poistamisessa onnistui");
                } else {
                    setMessage("Virhe roolin poistamisessa");
                }
            } catch (error) {
                console.log(error);
                setMessage("Virhe roolin poistamisessa");
            }
        }
    }

    return (
        <div className="items-center gap-2 w-full border-solid border border-slate-300 rounded-lg shadow-md cursor-pointer">
            <div className='px-4 p-2 block rounded-lg'>
                <h1>{`id: ${user.id}`}</h1>
                <h1>{`käyttäjänimi: ${user.username}`}</h1>
                <h1>{`nimi: ${user.legalname}`}</h1>
                <h1>{`sähköposti: ${user.email}`}</h1>
                <h1>{`luontipäivä: ${user.creationDate}`}</h1>
                <h1>{`seura: ${user.partOfClub}`}</h1>
                <h1>roolit:</h1>
                <div className='flex flex-row gap-2'>
                    {/* {user.roles.length !== 0 && user.roles.map((role, index) => (
                        <p key={index}>{role}</p>
                    ))} */}
                </div>
            </div>
            <div className='px-4 p-2'>
                <h1>poista tai lisää rooli</h1>
                <form
                    action={handleSubmit}
                    className='flex flex-row gap-2'
                >
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="role"
                        placeholder="rooli"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        value="promote"
                        name="promote"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Lisää
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        value="demote"
                        name="demote"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Poista
                    </Button>
                </form>
                <h1>{message}</h1>
            </div>
        </div>
    )
}

export default User;