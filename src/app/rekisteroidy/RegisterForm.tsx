"use client";

import { Button } from "@/components/ui/Button";
import { loginURL } from "../../lib/APIConstants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "./validation";

import CustomInput from "@/components/ui/CustomInput";

export default function RegisterForm() {
  const initialValues = {
    username: "",
    name: "",
    password: "",
    email: "",
  };
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "api/reg";

  const [errorMessage, setErrorMessage] = useState<string>("");

  const postRegister = async (values : any) => {
    console.log(values)
    setErrorMessage("");
    const payload = values;
    try {
      const response = await fetch(`${url + endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        try {
          const response = await axios.post(loginURL, {
            username: values.username,
            password: values.password,
          });

          console.log("login success");
          console.log(response.data.user);

          let token = response.data.token;
          let userInfo = response.data.user;

          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          window.dispatchEvent(new Event("localStorageChange"));
          router.push("/kilpailut");
        } catch (error: any) {
          if (error.response.data) {
            console.log(error.response.data);
          }
        }
        router.push("/kirjaudu");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
