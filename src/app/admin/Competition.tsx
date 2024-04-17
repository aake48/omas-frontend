import { CompetitionResponse, CompetitionTeamsResponse } from "@/types/commonTypes";
import Teams from "./Teams";
import { useEffect, useState } from "react";
import { getCompetitionTeamsQueryUrl } from "@/lib/APIConstants";
import axios from "axios";

interface CompetitionProps {
    comp: CompetitionResponse
}

const Competition = ({ comp }: CompetitionProps) => {
    const [data, setData] = useState<CompetitionTeamsResponse>();
	const [pageNumber, setPageNumber] = useState(0);

    let typeFinnish = "";
    switch (comp.type) {
        case "rifle":
            typeFinnish = "ilmakivääri";
            break;
        case "pistol":
            typeFinnish = "ilmapistooli";
            break;
        default:
            typeFinnish = "";
    }

    const apiUrl = getCompetitionTeamsQueryUrl("", pageNumber, 5)

    const fetchCompetitions = async () => {
		try {
			const res = await axios.get(apiUrl, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setData(res.data);
		} catch (e: any) {
			console.error(e);
		}
	}
    useEffect(() => {
        fetchCompetitions();
    }, [pageNumber])

    return (
        <div>
            <div className="flex flex-col shadow-md rounded-lg border p-4 hover:bg-slate-100 cursor-pointer">
                <h1 className="text-xl">{comp.displayName}</h1>
                <p>Alkamispäivä: {comp.startDate}</p>
                <p>Loppumispäivä: {comp.endDate}</p>
                <p>Tyyppi: {typeFinnish}</p>
                <p>Luontipäivä: {comp.creationDate}</p>
            </div>
            <div hidden={false} className="flex flex-col ">
                {}
            </div>
        </div>
    )
}

export default Competition;