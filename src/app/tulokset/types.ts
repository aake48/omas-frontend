
export interface Score {
    year: number,
    divisions: Division[]
}
  
export interface Division {
    name: string,
    clubs: Club[]
}

export interface Club {
    name: string,
    shortName: string,
    position: number,
    members: Member[]
}

export interface Member {
    firstName: string,
    lastName: string
}