export const baseURL: string = "https://localhost:8080"

export const loginURL: string = baseURL + "/api/login";

export const registrationURL: string = baseURL + "/api/reg";

const compQuery: string = "/api/competition/query";

const clubQuery: string = "/api/club/query";

export const getCompetitionsQueryUrl = (page: number, search: string = "", size: number = 10): string => {

    return `${baseURL}${compQuery}?search=${search}&page=${page}&size=${size}`
}

export const getClubQueryUrl = ( page: number = 0, search: string = "", size: number = 10): string => {

    return `${baseURL}${clubQuery}?search=${search}&page=${page}&size=${size}`
}
/**
 * älä käytä tälläistä, käytä getClubQueryUrl()
 */
export const getAllClubsURL: string = baseURL + "/api/club/all";

/**
 * älä käytä tälläistä, käytä getCompetitionsQueryUrl()
 */
export const getAllCompetitionsURl: string = baseURL + "/api/competition/all";




