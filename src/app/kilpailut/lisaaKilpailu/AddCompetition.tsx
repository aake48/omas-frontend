"use client";

import { Button } from "@/components/ui/Button";
import { addCompetitionURL } from "../../../lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import validationSchema from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { useRouter } from "next/navigation";

export default function AddCompetition() {
  const router = useRouter();

  type CompetitionType = "rifle" | "pistol";

  const competitionTypes: Record<string, CompetitionType> = {
    Ilmakivääri: "rifle",
    Ilmapistooli: "pistol",
  };

  const competitionTypeOptions = Object.keys(competitionTypes);

  const initialValues = {
    competitionName: "",
    competitionType: "Ilmakivääri",
    startDate: null,
    endDate: null,
  };

  const handleSubmit = async (values: any) => {
    const competition =
      values.competitionStartDate && values.competitionEndDate
        ? {
            competitionName: values.competitionName,
            competitionType: competitionTypes[values.competitionType],
            startDate: new Date(values.competitionStartDate).getTime(),
            endDate: new Date(values.competitionEndDate).getTime(),
          }
        : {
            competitionName: values.competitionName,
            competitionType: competitionTypes[values.competitionType],
          };

    try {
      const response = await axios.post(addCompetitionURL, competition, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <Formik
      id="addCompetitionForm"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmit(values);
        setSubmitting(false);
        router.push("/kilpailut");
      }}
    >
      <Form>
        <div className="flex flex-col justify-center gap-2 p-5 rounded-lg shadow-lg container mx-auto max-w-2xl">
          <h1 className="text-3xl my-2">Kilpailun luominen</h1>
          <CustomInput
            label={"Kilpailun nimi"}
            name={"competitionName"}
            placeholder={"Kilpailun nimi"}
            type={"text"}
          />
          <CustomDropdown
            label={"Kilpailun tyyppi"}
            name={"competitionType"}
            placeholder={"Kilpailun tyyppi"}
            options={competitionTypeOptions}
          />
          <span className="flex flex-row gap-5 justify-center">
            <CustomInput
              label={"Alkamispäivämäärä"}
              placeholder={"Alkamispäivämäärä"}
              type={"date"}
              name={"startDate"}
            />
            <CustomInput
              label={"Päättymispäivämäärä"}
              placeholder={"Päättymispäivämäärä"}
              type={"date"}
              name={"endDate"}
            />
          </span>
          <Button
            variant={"outline"}
            size={"lg"}
            className="mx-auto text-xl hover:bg-slate-100"
            type="submit"
          >
            Luo kilpailu
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
