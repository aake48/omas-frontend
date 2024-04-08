import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getFileDownloadUrl, getFileUploadUrl } from "@/lib/APIConstants";
import { ImageProof } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import Images from "./Images";

const ImageViewer = () => {
    const [data, setData] = useState<ImageProof[]>();
    const [message, setMessage] = useState("");

    const apiUrl = getFileDownloadUrl();

    const fetchImages = async (form: FormData) => {
        try {
            const userId = form.get("userId")?.toString();
            const competitionId = form.get("competitionId");
            const teamName = form.get("teamName");
            const fileName = form.get("fileName") || null;
    
            const res = await axios(apiUrl, {
                method: "post",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userId: parseInt(userId!),
                    competitionId: competitionId,
                    teamName: teamName,
                    fileName: fileName
                }
            });

            console.log(res);
            // const formData = await res.formData();
            // const images: ImageProof[] = [];

            // for (const entry of formData.entries()) {
            //     images.push({
            //         name: entry[0],
            //         data: entry[1]
            //     })
            // }

            setMessage("");
            setData(res.data);
        } catch (e: any) {
            setMessage("Virhe kuvien haussa. Tarkista kentät.");
            console.error(e);
        }
    }

    const handleUploadImage = async (form: FormData) => {
        const compId = "kesan_ampujaiset";
        const formData = form;

        formData.append("competitionId", compId);

        try {
            const res = await axios({
                method: "post",
                url: getFileUploadUrl(),
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            console.log(res);
        } catch (e: any) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="p-4">
                <p className="text-md">Kuvien hakeminen tapahtuu käyttäjän ja kilpailun id:llä sekä joukkueen nimellä (tällä saa haettua kaikki kuvat).</p>
                <p className="text-md">Yhden kuvan hakeminen tapahtuu lisäämällä muiden tietojen lisäksi kuvatiedoston nimi (tiedostopääte mukaan lukien) viimeiseen kenttään.</p>
            </div>
            <div className="flex flex-col mb-4 gap-2 py-2">
                <form
                    action={fetchImages}
                    className='flex flex-col gap-2 max-w-sm'
                >
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="userId"
                        placeholder="käyttäjän id"
                    />
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="competitionId"
                        placeholder="kilpailun id"
                    />
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="teamName"
                        placeholder="joukkueen nimi"
                    />
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="fileName"
                        placeholder="tiedoston nimi"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Hae kuvat
                    </Button>
                </form>
                <p>{message}</p>
                <form
                    action={handleUploadImage}
                    className='flex flex-row gap-2'
                >
                    <input
                        className='border rounded-lg p-2'
                        type="file"
                        name="file"
                        placeholder="kuva"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Lähetä
                    </Button>
                </form>
                <Images data={data} />
            </div>
        </div>
    )
}

export default ImageViewer;