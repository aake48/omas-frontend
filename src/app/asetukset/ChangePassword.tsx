'use client';
import { getUpdatePasswordUrl } from "@/lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { validationSchemaPasswordChange } from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/Button";

interface PasswordChangeProps {
    token: string
}

export default function ChangePassword({ token }: PasswordChangeProps) {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");
    const [isHidden, setIsHidden] = useState(true);

    const initialValues = {
        oldPassword: "",
        newPassword: ""
    };

    const handleChangePassword = async (values: {
        newPassword: string;
        oldPassword: string;
    }) => {
        try {
            const res = await axios({
                method: 'post',
                url: getUpdatePasswordUrl(),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    newPassword: values.newPassword,
                    oldPassword: values.oldPassword
                }
            });
            console.log(res);

            if (res.status === 200) {
                setMessage("Salasanan vaihto onnistui");
                setMessageStyle("text-black");
            } else {
                setMessage("Virhe salasanan vaihdossa");
                setMessageStyle("text-red-500");
            }
        } catch (e) {
            console.log(e);
            setMessage("Virhe salasanan vaihdossa");
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
                Vaihda salasana
            </Button>
            <div hidden={isHidden} className="flex-col items-center justify-between p-2">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemaPasswordChange}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        handleChangePassword(values);
                        setSubmitting(false);
                    }}
                >
                    <Form>
                        <div className="container border p-4 mx-auto max-w-lg">
                            <div className="grid gap-6 p-2">
                                <CustomInput
                                    label="Vanha salasana"
                                    name="oldPassword"
                                    type="password"
                                    placeholder="Vanha salasana"
                                />
                                <CustomInput
                                    label="Uusi salasana"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Uusi salasana"
                                />
                                <CustomInput
                                    label="Uusi salasana uudelleen"
                                    name="passrepeat"
                                    type="password"
                                    placeholder="Uusi salasana uudelleen"
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