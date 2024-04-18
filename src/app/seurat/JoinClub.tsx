import { Button } from "@/components/ui/Button"
import { joinClubURL } from "@/lib/APIConstants";
import useUserInfo from "@/lib/hooks/get-user.info";
import { User } from "@/types/commonTypes";
import { useState } from "react";
import { joinClub } from "../actions";

interface JoinClubProps {
    id: string
}

const JoinClub = ({ id }: JoinClubProps) => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");
    const { token } = useUserInfo();

    const handleProfileUpdate = (club: string) => {
        const newUser: User = {
            ...JSON.parse(localStorage.getItem("userInfo")!),
            club: club
        };
        localStorage.setItem("userInfo", JSON.stringify(newUser));
    }

    const handleSubmit = async (data: FormData) => {
        const pass = data.get("pass")?.valueOf().toString() || null;
        try {
          const response = await joinClub( token, id, pass);
          if (response.status === 200) {
            try {
              handleProfileUpdate(id);
              setMessage(`Seuraan ${id} liittyminen onnistui.`);
              setMessageStyle("text-black");
            } catch (e: any) {
              throw new Error(`Virhe seuraan ${id} liittymisessä: ${e}`);
            }
          } else {
            throw new Error(`Virhe seuraan ${id} liittymisessä: ${response.message}`);
          }
        } catch (error) {
          console.log(error);
          setMessage(`Seuraan ${id} liittyminen epäonnistui. Tarkista, että seuran salasana on oikein ja yritä uudelleen. Salasanaa ei tarvitse syöttää, jos seura ei sitä vaadi.`);
          setMessageStyle("text-red-500");
        }
      }

    return (
        <div>
            <form
                action={handleSubmit}
                className='flex flex-col gap-2 max-w-[200px]'
            >
                {/* <input
                    className='border rounded-lg p-2'
                    type="text"
                    name="club"
                    placeholder="seuran nimi"
                /> */}
                <input
                    className='border rounded-lg p-2'
                    type="password"
                    name="pass"
                    placeholder="seuran salasana"
                />
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-100"
                    type="submit"
                >
                    Liity seuraan
                </Button>
            </form>
            <p className={`${messageStyle} mt-3`}>{message}</p>
        </div>
    )
}

export default JoinClub;