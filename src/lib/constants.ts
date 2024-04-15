import { CompetitionResponse, CompetitionType } from "@/types/commonTypes";

export const contacts = [
  { phone: "123-456-7890", email: "toimisto@omas.fi", address: "Osoite 123" },
];

export const upcoming: CompetitionResponse[] = [
  {
    competitionId: "Tuleva_kilpailu_1",
    displayName: "Tuleva kilpailu 1",
    type: "rifle",
    creationDate: "01.06.2024",
    startDate: "02.06.2024",
    endDate: "03.06.2024",
  },
  {
    competitionId: "Tuleva_kilpailu_2",
    displayName: "Tuleva kilpailu 2",
    type: "rifle",
    creationDate: "01.06.2024",
    startDate: "02.06.2024",
    endDate: "03.06.2024",
  },
  {
    competitionId: "kesan_yo_-kilpailu",
    displayName: "kesän yö -kilpailu",
    type: "pistol",
    creationDate: "01.06.2024",
    startDate: "02.06.2024",
    endDate: "03.06.2024",
  },
];

export const oldCompetitions: CompetitionResponse[] = [
  {
    competitionId: "Mennyt_kilpailu_1",
    displayName: "Mennyt kilpailu 1",
    type: "rifle",
    creationDate: "01.01.2024",
    startDate: "02.03.2024",
    endDate: "05.03.2024",
  },
  {
    competitionId: "Mennyt_kilpailu_2",
    displayName: "Mennyt kilpailu 2",
    type: "rifle",
    creationDate: "01.01.2024",
    startDate: "01.01.2024",
    endDate: "07.01.2024",
  },
  {
    competitionId: "kesan_yo_-kilpailu",
    displayName: "kesän yö -kilpailu",
    type: "pistol",
    creationDate: "01.01.2024",
    startDate: "01.01.2024",
    endDate: "01.03.2024",
  },
];

export const testDataAdminViewUsers = [
  {
    username: "user1",
    legalName: "user1",
    email: "user1@gmail",
    userId: 1,
    roles: ["ADMIN", "BLABLA"],
    creationDate: "string",
    club: null,
  },
  {
    username: "user2",
    legalName: "user2",
    email: "user2@gmail",
    userId: 2,
    roles: ["ADMIN", "BLABLA"],
    creationDate: "string",
    club: null,
  },
  {
    username: "user3",
    legalName: "user3",
    email: "user3@gmail",
    userId: 3,
    roles: ["ADMIN", "BLABLA"],
    creationDate: "string",
    club: null,
  },
];

export const competitionTypes: Record<CompetitionType, string> = {
  rifle: "Ilmakivääri",
  pistol: "Ilmapistooli",
};
