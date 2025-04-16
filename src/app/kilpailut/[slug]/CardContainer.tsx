"use client";

import {
  ClubResponse,
  CompetitionResponse,
  TTeam,
  UsersCompetition,
} from "@/types/commonTypes";
import TeamCard from "./TeamCard";
import useUserInfo from "@/lib/hooks/get-user.info";
import { ChangeEvent, useEffect, useState } from "react";
import * as Q from "@/lib/APIConstants";
import { resolve } from "path";
import Input from "@/components/ui/Input";
import { usePathname } from "next/navigation";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import { Button } from "@/components/ui/Button";
import fetchData from "@/api/get";
import SeriesDropdown from "@/components/ui/SeriesDropdown";
import Notification from "@/components/component/Notification";

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
  const [search, setSearch] = useState("");
  const [currentTeams, setCurrentTeams] = useState<TTeam[]>(teams.content);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamDisplayShort, setTeamDisplayShort] = useState("");
  const [info, setInfo] = useState("");
  const [isMember, setIsMember] = useState("");
  const pathName = usePathname();
  const isLoggedIn = useIsLoggedIn();
  const [isPartOfClub, setIsPartOfClub] = useState(false);
  const [seriesFilter, setSeriesFilter] = useState("");
  const [createTeamSeries, setCreateTeamSeries] = useState("");
  const [isTeamCreatorHidden, setIsTeamCreatorHidden] = useState(true);
  const [message, setMessage] = useState<{ 'message': string, type: "success" | "error", id: number } | null>(null);

  useEffect(() => {
    if (user.userInfo != undefined) {
      setIsPartOfClub(user.userInfo.club != null);
    }
  }, [user]);

  async function handleSubmit(teamName: string, teamDisplayShort: string, teamSeries: string) {
    const response = await fetch(`${pathName}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        teamName: teamName,
        competitionName: competition.competitionId,
        teamDisplayShort: teamDisplayShort,
        teamSeries: teamSeries,
      }),
    });
    console.log(response);

    const data = await response.json();
    setInfo(data.message);
    const teamsData = await fetchData(
      Q.getCompetitionInfoQueryURL(slug, 0, 100)
    )
    if (response.status === 200) {
      setMessage({ message: "Joukkueen " + teamName + " luonti onnistui", type: "success", id: Date.now() });
    }
    setCurrentTeams(teamsData.content);
  }

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

  useEffect(() => {
    if (user.userInfo != undefined) {
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
      usersTeam ? setIsMemberOf(usersTeam.teamName) : setIsMemberOf("");
    }
    else {
      setIsMemberOf("");
    }
  }, [competitions, competition]);
  
  //Search for teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await fetchData(
          Q.getCompetitionInfoQueryURL(slug, 0, 0, seriesFilter, search)
        );
        if (teams) {
          setCurrentTeams(teams.content);
        }
      } catch (e: any) {
        console.error(e);
      }
    }
    fetchTeams();
  }, [search, seriesFilter]);

  const handleSeriesFilterChange = (series: string) => {
    if (series !== "Kaikki sarjat") {
      setSeriesFilter(series);
    }
    else {
      setSeriesFilter("");
    }
  }

  const handleCreateTeamSeriesChange = (series: string) => {
    if (series !== "Valitse joukkueen sarja") {
      setCreateTeamSeries(series);
    }
    else {
      setCreateTeamSeries("");
    }
  }

  const notification = <div>
    {message && (
      <Notification
        key={message!.id}
        message={message!.message}
        type={"success"}
      />
    )}
  </div>
  const teamCreator = isTeamCreatorHidden ?
    <>
      <Button
        variant="outline"
        className="hover:bg-slate-100 mx-2 border-slate-500 border-2"
        onClick={() => setIsTeamCreatorHidden(false)}
        disabled={isMember !== ""}
      >
        Luo joukkue
      </Button>
    </>
    :
    <>
      <Input
        id={"search"}
        placeholder={"Joukkueen nimi"}
        required={false}
        type={"text"}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTeamName(e.target.value)
        }
        value={newTeamName}
        disabled={isMember !== ""}
      ></Input>
      <Input
        id={"search"}
        placeholder={"Joukkueen lyhenne"}
        required={false}
        type={"text"}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTeamDisplayShort(e.target.value)
        }
        value={teamDisplayShort}
        disabled={isMember !== ""}
      ></Input>
      <SeriesDropdown
        options={["Valitse joukkueen sarja"].concat(competition.competitionSeries)}
        selected={createTeamSeries}
        onChange={(e) => handleCreateTeamSeriesChange(e.target.value)}
        required={false}
      />
      <Button
        variant="outline"
        className="hover:bg-slate-100 mx-2 border-slate-500 border-2"
        onClick={() => handleSubmit(newTeamName, teamDisplayShort, createTeamSeries)}
        disabled={isMember !== ""}
      >
        Luo joukkue
      </Button>
      <p className="whitespace-pre text-red-500 text-xl">{info || null}</p>
    </>;

  const searchBar =
    <div className="col-span-full mb-4">
      <Input
        id="search"
        placeholder="Hae joukkuetta"
        required={false}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SeriesDropdown
        id={"seriesDropdown"}
        options={["Kaikki sarjat"].concat(competition.competitionSeries)}
        selected={seriesFilter}
        onChange={(e) => handleSeriesFilterChange(e.target.value)}
        required={false}
        leftGap={"ml-4"}
      />
    </div>

  const userClubTeamCards =
    <div className="my-5">
      <h2 className="text-xl font-semibold text-left">Seurasi joukkueet</h2>
      <div className="grid my-5 justify-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {currentTeams.length > 0 ? currentTeams.map((team: TTeam) => (
          user.userInfo?.club !== undefined && team.clubName === user.userInfo.club ?
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
            : null
        )) : (
          <p>Joukkueita ei löytynyt</p>
        )}
      </div>
    </div>

  const teamCards =
    <div>
      <h2 className="text-xl font-semibold text-left">Muiden seurojen joukkueet</h2>
      <div className="grid my-5 justify-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {currentTeams.length > 0 ? currentTeams.map((team: TTeam) => (
          !isLoggedIn ?
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
            : user.userInfo?.club !== undefined && team.clubName !== user.userInfo.club ?
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
              : null
        )) : (
          <p>Joukkueita ei löytynyt</p>
        )}
      </div>
    </div>

  if (isLoggedIn && memberOf === null) {
    return <p>Ladataan...</p>;
  }

  return (
    <>
      {/*message && (
        <Notification
          key={message.id}
          message={message.message}
          type={message.type}
        />
      )*/}
      
      {(isLoggedIn && isPartOfClub) ? (
        <>
          {notification}
          {teamCreator}
          {searchBar}
          {userClubTeamCards}
          {teamCards}
        </>
      ) : (
        <>
          {searchBar}
          {teamCards}
        </>
      )}
    </>
  );
}