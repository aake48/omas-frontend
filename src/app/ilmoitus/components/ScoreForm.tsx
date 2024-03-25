import React from "react";
import { Formik, Form, Field } from "formik";
import { fullCompValidationSchema, roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";
import Dropdown from "@/components/ui/Dropdown";
import { CompetitionResponse, ScoreType } from "@/types/commonTypes";
import UploadFile from "./UploadFile";

export default function ScoreCard({
    scoreType,
    competitions,
}: {
    scoreType: ScoreType;
    competitions: CompetitionResponse[];
}) {
    const round = { bullseyes: 10, score: 10.9 };
    const total = { bullseyes: 60, score: 520 };
    const scoreValue = scoreType === "round" ? round : total;
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState<any | null>(null);
    const competitionNames = competitions.map(
        (competition) => competition.nameNonId
    );
    return (
        <div>
            {message && <div>{message.toString()}</div>}
            <Formik
                id="scoreCardForm"
                initialValues={{
                    competitionlist: "none",
                    // name: "",
                    score: "",
                    bullseyes: "",
                }}
                validationSchema={
                    scoreType === "round"
                        ? roundValidationSchema
                        : fullCompValidationSchema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    fetch("ilmoitus/api", {
                        method: "POST",
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        },
                        body: JSON.stringify(values),
                        
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            setSubmitting(false);
                            resetForm();
                            setMessage(response.message);
                            setSuccess(true);
                            setTimeout(() => {
                                setSuccess(false);
                            }, 3000);
                        })
                }}
            >
                <Form className=" my-5 w-full justify-around gap-5 grid p-5">
                    <div className="grid gap-2">
                        <label className="text-xl font-light">Kilpailu</label>
                        <Field name="competitionlist">
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
                                        }}
                                    />
                                    {form.errors.competitionlist && form.touched ? (
                                        <div className="text-red-500 w-fit p-1 bg-red-100 rounded-b-md translate-x-1">{form.errors.competitionlist}</div>
                                    ) : null}
                                </div>

                            )}
                        </Field>
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
