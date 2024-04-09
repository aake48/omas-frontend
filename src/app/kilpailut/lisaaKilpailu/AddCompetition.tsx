"use client";

import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { addCompetitionURL } from "../../../lib/APIConstants";
import { PostCompetition } from "@/types/commonTypes";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import CustomInput from "@/components/ui/CustomInput";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";

export default function AddCompetition() {
    type CompetitionType = "rifle" | "pistol";
    const competitionTypes = ["rifle", "pistol"];
    const isLoggedIn = useIsLoggedIn();

    if (!isLoggedIn) {
        return (
            <div className="grid gap-5">
                <h1>Sinun täytyy olla kirjautunut sisään luodaksesi kilpailun</h1>
                <Button>
                    <a className="border p-2 rounded-lg shadow-md" href="/kirjaudu">Kirjaudu sisään</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center gap-2 p-5 rounded-lg shadow-lg container mx-auto">
            <h1 className="text-2xl my-2">Kilpailun luominen</h1>
            <Formik
                id="addCompetitionForm"
                initialValues={{
                    competitionName: "",
                    competitionType: "none",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  try {
                    const response = axios.post(addCompetitionURL, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                        data: values as PostCompetition,
                    });
        
                } catch (error: any) {
                    if (error.response.data) {
                        console.log(error.response.data);
                    }
                }
                }}
            >
                <Form>
                    <CustomInput
                        label="Kilpailun nimi"
                        name="competitionName"
                        type="text"
                        placeholder="Kilpailun nimi"
                    />
                    <Field name="competitiontype">
                        {({ field, form }: any) => (
                            <Dropdown
                                options={competitionTypes}
                                id={"competitionType"}
                                selected={field.value}
                                onChange={(e) => {
                                    form.setFieldValue(field.name, e.target.value as CompetitionType);

                                }}
                                required={true}
                            ></Dropdown>
                        )}
                    </Field>
                    <Button
                        variant={"outline"}
                        className="my-4 mx-auto"
                        type="submit"
                    >
                        Luo kilpailu
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}
