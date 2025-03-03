import { CompetitionResponse, CompetitionType, CompetitionSeries } from "@/types/commonTypes";

export const contacts = [
  { phone: "123-456-7890", email: "toimisto@omas.fi", address: "Piriläntie 175, 90440 Kempele" },
];

export const upcoming: CompetitionResponse[] = [
  {
    competitionId: "Tuleva_kilpailu_1",
    displayName: "Tuleva kilpailu 1",
    type: "rifle",
    series: "Y-mestaruussarja",
    creationDate: "01.06.2024",
    startDate: "02.06.2024",
    endDate: "03.06.2024",
  },
  {
    competitionId: "Tuleva_kilpailu_2",
    displayName: "Tuleva kilpailu 2",
    type: "rifle",
    series: "Y-suomisarja",
    creationDate: "01.06.2024",
    startDate: "02.06.2024",
    endDate: "03.06.2024",
  },
  {
    competitionId: "kesan_yo_-kilpailu",
    displayName: "kesän yö -kilpailu",
    type: "pistol",
    series: "Y50-suomisarja",
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
    series: "Y50-suomisarja",
    creationDate: "01.01.2024",
    startDate: "02.03.2024",
    endDate: "05.03.2024",
  },
  {
    competitionId: "Mennyt_kilpailu_2",
    displayName: "Mennyt kilpailu 2",
    type: "rifle",
    series: "Y-mestaruussarja",
    creationDate: "01.01.2024",
    startDate: "01.01.2024",
    endDate: "07.01.2024",
  },
  {
    competitionId: "kesan_yo_-kilpailu",
    displayName: "kesän yö -kilpailu",
    type: "pistol",
    series: "Y-suomisarja",
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

export const competitionSeries: Record<CompetitionSeries, string> = {
  Y_mestaruussarja: "Y-mestaruussarja",
  Y_suomisarja: "Y-suomisarja", 
  Y50_mestaruussarja: "Y50-mestaruussarja",
  Y50_suomisarja: "Y50-suomisarja",
};