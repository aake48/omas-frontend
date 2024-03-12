"use client";

import { Button } from "@/components/ui/Button";
import CustomInput from "@/components/ui/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "./validation";


import { postRegister } from "./api/post-register";

export default function RegisterForm() {
    const initialValues = {
        username: "",
        name: "",
        password: "",
        email: "",
    };
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string>("");



    return (
        <Formik
            id="registerForm"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                postRegister(values);
                setSubmitting(false);
            }}
        >
            <Form>
                <div
                    hidden={!errorMessage}
                    className="text-center mx-auto mt-2 text-red-500"
                >
                    <p>{errorMessage}</p>
                </div>
                <div className="container shadow-lg p-5 mx-auto max-w-lg">
                    <div className="text-center pb-0">
                        <h1 className="text-3xl my-2 font-bold">
                            Rekisteröidy
                        </h1>
                    </div>
                    <div className="grid gap-6 p-6">
                        <CustomInput
                            label="Sähköposti"
                            name="email"
                            type="email"
                            placeholder="Sähköposti"
                        />
                        <CustomInput
                            label="Nimi"
                            name="name"
                            type="text"
                            placeholder="Nimi"
                        />
                        <CustomInput
                            label="Käyttäjätunnus"
                            name="username"
                            placeholder="Käyttäjätunnus"
                            type="text"
                        />
                        <CustomInput
                            label="Salasana"
                            name="password"
                            type="password"
                            placeholder="Salasana"
                        />
                        <CustomInput
                            label="Salasana uudelleen"
                            name="passrepeat"
                            type="password"
                            placeholder="Salasana uudelleen"
                        />
                        <Button
                            variant={"outline"}
                            className=" mx-auto"
                            type="submit"
                        >
                            Rekisteröidy
                        </Button>
                    </div>
                    <div className="text-center grid gap-5 pt-0">
                        <Link className="text-sm underline" href="/kirjaudu">
                            Onko sinulla jo tili? Kirjaudu
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}
