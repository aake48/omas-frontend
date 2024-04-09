'use client';
import { getUpdateEmailUrl, getUpdatePasswordUrl } from "@/lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { validationSchemaEmailChange } from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/Button";

export default function ChangePassword() {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");
    const [isHidden, setIsHidden] = useState(true);

    const token = localStorage.getItem("token");

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

    const handleHidden = () => {
        (isHidden) ? setIsHidden(false) : setIsHidden(true);
    }

    return (
        <div>
            <Button
                variant={"outline"}
                size={"sm"}
                className="mx-auto text-sm hover:bg-slate-100 my-2"
                onClick={handleHidden}
            >
                Vaihda sähköposti
            </Button>
            <div hidden={isHidden} className="flex-col items-center justify-between p-2">
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
                        <div className="container border p-4 mx-auto max-w-lg">
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
            </div>
        </div>
    );
}