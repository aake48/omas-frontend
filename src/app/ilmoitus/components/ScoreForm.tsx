import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { fullCompValidationSchema, roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";
import Dropdown from "@/components/ui/Dropdown";
import { ScoreType, UsersCompetition } from "@/types/commonTypes";
import UploadFile from "./UploadFile";
import Notification from "@/components/component/Notification";

interface PostReturn {
    message: string;
    status: number;
}

export default function ScoreCard({
    scoreType,
    competitions,
}: {
    scoreType: ScoreType;
    competitions: UsersCompetition[];
}) {
    const round = { bullseyes: 10, score: 10.9 };
    const total = { bullseyes: 60, score: 520 };
    const scoreValue = scoreType === "round" ? round : total;
    const [message, setMessage] = React.useState<PostReturn | null>(null);
    const [teamName, setTeamName] = React.useState<string | null>(null);
    const competitionNames = competitions.map(
        (competition) => competition.competitionId
    );

    function handleDropDownChange(competitionName: string) {
        const foundCompetition = competitions.find((competition) => competition.competitionId === competitionName);
        if (foundCompetition) {
            setTeamName(foundCompetition.teamName);
        }
    }
    


    return (
        <div>
            {message && <Notification message={message.message + ' : ' + new Date().toLocaleTimeString()} type={message.status === 200 ? 'success' : 'error'} /> }
            
            <Formik
                id="scoreCardForm"
                initialValues={{
                    competitionName: "none",
                    bullseyes: "",
                    // name: "",
                    score: "",
                }}
                validationSchema={
                    scoreType === "round"
                        ? roundValidationSchema
                        : fullCompValidationSchema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const request = { ...values, teamName: teamName };
                    fetch("ilmoitus/api", {
                        method: "POST",
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        },
                        body: JSON.stringify(request),
                        
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            setSubmitting(false);
                            resetForm();
                            setTeamName(null);
                            response.status === 200 ? setMessage( { message: "Ilmoitus lähetetty", status: response.status} ) : setMessage( {message:"Ilmoituksen lähetys epäonnistui", status: response.status} );

                        })
                }}
            >
                <Form className=" md:my-5 w-full justify-around gap-2 md:gap-5 grid p-5">
                    <div className="grid gap-2">
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
                                            form.setFieldValue(
                                                field.name,
                                                e.target.value
                                            );
                                            handleDropDownChange(e.target.value);
                                        }}
                                    />
                                    {form.errors.competitionName && form.touched ? (
                                        <div className="text-red-500 w-fit p-1 bg-red-100 rounded-b-md translate-x-1">{form.errors.competitionName}</div>
                                    ) : null}
                                </div>

                            )}
                        </Field>
                        <div>{teamName}</div>
                    </div>
                    {/* <Custominput
                        label="Nimi"
                        name="name"
                        type="text"
                        placeholder="Nimi"
                    /> */}
                    <Custominput
                        label="Kierrostulos"
                        name="score"
                        type="number"
                        placeholder={`0-${scoreValue.score}`}
                    />
                    <Custominput
                        label="Napakympit"
                        name="bullseyes"
                        type="number"
                        placeholder={`0-${scoreValue.bullseyes}`}
                    />
                    <Field name="image">
                        {({ field, form }: any) => (
                                <UploadFile
                                    resetForm={() => form.resetForm()}
                                    data={field.value}
                                    setFieldValue={(name, value) => {
                                        form.setFieldValue(name, value);
                                        return Promise.resolve(); // return a Promise that resolves immediately
                                    }}
                                    errors={form.errors}
                                 />
                        )}
                    </Field>
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
