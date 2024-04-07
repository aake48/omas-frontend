"use client";

import { Button } from "@/components/ui/Button";
import { addCompetitionURL } from "../../../lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import validationSchema from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { useRouter } from "next/navigation";
import { PostCompetition } from "@/types/commonTypes";

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
    startDate: "",
    endDate: "",
  };

  return (
    <Formik
      id="addCompetitionForm"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        try {
          const competitonInfo: PostCompetition =
            values.startDate || values.endDate
              ? {
                  competitionName: values.competitionName,
                  competitionType: competitionTypes[values.competitionType],
                  competitionStartDate: values.startDate,
                  competitionEndDate: values.endDate,
                }
              : {
                  competitionName: values.competitionName,
                  competitionType: competitionTypes[values.competitionType],
                };
          axios({
            method: "post",
            url: addCompetitionURL,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            data: competitonInfo,
          }).then((response) => {
            if (response.status === 201) {
              console.log(response.data);
              router.push(`/kilpailut/${response.data.competitionId}`);
            } else {
              console.log(response.data.message);
            }
          });
        } catch (error: any) {
          if (error.response.data) {
            console.log(error.response.data);
          }
        }
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
