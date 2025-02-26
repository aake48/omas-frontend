import * as Q from "@/lib/APIConstants";
import fetchData from "@/api/get";
import TeamCreator from "./TeamCreator";
import CardContainer from "./CardContainer";
import { formatDate } from "@/lib/utils";

export type paramsType = Promise<{slug: string}>

export default async function CompetitionPage({
  params,
}: {
  params: paramsType;
}) {
  const {slug} = await params;
  const competition = await fetchData(Q.getCompetitionByIdUrl(slug));
  const teams = await fetchData(
    Q.getCompetitionInfoQueryURL(slug, 0, 100)
  );
  return (
    <div className="grid p-5 my-5 justify-center md:p-10 gap-3 shadow-lg">
      <h1 className="text-3xl md:text-5xl">{competition.displayName}</h1>
      <p>
        Tyyppi: {competition.type === "rifle" ? "ilmakivääri" : "ilmapistooli"}
      </p>
      <span className="flex flex-row gap-5">
        <p>Alkaa: {formatDate(competition.startDate)}</p>
        <p>Päättyy: {formatDate(competition.endDate)}</p>
      </span>
      <TeamCreator competition={competition} />
      <CardContainer
        slug={slug}
        teams={teams}
        competition={competition}
      />
    </div>
  );
}
