import * as Q from "@/lib/APIConstants";
import fetchData from "@/api/get";
import TeamCard from "./TeamCard";
import TeamCreator from "./TeamCreator";

type TTeam = {
    clubName: string;
    competitionId: string;
    teamName: string;
    teamDisplayName: string;
    teamMembers?: TTeamMember[];
};

type TTeamMember = {
    userId: number;
    competitionId: string;
    teamName: string;
    legalname: string;
};

export default async function CompetitionPage({
    params,
}: {
    params: { slug: string };
}) {
    const competition = await fetchData(Q.getCompetitionByIdUrl(params.slug));
    const teams = await fetchData(
        Q.getCompetitionInfoQueryURL(params.slug, 0, 100)
    );
    return (
        <div className="grid p-5 my-5 justify-center md:p-20 gap-3 shadow-lg">
            <h1 className="text-3xl md:text-5xl">{competition.displayName}</h1>
            <p>
                Tyyppi:{" "}
                {competition.type === "rifle" ? "ilmakivääri" : "ilmapistooli"}
            </p>
            <span className="flex flex-row gap-5">
                <p>Alkaa: {competition.startDate}</p>
                <p>Päättyy: {competition.endDate}</p>
            </span>
            <TeamCreator competition={competition} />
            <div className="grid justify-start md:grid-cols-4 gap-10">
                {teams.content.map((team: TTeam) => (
                    <TeamCard
                        key={team.teamName}
                        team={team}
                        competition={competition}
                    />
                ))}
            </div>
        </div>
    );
}
