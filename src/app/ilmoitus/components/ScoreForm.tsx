import React from "react";
import { Formik, Form, Field } from "formik";
import { fullCompValidationSchema, roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";
import Dropdown from "@/components/ui/Dropdown";
import { CompetitionResponse, ScoreType } from "@/types/commonTypes";

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
    const [error, setError] = React.useState<string | null>(null);
    const competitionNames = competitions.map(
        (competition) => competition.displayName
    );

    //TODO: Add team selection
    //FIX: error state not updating

    return (
        <div>
            {error && <div>{error}</div>}
            <Formik
                id="scoreCardForm"
                initialValues={{
                    competitionlist: "none",
                    name: "",
                    score: "",
                    bullseyes: "",
                }}
                validationSchema={
                    scoreType === "round"
                        ? roundValidationSchema
                        : fullCompValidationSchema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("submitting");
                    fetch("ilmoitus/api", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            setSubmitting(false);
                            resetForm();
                            setSuccess(true);
                            setTimeout(() => {
                                setSuccess(false);
                            }, 3000);
                        })
                        .catch((error) => {
                            setError('Virhe lähetyksessä, yritä uudelleen.');
                        });
                }}
            >
                <Form className=" my-5 w-full justify-around gap-5 grid p-5">
                    <Field name="competitionlist">
                        {({ field, form }: any) => (
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
                        )}
                    </Field>
                    <Custominput
                        label="Nimi"
                        name="name"
                        type="text"
                        placeholder="Nimi"
                    />
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
