
export interface CompetitionNoDetails {
    name: string,
    nameNonId: string,
    creationDate: string
}

export interface Competition {
    name: string,
    nameNonId: string,
    creationDate: string
    teams: Team[]
}

export interface Team {
    club: string,
    totalScore: number,
    scores: TeamScore[]
}

export interface TeamScore {
    bullsEyeCount: number,
    sum: number,
    userId: number,
    scorePerShot: string
}

export interface Years {
    years: Year[]
}

export interface Year {
    year: string,
    competitions: Competition[]
}