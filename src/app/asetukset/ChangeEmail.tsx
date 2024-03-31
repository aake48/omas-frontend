'use client';
import { getUpdateEmailUrl, getUpdatePasswordUrl } from "@/lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { validationSchemaEmailChange } from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/Button";

interface PasswordChangeProps {
    token: string
}

export default function ChangePassword({ token }: PasswordChangeProps) {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");

    const initialValues = {
        email: "",
        password: ""
    };

    const handleChangeEmail = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            const res = await axios({
                method: 'post',
                url: getUpdateEmailUrl(),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    email: values.email,
                    password: values.password
                }
            });
            console.log(res);

            if (res.status === 200) {
                setMessage("Sähköpostin vaihto onnistui");
                setMessageStyle("text-black");
            } else {
                setMessage("Virhe sähköpostin vaihdossa");
                setMessageStyle("text-red-500");
            }
        } catch (e) {
            console.log(e);
            setMessage("Virhe sähköpostin vaihdossa");
            setMessageStyle("text-red-500");
        }
    }

    return (
        <main className="flex flex-col items-center justify-between p-2">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaEmailChange}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    handleChangeEmail(values);
                    setSubmitting(false);
                }}
            >
                <Form>
                    {/* <div
                        hidden={!errorMessage}
                        className="text-center mx-auto mt-2 text-red-500"
                    >
                        <p>{errorMessage}</p>
                    </div> */}
                    <div className="container shadow-lg p-4 mx-auto max-w-lg">
                        <div className="text-center pb-0">
                            <h1 className="text-3xl my-2 font-bold">
                                Sähköpostin vaihto
                            </h1>
                            <p>Syötä salasanasi ja uusi sähköposti</p>
                        </div>
                        <div className="grid gap-6 p-2">
                            <CustomInput
                                label="Uusi sähköposti"
                                name="email"
                                type="text"
                                placeholder="Uusi sähköposti"
                            />
                            <CustomInput
                                label="Salasana"
                                name="password"
                                type="password"
                                placeholder="Salasana"
                            />
                            <Button
                                variant={"outline"}
                                size={"lg"}
                                className="mx-auto text-xl hover:bg-slate-100 my-2"
                                type="submit"
                            >
                                Vaihda
                            </Button>
                        </div>
                        <p className={messageStyle}>{message}</p>
                    </div>
                </Form>
            </Formik>
        </main>
    );
}