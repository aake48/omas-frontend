import * as yup from "yup";

const today = new Date();
const oneYearFromNow = new Date(
  today.getFullYear() + 1,
  today.getMonth(),
  today.getDate()
);

const validationSchema = yup.object().shape({
  competitionName: yup.string().required("Kilpailun nimi on pakollinen"),
  competitionType: yup.string().required("Kilpailun tyyppi on pakollinen"),
  startDate: yup
    .date()
    .nullable()
    .min(new Date(), "Kilpailun alkupäivämäärän pitää olla tulevaisuudessa")
    .max(
      oneYearFromNow,
      "Kilpailun alkupäivämäärä saa olla korkeintaan vuoden päässä"
    ),
  endDate: yup
    .date()
    .nullable()
    .min(
      yup.ref("startDate"),
      "Kilpailun loppupäivämäärän pitää olla alkupäivämäärän jälkeen"
    )
    .max(
      oneYearFromNow,
      "Kilpailun alkupäivämäärä saa olla korkeintaan vuoden päässä"
    ),
});

export default validationSchema;
