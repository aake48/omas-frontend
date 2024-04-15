"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { loginURL } from "../../lib/APIConstants";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import Custominput from "@/components/ui/CustomInput";
import validation from "./validation";
import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await fetch("kirjaudu/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) =>
        res.json().then((data) => {
          if (data.status === 200) {
            console.log("login success");
            console.log("data.user", data.body.user);

            const token = data.body.token;
            const userInfo = data.body.user;

            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.dispatchEvent(new Event("localStorageChange"));
            router.push("/kilpailut");
          }
        })
      );
    } catch (error) {
      setMessage(
        "Kirjautuminen ei onnistunut. Tarkista, että syöttämäsi tiedot ovat oikein."
      );
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between my-2 p-5">
      <div className="container shadow-lg p-5 mx-auto max-w-lg">
        <div className="flex flex-col gap-2 text-center pb-0">
          <h1 className="text-3xl my-2 font-bold">Kirjaudu</h1>
          <p>Syötä käyttäjänimesi ja salasanasi</p>
          <p>{message}</p>
        </div>
        <div className="my-5">
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
                className="mx-auto text-xl hover:bg-slate-100 my-2"
                type="submit"
              >
                Kirjaudu
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="text-center grid gap-5 my-6">
          <Link className="text-sm underline" href="/recovery">
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
