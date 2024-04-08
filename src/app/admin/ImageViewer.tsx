import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getFileDownloadUrl, getFileUploadUrl } from "@/lib/APIConstants";
import { ImageProof } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import Images from "./Images";


const ImageViewer = () => {
    const [images, setImages] = useState<string>();
    const [searchUserId, setSearchUserId] = useState<number>();
    const [searchCompetitionId, setSearchCompetitionId] = useState("");
    const [searchTeamName, setSearchTeamName] = useState("");

    const apiUrl = getFileDownloadUrl();

    const fetchImages = async () => {
        try {
            const res = await axios({
                method: "post",
                url: apiUrl,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userId: searchUserId,
                    competitionId: searchCompetitionId,
                    teamName: searchTeamName
                }
            });
            console.log(res);
            setImages(res.data);
        } catch (e: any) {
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
    
    useEffect(() => {
        fetchImages();
    }, [searchUserId, searchCompetitionId, searchTeamName])

    return (
        <div>
            <div className="flex flex-col mb-4 gap-2 py-2">
                <Input
                    id="searchuserid"
                    placeholder="käyttäjä id"
                    type="text"
                    onChange={(e) => setSearchUserId(parseInt(e.target.value))}
                    required={false}
                />
                <Input
                    id="searchcompetitionid"
                    placeholder="kilpailu id"
                    type="text"
                    onChange={(e) => setSearchCompetitionId(e.target.value)}
                    required={false}
                />
                <Input
                    id="searchteamname"
                    placeholder="joukkueen nimi"
                    type="text"
                    onChange={(e) => setSearchTeamName(e.target.value)}
                    required={false}
                />
            </div>
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
            <Images images={images} />
        </div>
    )
}

const getBinary = (image: string) => {
    const newIm = image.split("\n");
    const newIm2 = newIm.slice(4);
    const newIm3 = newIm2.join("\n");
    const buf = Buffer.from(image, 'base64');
    const buf2 = buf.toString('base64')
    console.log(buf2);
    const i = image.replace(/(..)/gim,'%$1')
    return i;
}

export default ImageViewer;