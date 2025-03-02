"use client";

import {
  ClubResponse,
    CompetitionResponse,
    TTeam,
    UsersCompetition,
} from "@/types/commonTypes";
import TeamCard from "./TeamCard";
import useUserInfo from "@/lib/hooks/get-user.info";
import { useEffect, useState } from "react";
import * as Q from "@/lib/APIConstants";
import { resolve } from "path";

async function getUserCompetitions(token: any) {
    try {
      const response = await fetch(Q.getUserCompetitions(), {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

async function getUserClub(token: any) {
    try {
      const response = await fetch(Q.getUserClub(), {
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      });
      console.log(response)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
}

export default function CardContainer({
    teams,
    competition,
    slug,
}: {
    teams: { content: [TTeam] };
    competition: CompetitionResponse;
    slug: string;
}) {
    const [competitions, setCompetitions] = useState<UsersCompetition[]>();
    const { token } = useUserInfo();
    const [memberOf, setIsMemberOf] = useState<string | null>(null);
    const user = useUserInfo();
    const [isPartOfClub, setIsPartOfClub] = useState(false);
    const [usersClub, setUsersClub] = useState<ClubResponse>();
    useEffect(() => {
        if (user.userInfo != null) {
            setIsPartOfClub(user.userInfo.club != null);
        }
    }, [user]);

  // Fetch user's competitions
  useEffect(() => {
    const fetchCompetitions = async () => {
      if (token == null || !isPartOfClub) {
        return;
      }
      const clubData = await getUserClub(token);
      console.log(clubData);
      const data = await getUserCompetitions(token);
      if (data) {
        setCompetitions(data);
      }
      if(clubData){
        setUsersClub(clubData)
      }
    };

    fetchCompetitions();
  }, [token, slug, isPartOfClub]);


    // Check if user is member of any team
    useEffect(() => {
        if (competitions != null) {
            const memberOf = competitions.find(
                (comp) => comp.competitionId === competition.competitionId
            );
            memberOf ? setIsMemberOf(memberOf.teamName) : setIsMemberOf(null);
        }
    }, [competitions, competition]);

    return (
        <div className="grid my-5 justify-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {teams.content.map((team: TTeam) => (
                <TeamCard setIsMember={setIsMemberOf} key={team.teamName} team={team} memberOf={memberOf} clubName={usersClub?.name || ""} />
            ))}
        </div>
    );
}
