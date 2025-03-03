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
    const [userClubName, setUserClubName] = useState<string | null>(null);
    useEffect(() => {
        if (user.userInfo != null) {
            setUserClubName(user.userInfo.club);
        }
    }, [user]);

  // Fetch user's competitions
  useEffect(() => {
    const fetchCompetitions = async () => {
      if (token == null || !userClubName) {
        return;
      }
      const data = await getUserCompetitions(token);
      if (data) {
        setCompetitions(data);
      }
    };

    fetchCompetitions();
  }, [token, slug, userClubName]); 


    // Check if user is member of any team
    useEffect(() => {
        if (competitions != null) {
            const usersTeam = competitions.find(
                (comp) => comp.competitionId === competition.competitionId
            );
            usersTeam ? setIsMemberOf(usersTeam.teamName) : setIsMemberOf(null);
        }
    }, [competitions, competition]);

    return (
        <div className="grid my-5 justify-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {teams.content.map((team: TTeam) => (
                <TeamCard 
                  setIsMember={setIsMemberOf} 
                  key={team.teamName} 
                  team={team} 
                  memberOf={memberOf} 
                  userClubName={userClubName} 
                  token={token}
                  userLegalName={user?.userInfo?.legalName}
                  userId={user?.userInfo?.userId}
                />
            ))}
        </div>
    );
}
