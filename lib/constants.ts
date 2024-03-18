import { CompetitionResponse } from "@/types/commonTypes";

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
