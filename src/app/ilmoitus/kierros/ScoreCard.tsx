"use client";

import React from "react";
import { Formik, Form } from "formik";
import { roundValidationSchema } from "../validation";
import Custominput from "@/components/ui/CustomInput";

export default function ScoreCard() {
    const [success, setSuccess] = React.useState(false);
    return (
        <div className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-lg container mx-auto">
            <h1>Tuloksen ilmoittaminen</h1>
            <Formik
                id="scoreCardForm"
                initialValues={{
                    name: "",
                    roundScore: "",
                    bullseyes: "",
                }}
                validationSchema={roundValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    fetch("/api/send", {
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
                            console.error("Error:", error);
                        });
                }}
            >
                <Form className=" w-full justify-around gap-4 grid p-5">
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
                        placeholder="0-10.9"
                    />
                    <Custominput
                        label="Napakympit"
                        name="bullseyes"
                        type="number"
                        placeholder="0-10"
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
