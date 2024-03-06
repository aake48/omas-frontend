import { UUID } from "crypto";

export type Club = {
  name: string;
  creationDate: Date | null;
  idCreator: number | null;
};

export type Competition = {
  id: string | undefined;
  name: string;
  creationDate: Date;
};

// not sure if needed
export type Role = {
  userId: number;
  role: string;
};

export type Team = {
  clubId: string;
  competitionId: string;
};

export type TeamMember = {
  userId: number;
  competitionId: string;
  clubId: string;
};

export type TeamMemberScore = {
  userId: number;
  clubId: string;
  competitionId: string;
  uuid: UUID;
  sum: number;
  bullseyeCount: number;
  scorePerShot: string;
  creationDate: Date;
};

export type User = {
  authorities: string[];
  username: string;
  legalName: string;
  email: string;
  creationDate: Date;
  club: string;
  userId: number;
};
