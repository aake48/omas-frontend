import { Button } from "@/components/ui/Button";
import { joinClubURL, leaveClubURL } from "@/lib/APIConstants";
import { User } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import Notification from "@/components/component/Notification";

interface JoinClubProps {
  id: string;
  joinedClub: string | null;
  setJoinedClub: (club: string | null) => void;
}

const JoinClub = ({ id, joinedClub, setJoinedClub }: JoinClubProps) => {
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("text-black");
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [notification, setNotification] = useState<null | { id: number; message: string; type: "success" | "error" }>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    if (storedUser?.club === id) {
      setJoinedClub(id);
    }
  }, []);

  useEffect(() => {
    if (!message || messageStyle.includes("text-red")) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, messageStyle]);

  const handleProfileUpdate = (club: string | null) => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    const newUser: User = {
      ...storedUser,
      club: club,
    };
    localStorage.setItem("userInfo", JSON.stringify(newUser));
    setJoinedClub(club);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (joinedClub) return;

    const formData = new FormData(e.currentTarget);
    const pass = formData.get("pass") || null;

    try {
      const res = await axios.post(
        joinClubURL,
        { clubName: id, passKey: pass },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        handleProfileUpdate(id);
        setNotification({
          id: Date.now(),
          message: `Seuraan ${id} liittyminen onnistui.`,
          type: "success",
        });
        setMessage("");
      } else {
        setMessage(`Seuraan ${id} liittyminen epäonnistui. Tarkista, että seuran nimi sekä salasana ovat oikein ja yritä uudelleen. Salasanaa ei tarvitse syöttää, jos seura ei sitä vaadi.`);
        setMessageStyle("text-red-500");
      }
    } catch (error) {
      console.log(error);
      setMessage(`Seuraan ${id} liittyminen epäonnistui. Tarkista, että seuran nimi sekä salasana ovat oikein ja yritä uudelleen. Salasanaa ei tarvitse syöttää, jos seura ei sitä vaadi.`);
      setMessageStyle("text-red-500");
    }
  };

  const handleLeaveClub = () => {
    setMessage("");
    setShowConfirmLeave(true);
  };

  const confirmLeaveClub = async (confirm: boolean) => {
    if (!confirm) {
      setShowConfirmLeave(false);
      return;
    }

    try {
      const res = await axios.post(
        leaveClubURL,
        {},
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        handleProfileUpdate(null);
        setNotification({
          id: Date.now(),
          message: `Olet poistunut seurasta ${id}.`,
          type: "success",
        });
        setMessage("");
      } else {
        setMessage(`Seurasta poistuminen epäonnistui.`);
        setMessageStyle("text-red-500");
      }
    } catch (error) {
      console.log(error);
      setMessage(`Seurasta poistuminen epäonnistui.`);
      setMessageStyle("text-red-500");
    }
    setShowConfirmLeave(false);
  };

  return (
    <>
      {notification && (
        <Notification key={notification.id} message={notification.message} type={notification.type} />
      )}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-center">
          {joinedClub === id ? (
            <div>
              <Button variant="outline" size="sm" className="hover:bg-red-200" onClick={handleLeaveClub}>
                Poistu seurasta
              </Button>
              {showConfirmLeave && (
                <div className="mt-2 p-2 border rounded">
                  <p>Oletko varma, että haluat poistua seurasta?</p>
                  <div className="flex gap-2 mt-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => confirmLeaveClub(true)}>
                      Kyllä
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => confirmLeaveClub(false)}>
                      Ei
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-[200px] items-center">
                <input className="border rounded-lg p-2 w-full" type="password" name="pass" placeholder="seuran salasana" />
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover:bg-slate-100 mt-2 ${joinedClub ? "opacity-50 cursor-not-allowed" : ""}`}
                  type="submit"
                  disabled={Boolean(joinedClub)}
                >
                  Liity seuraan
                </Button>
              </form>
              <p className={`${messageStyle} mt-3`}>{message}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JoinClub;
