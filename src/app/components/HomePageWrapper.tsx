import { CompetitionResponse } from "@/types/commonTypes";
import CurrentCompetitions from "./CurrentCompetitions";
import JoinClubTip from "./JoinClubTip";
import UpcomingCompetitions from "./UpcomingCompetitions";
import {
  getAllActiveCompetitions,
  getAllOwnCompetitions,
  getNextUpcomingCompetitions,
} from "../actions";
import { useEffect, useState } from "react";

type HomePageWrapperProps = {
  token: string;
};

export default function HomePageWrapper(props: HomePageWrapperProps) {
  const [futureCompetitions, setFutureCompetitions] = useState<
    CompetitionResponse[]
  >([]);
  const [currentOwnCompetitions, setCurrentOwnCompetitions] = useState<
    CompetitionResponse[]
  >([]);

  const token = props.token;

  async function getUpcoming() {
    try {
      getNextUpcomingCompetitions().then((response) => {
        if (response.status === 200) {
          if (response.body.content) {
            setFutureCompetitions(response.body.content);
          }
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnCompetitions(token: string) {
    if (!token) return;
    try {
      const response = await getAllActiveCompetitions(token);
      if (response.status === 200) {
        const ownCompetitionsData = response.body;
        let currentCompetitions: CompetitionResponse[] = [];
        let ownCompetitionIds: string[] = [];

        const response2 = await getAllOwnCompetitions(token);
        if (response2.status === 200) {
          const ownCompetitionsData = response2.body;
          if (ownCompetitionsData) {
            ownCompetitionsData.forEach((competition: CompetitionResponse) => {
              ownCompetitionIds.push(competition.competitionId);
            });
            console.log("ownCompetitionIds", ownCompetitionIds);
          }
        }

        if (ownCompetitionsData.content) {
          ownCompetitionsData.content.forEach(
            (competition: CompetitionResponse) => {
              if (!ownCompetitionIds.includes(competition.competitionId))
                return;
              const competitionStartDate = new Date(competition.startDate);
              const competitionEndDate = new Date(competition.endDate);
              const currentDate = new Date();

              if (
                competitionStartDate < currentDate &&
                competitionEndDate > currentDate
              ) {
                currentCompetitions.push(competition);
              }
            }
          );
        }
        currentCompetitions.sort((a, b) => {
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        setCurrentOwnCompetitions(currentCompetitions);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUpcoming();
    getOwnCompetitions(token);
  }, [token]);

  return (
    <main className="min-h-screen p-8">
      <JoinClubTip />
      <UpcomingCompetitions competitions={futureCompetitions} />
      <CurrentCompetitions competitions={currentOwnCompetitions} />
    </main>
  );
}
