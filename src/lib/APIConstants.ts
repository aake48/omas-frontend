export const baseURL: string = "https://localhost:8080";

export const loginURL: string = baseURL + "/api/login";

export const registrationURL: string = baseURL + "/api/reg";

const compQuery: string = "/api/competition/query";

const comp: string = "/api/competition";

const compResultQuery = "/api/competition/result";

const clubQuery: string = "/api/club/query";

export const getCompetitionsQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
): string => {
  return `${baseURL}${compQuery}?search=${search}&page=${page}&size=${size}`;
};

export const getCompetitionByNameUrl = (name: string) => {
  return `${baseURL}${compResultQuery}/${name}`;
};

export const getCompetitionByIdUrl = (id: string) => {
  return `${baseURL}${comp}/${id}`;
};

export const getClubQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
): string => {
  return `${baseURL}${clubQuery}?search=${search}&page=${page}&size=${size}`;
};
/**
 * älä käytä tälläistä, käytä getClubQueryUrl()
 */
export const getAllClubsURL: string = baseURL + "/api/club/all";

/**
 * älä käytä tälläistä, käytä getCompetitionsQueryUrl()
 */
export const getAllCompetitionsURl: string = baseURL + "/api/competition/all";

export const addCompetitionURL: string = baseURL + "/api/auth/competition/new";

export const addClubURL: string = baseURL + "/api/auth/club/new";

export const joinClubURL: string = baseURL + "/api/auth/club/join";

export const addTeamToCompetitionURL: string =
  baseURL + "/api/competition/team/new";

export const addTeamMemberURL: string =
  baseURL + "/api/competition/team/member/add";

export const addScore: string =
  baseURL + "/api/competition/team/member/score/add";

export const addScoreSum: string =
  baseURL + "/api/competition/team/member/score/add/sum";

export const getTeamsByCompetitionIdURL = (id: string) => {
  return `${baseURL}${comp}/teams/${id}`;
};

export const getTeamMembersURL = (teamName: string, competitionId: string) => {
  return `${baseURL}${comp}/team?team=${teamName}&competition=${competitionId}`;
};
