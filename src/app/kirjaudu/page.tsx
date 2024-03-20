"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { loginURL } from "../../lib/APIConstants";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import Custominput from "@/components/ui/CustomInput";
import validation from "./validation";

export default function Login() {
    const router = useRouter();


    const handleSubmit = async (values: {
        username: string;
        password: string;
    }) => {
        try {
            const response = await axios.post(loginURL, {
                username: values.username,
                password: values.password,
            });

            console.log("login success");
            console.log(response.data.user);

            const token = response.data.token;
            const userInfo = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.dispatchEvent(new Event("localStorageChange"));
            router.push("/kilpailut");
        } catch (error: any) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between my-10 p-5">
            <div className="container shadow-lg p-10 grid gap-5 justify-center max-w-lg rounded-lg">
                <h1 className="text-3xl my-2 text-center font-bold">
                    Kirjaudu
                </h1>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                    validationSchema={validation}
                >
                    <Form className="grid gap-5">
                        <Custominput
                            label="Käyttäjätunnus"
                            name="username"
                            type="text"
                            placeholder="Käyttäjätunnus"
                        />
                        <Custominput
                            label="Salasana"
                            name="password"
                            type="password"
                            placeholder="Salasana"
                        />
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            className=" mx-auto text-xl"
                            type="submit"
                        >
                            Kirjaudu
                        </Button>
                    </Form>
                </Formik>
                <div className="text-center pb-0">
                    <p>Syötä sähköpostiosoitteesi ja salasanasi</p>
                </div>
                <div className="text-center grid gap-5 pt-0">
                    <Link className="text-sm underline" href="#">
                        Unohditko salasanasi?
                    </Link>
                    <Link className="text-sm underline" href="/rekisteroidy">
                        Eikö sinulla ole tiliä? Rekisteröidy
                    </Link>
                </div>
            </div>
        </main>
    );
}
