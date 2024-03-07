export const baseURL: string = "https://localhost:8080"

export const loginURL: string = baseURL + "/api/login";

export const registrationURL: string = baseURL + "/api/reg";

const compQuery: string = "/competition/query";

const clubQuery: string = "/club/query";

export const getCompetitionsQueryUrl = (search: string = "", page: number, size: number = 10): string => {

    return `${baseURL}${compQuery}?search=${search}&page=${page}&size=${size}.`
}

export const getClubQueryUrl = (search: string = "", page: number, size: number = 10): string => {

    return `${baseURL}${clubQuery}?search=${search}&page=${page}&size=${size}.`
}
/**
 * älä käytä tälläistä, käytä getClubQueryUrl()
 */
export const getAllClubsURL: string = baseURL + "/club/all";

/**
 * älä käytä tälläistä, käytä getCompetitionsQueryUrl()
 */
export const getAllCompetitionsURl: string = baseURL + "/competition/all";




