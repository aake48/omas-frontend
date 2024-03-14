"use client";

import React from "react";
import { Formik, Form } from "formik";
import { fullCompValidationSchema, roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";

type ScoreType = "round" | "total"

export default function ScoreCard({scoreType} : {scoreType: ScoreType}) {

    const round = {bullseyes: 10, roundScore: 10.9,}
    const total = {bullseyes: 60, roundScore: 520,}
    const scoreValue = scoreType === "round" ? round : total
    const [success, setSuccess] = React.useState(false);
    return (
        <div>
            <Formik
                id="scoreCardForm"
                initialValues={{
                    name: "",
                    roundScore: "",
                    bullseyes: "",
                }}
                validationSchema={scoreType === "round" ? roundValidationSchema : fullCompValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("Submitting")
                    fetch('ilmoitus/api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    })
                    .then(response => response.json())
                    .then(data => {
                        setSubmitting(false);
                        resetForm();
                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }}
            >
                <Form className=" my-5 w-full justify-around gap-5 grid p-5">
                    <Custominput
                        label="Nimi"
                        name="name"
                        type="text"
                        placeholder="Nimi"
                    />
                    <Custominput
                        label="Kierrostulos"
                        name="roundScore"
                        type="number"
                        placeholder={`0-${scoreValue.roundScore}`}
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
