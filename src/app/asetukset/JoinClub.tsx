import { Button } from "@/components/ui/Button"
import { joinClubURL } from "@/lib/APIConstants";
import axios from "axios";
import { useState } from "react";

const JoinClub = () => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");

    const token = localStorage.getItem("token");

    const handleSubmit = async (data: FormData) => {
        const club = data.get("club");
        try {
            const res = await axios({
                method: 'post',
                url: joinClubURL,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    clubName: club
                }
            });

            console.log(res);

            if (res.status === 200) {
                setMessage(`Seuraan ${club} liittyminen onnistui`);
                setMessageStyle("text-black");
            } else {
                setMessage(`Seuraan ${club} liittyminen epäonnistui`);
                setMessageStyle("text-red-500");
            }
        } catch (error) {
            console.log(error);
            setMessage(`Seuraan ${club} liittyminen epäonnistui`);
            setMessageStyle("text-red-500");
        }
    
    }

    return (
        <div className="mt-2">
                <h1>Liity seuraan</h1>
                <form
                    action={handleSubmit}
                    className='flex flex-col gap-2 max-w-[200px]'
                >
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="club"
                        placeholder="seuran nimi"
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