export const baseURL: string = process.env.NEXT_PUBLIC_API_URL!;

export const loginURL: string = baseURL + "api/login";

export const registrationURL: string = baseURL + "api/reg";

const compQuery: string = "api/competition/query";

const comp: string = "api/competition";

const compResultQuery = "api/competition/result";

const clubQuery: string = "api/club/query";

export const getCompetitionsQueryUrl = (
  search: string = "",
  page: number,
  series: string = "",
  size: number = 10,
): string => {
  return `${baseURL}${compQuery}?search=${search}&page=${page}&size=${size}&series=${series}`;
};

export const getCompetitionsByYearQueryUrl = (
  search: string = "",
  year: number,
  page: number,
  size: number = 10
): string => {
  return `${baseURL}${compQuery}?search=${search}&year=${year}&page=${page}&size=${size}`;
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
export const getAllClubsURL: string = baseURL + "api/club/all";

/**
 * älä käytä tälläistä, käytä getCompetitionsQueryUrl()
 */
export const getAllCompetitionsURl: string = baseURL + "api/competition/all";

export const addCompetitionURL: string = baseURL + "api/auth/competition/new";

export const addClubURL: string = baseURL + "api/auth/club/new";

export const joinClubURL: string = baseURL + "api/auth/club/join";

export const leaveClubURL: string = baseURL + "api/auth/club/leave";

export const changeClubKeyURL: string = baseURL + "api/club/setPasskey";

export const getClubByIdURL = (id: string) => {
  return `${baseURL}api/club/${id}`;
};

export const getCompetitionTeamsQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
): string => {
  return `${baseURL}api/competition/teams?search=${search}&page=${page}&size=${size}`;
};

export const addTeamToCompetitionURL: string =
  baseURL + "api/competition/team/new";

export const addTeamMemberURL: string =
  baseURL + "api/competition/team/member/add";

export const removeTeamMemberURL: string =
  baseURL + "api/competition/team/member/remove";

export const addScore: string =
  baseURL + "api/competition/team/member/score/add";

export const addScoreSum: string =
  baseURL + "api/competition/team/member/score/add/sum";

export const getTeamsByCompetitionIdURL = (id: string) => {
  return `${baseURL}${comp}/teams/${id}`;
};

export const getCompetitionInfoQueryURL = (
  id: string,
  page: number = 0,
  size: number = 10,
  series: string = "",
  search: string = ""
) => {
  return `${baseURL}${comp}/teams?search=${id}&page=${page}&size=${size}&series=${series}&name=${search}`;
};

export const getTeamMembersURL = (teamName: string, competitionId: string) => {
  return `${baseURL}${comp}/team?team=${teamName}&competition=${competitionId}`;
};

export const getForgotPasswordUrl = () => {
  return `${baseURL}api/forgot_password`;
};
export const getResetPasswordUrl = (token: string, newPassword: string) => {
  return `${baseURL}api/reset_password?token=${token}&password=${newPassword}`;
};

export const getAdminUserQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
) => {
  return `${baseURL}api/admin/user/query?search=${search}&page=${page}&size=${size}`;
};

export const getAdminPromoteUserUrl = () => {
  return `${baseURL}api/admin/promote`;
};

export const getAdminDemoteUserUrl = () => {
  return `${baseURL}api/admin/demote`;
};

export const getAdminDeleteUserUrl = () => {
  return `${baseURL}api/admin/delete`;
};

export const getFileDownloadUrl = () => {
  return `${baseURL}api/file/download`;
};

export const getFileUploadUrl = () => {
  return `${baseURL}api/file/upload`;
};

export const getUpdatePasswordUrl = () => {
  return `${baseURL}api/updatePassword`;
};

export const getUpdateEmailUrl = () => {
  return `${baseURL}api/updateEmail`;
};

/**
 * Gets users teams
 * @returns 
 */

export const getUserCompetitions = () => {
  return `${baseURL}api/user/teams`;
};

export const getUserClub = () => {
  return `${baseURL}api/user/club`;
}

export const getUserRoles = (userId: number) => {
  return `${baseURL}api/user/role?userId=${userId}`;
}

export const getActiveCompetitions = (page: number = 0, size: number = 10) => {
  return `${baseURL}${comp}/active/query?page=${page}&size=${size}`;
};

export const getInactiveCompetitions = (
  page: number = 0,
  size: number = 10
) => {
  return `${baseURL}${comp}/past/query?page=${page}&size=${size}`;
};

export const getUpcomingCompetitions = (
  page: number = 0,
  size: number = 10
) => {
  return `${baseURL}${comp}/upcoming/query?page=${page}&size=${size}`;
};

export const getActiveTeams = (
  club?: string,
  page: number = 0,
  size: number = 10
) => {
  return `${baseURL}${comp}/team/active/query?club=${club}&page=${page}&size=${size}`;
};
