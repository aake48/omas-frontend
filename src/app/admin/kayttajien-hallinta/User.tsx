import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { getAdminDeleteUserUrl, getAdminDemoteUserUrl, getAdminPromoteUserUrl } from '@/lib/APIConstants';
import { AdminUser } from '@/types/commonTypes';
import { formatDate } from "@/lib/utils";
import useUserInfo from '@/lib/hooks/get-user.info';
import Dropdown from '@/components/ui/Dropdown';
import * as Q from "@/lib/APIConstants";

interface UserProps {
  user: AdminUser;
}

const User = ({ user }: UserProps) => {
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("text-black");
  const { token } = useUserInfo();
  const [selectedRole, setSelectedRole] = useState("");
  const [userRoles, setUserRoles] = useState<string[]>();

  const handleSubmit = async (data: FormData) => {
    let role = data.get("role");
    role = role === "admin" ? "ROLE_ADMIN" : role === "user" ? "ROLE_USER" : "";
    if (data.get("promote")) {
      try {
        const res = await axios({
          method: "post",
          url: getAdminPromoteUserUrl(),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: user.id,
            role: role,
          },
        });

        if (res.status === 200) {
          setMessage("Roolin lisääminen onnistui");
          setMessageStyle("text-black");
        } else {
          setMessage("Virhe roolin lisäämisessä");
          setMessageStyle("text-red-500");
        }
      } catch (error) {
        console.log(error);
        setMessage("Virhe roolin lisäämisessä");
        setMessageStyle("text-red-500");
      }
    } else {
      try {
        const res = await axios({
          method: "post",
          url: getAdminDemoteUserUrl(),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: user.id,
            role: role,
          },
        });


        if (res.status === 200) {
          setMessage("Roolin poistaminen onnistui");
          setMessageStyle("text-black");
        } else {
          setMessage("Virhe roolin poistamisessa");
          setMessageStyle("text-red-500");
        }
      } catch (error) {
        console.log(error);
        setMessage("Virhe roolin poistamisessa");
        setMessageStyle("text-red-500");
      }
    }
  const rolesData = await fetchRoles();
  setUserRoles(rolesData);
  }

  async function fetchRoles(){
    const rolesData = await axios({
      url: Q.getUserRoles(user.id),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const rolesArray = rolesData.data;
    return rolesArray;
  }

  useEffect(() => {
    if(token !== undefined){
      const fetchInitialRoles = async () => {
        const rolesData = await fetchRoles();
        setUserRoles(rolesData);
      };
      
      fetchInitialRoles();
    }
  }, [token]);

    const handleDeleteUser = async () => {
      try {
        const res = await axios({
          method: "delete",
          url: getAdminDeleteUserUrl(),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: user.id,
          },
        });

        if (res.status === 200) {
          setMessage("Käyttäjän poistaminen onnistui");
          setMessageStyle("text-black");
        } else {
          setMessage("Käyttäjän poistaminen epäonnistui");
          setMessageStyle("text-red-500");
        }
      } catch (error) {
        console.log(error);
        setMessage("Käyttäjän poistaminen epäonnistui");
        setMessageStyle("text-red-500");
      }
    };

    function handleSelectedRoleChange(role: string){
      setSelectedRole(role);
    }

    return (
      <div className="items-center gap-2 p-2 w-full border-solid border border-slate-300 rounded-lg shadow-md">
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-slate-100"
          onClick={handleDeleteUser}
        >
          Poista käyttäjä
        </Button>
        <div className='px-4 p-2 block rounded-lg'>
          <h1>{`id: ${user.id}`}</h1>
          <h1>{`käyttäjänimi: ${user.username}`}</h1>
          <h1>{`nimi: ${user.legalName}`}</h1>
          <h1>{`sähköposti: ${user.email}`}</h1>
          <h1>{`luontipäivä: ${formatDate(user.creationDate)}`}</h1>
          <h1>{`seura: ${user.partOfClub}`}</h1>
          <h1>{`Viimeisin kirjautuminen: ${formatDate(user.lastLogin)}`}</h1>
          <div className='flex flex-row gap-2'>
            <h1>roolit:</h1>
            {userRoles?.length !== 0 ? userRoles?.map((role: string, index: number) => (
              <p key={index}>{role === "ROLE_ADMIN" ? "admin" : role === "ROLE_USER" ? "user" : ""}</p>
            )) : (
              <p>ei rooleja</p>
            )}
          </div>
        </div>
        <div className='px-4 p-2'>
          <h1>poista tai lisää rooli</h1>
          <form
            action={handleSubmit}
            className='flex flex-row gap-2'
          >
            <Dropdown
              id="role"
              name="role"
              options={["admin", "user"
              ]}
              onChange={(e) => handleSelectedRoleChange(e.target.value)}
              selected={selectedRole}
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
          <p className={`${messageStyle} mt-3`}>{message}</p>
        </div>
      </div>
    )
  };

export default User;
