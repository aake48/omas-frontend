import { Button } from "@/components/ui/Button";
import { addClubURL } from "@/lib/APIConstants";
import useUserInfo from "@/lib/hooks/get-user.info";
import axios from "axios";
import { useState } from "react";
import AdminNavbar from "../AdminNavbar";

const CreateClub = () => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");
    const { token } = useUserInfo();

    const handleSubmit = async (data: FormData) => {
        const clubName = data.get("club");
        const clubPassword = data.get("passKey");

        try {
            const res = await axios({
                method: 'post',
                url: addClubURL,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    clubName: clubName,
                    passKey: clubPassword
                }
            });

            if (res.status === 200) {
                setMessage(`Seuran luominen onnistui: ${clubName}`);
                setMessageStyle("text-black");
            } else {
                setMessage("Virhe seuran luonnissa");
                setMessageStyle("text-red-500");
            }
        } catch (error) {
            console.log(error);
            setMessage("Virhe seuran luonnissa");
            setMessageStyle("text-red-500");
        }
    }

    return (
        <div className="p-4">
            <AdminNavbar />
            <div className="py-2">
                <p className="text-md">Tällä sivulla voit luoda uusia seuroja.</p>
            </div>
            <div className="flex items-center gap-2 mt-4 p-4 w-full border-solid border border-slate-300 rounded-lg shadow-md cursor-pointer">
                <div className='px-4 p-2'>
                    <form
                        action={handleSubmit}
                        className='flex flex-row gap-2'
                        >
                        <input
                            className='border rounded-lg p-2'
                            type="text"
                            name="club"
                            placeholder="seuran nimi"
                            />
                        <input
                            className='border rounded-lg p-2'
                            type="password"
                            name="passKey"
                            placeholder="seuran salasana"
                            />
                        <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-slate-100"
                            type="submit"
                            >
                            Luo seura
                        </Button>
                    </form>
                    <p className={`${messageStyle} mt-3`}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default CreateClub;