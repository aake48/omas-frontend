import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { fullCompValidationSchema, roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";
import Dropdown from "@/components/ui/Dropdown";
import { ScoreType, TTeam, TTeamMember, UsersCompetition } from "@/types/commonTypes";
import UploadFile from "./UploadFile";
import { sendScore } from "@/app/actions";
import useUserInfo from "@/lib/hooks/get-user.info";

interface PostReturn {
  message: string;
}

export default function ScoreCard({
  scoreType,
  competitions,
}: Readonly<{
  scoreType: ScoreType;
  competitions: UsersCompetition[] | null;
}>) {
  const round = { bullseyes: 10, score: 10.9 };
  const total = { bullseyes: 60, score: 654 };
  const scoreValue = scoreType === "update" ? round : total;
  const [message, setMessage] = React.useState<PostReturn | null>(null);
  const [teamName, setTeamName] = React.useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamMemberIds, setTeamMemberIds] = useState<number[]>([]);

  let competitionNames: any[] = ["none"];
  if (competitions != null) {
    competitionNames = competitions.map(
      (competition) => competition.competitionId
    );
  }
  const { token } = useUserInfo();
  const [resetUploadKey, setResetUploadKey] = useState(0); // A key used to trigger a reset

  function handleDropDownChange(competitionName: string) {
    const foundCompetition = competitions?.find(
      (competition) => competition.competitionId === competitionName
    );
    if (foundCompetition) {
      setTeamName(foundCompetition.teamName);
    }

    if (foundCompetition?.teamMembers && foundCompetition.teamMembers.length > 0) {
      setTeamMembers(foundCompetition.teamMembers.map(member => member.legalName));
      setTeamMemberIds(foundCompetition.teamMembers.map(member => member.userId));
    }
  }
  return (
    <div>
      <Formik
        id="scoreCardForm"
        initialValues={{
          competitionName: "none",
          teamMember: "none",
          bullseyes: "",
          score: "",
          images: [] as FileList | [],
        }}
        validationSchema={
          scoreType === "update"
            ? roundValidationSchema
            : fullCompValidationSchema
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            if (key !== "images") {
              try {
                // Skip the image field for now
                key === "teamMember" ? formData.append(key, teamMemberIds[teamMembers.indexOf(value.toString())].toString())
                : formData.append(key, value.toString()); // Ensure value is a string
              } catch (error) {
                console.error(error);
              }
            }
          });
          formData.append("teamName", teamName!);
          formData.append("requestType", scoreType);

          for (const element of values.images) {
            formData.append(
              `image`,
              element,
              element.name
            );
          }

          sendScore(token, formData).then((response) => {
            setSubmitting(false);
            resetForm();
            setResetUploadKey((prevKey) => prevKey + 1);
            setTeamName(null);
            setTeamMembers([]);
            console.log(response);
            response.status === 200
              ? setMessage({
                  message: "Ilmoitus lähetetty",
                })
              : setMessage({
                  message: "Ilmoituksen lähetys epäonnistui: " + response.body.message,
                });
          });
        }}
      >
        <Form className=" md:my-5 w-full justify-around gap-2 md:gap-5 grid p-5">
          <div className="w-full px-10 pt-5 flex-auto">
            <label className="md:text-xl font-light">Kilpailu</label>
            <Field name="competitionName">
              {({ field, form }: any) => (
                <div className="grid">
                  <Dropdown
                    id="competitionDropdown"
                    options={competitionNames}
                    selected={field.value}
                    required
                    onChange={(e) => {
                      console.log("Kisan (e) nimi: " + e.target.value)
                      form.setFieldValue(field.name, e.target.value);
                      handleDropDownChange(e.target.value);
                    }}
                  />
                  {form.errors.competitionName && form.touched ? (
                    <div className="text-red-500 w-fit p-1 bg-red-100 rounded-b-md translate-x-1">
                      {form.errors.competitionName}
                    </div>
                  ) : null}
                </div>
              )}
            </Field>
            <div>{teamName}</div>
          </div>
          <div className="w-full px-10 pt-5 flex-auto">
            <label className="md:text-xl font-light">Joukkueen jäsen</label>
            
            <Field name="teamMember">
              {({ field, form }: any) => {
              return (
                <div className="grid">
                  <Dropdown
                    id="teamMemberDropdown"
                    options={teamMembers}
                    value={teamMemberIds}
                    selected={field.value}
                    required
                    onChange={(e) => {
                      console.log("Valittu joukkueen jäsen: " + e.target.value + " Joukkueen jäsenen id: " + teamMemberIds[teamMembers.indexOf(e.target.value)])
                      console.log("e:n arvo, joukkueen jäsen: " + e.target.value)
                      form.setFieldValue(field.name, e.target.value);
                    }}
                  />
                  {form.errors.teamMember && form.touched.teamMember ? (
                    <div className="text-red-500 w-fit p-1 bg-red-100 rounded-b-md translate-x-1">
                      {form.errors.teamMember}
                    </div>
                  ) : null}
                </div>
              )}}
            </Field>
          </div>
          <div className="w-full px-10 pt-5 flex-auto">
            <Custominput
              label="Tulos"
              name="score"
              type="number"
              placeholder={`0-${scoreValue.score}`}
            />
          </div>
          <div className="w-full px-10 pt-5 flex-auto">
            <Custominput
                label="Napakympit"
                name="bullseyes"
                type="number"
                placeholder={`0-${scoreValue.bullseyes}`}
              />
            </div>
          <Field name="images">
            {({ field, form }: any) => (
              <UploadFile
                key={resetUploadKey}
                data={field.value}
                setFieldValue={(name, value) => {
                  form.setFieldValue(name, value);
                  return Promise.resolve(); // return a Promise that resolves immediately
                }}
                errors={form.errors}
              />
            )}
          </Field>
          {message && (
        <div className="w-full px-4 md:px-10 pt-5">
          <p className="w-full text-center text-green-700 p-2 rounded-md">{message.message}</p>
          </div>
      )}
          <button
            className={`my-2 h-14 hover:bg-opacity-10 md:h-20 w-40 border rounded-lg mx-auto disabled:brightness-75  p-2 text-xl text-light transition duration-300 hover:font-medium hover:text-secondary active:scale-95`}
            type="submit"
          >
            Lähetä
          </button>
        </Form>
      </Formik>
    </div>
  );
}
