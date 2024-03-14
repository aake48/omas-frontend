"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginURL } from "@/types/APIConstants";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  // TODO Add translations for error messages. Now they are in English.

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const postRegister = async () => {
    setErrorMessage("");
    if (formik.values.password !== passwordCheck) {
      setErrorMessage("Salasanat eivät ole samat.");
      return;
    }
    const payload = formik.values;
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
            username: formik.values.username,
            password: formik.values.password,
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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: postRegister,
  });

  return (
    <main className="flex min-h-screen flex-col justify-between my-10 px-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="container shadow-lg p-5 mx-auto max-w-lg">
          <div className="text-center pb-0">
            <h1 className="text-3xl my-2 font-bold">Rekisteröidy</h1>
            <p>Syötä sähköpostiosoitteesi ja salasanasi</p>
          </div>
          <div
            hidden={!errorMessage}
            className="text-center mx-auto mt-2 text-red-500"
          >
            <p>{errorMessage}</p>
          </div>
          <div className="grid space-y-4 p-6">
            <div className="grid space-y-2">
              <label htmlFor="email">Sähköposti</label>
              <Input
                id="email"
                placeholder="Sähköposti"
                required
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="grid space-y-2">
              <label htmlFor="username">Käyttäjätunnus</label>
              <Input
                id="username"
                placeholder="Käyttäjätunnus"
                required
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div className="grid space-y-2">
              <label htmlFor="name">Nimi</label>
              <Input
                id="name"
                placeholder="Nimi"
                required
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="grid space-y-2">
              <label htmlFor="password">Salasana</label>
              <Input
                id="password"
                placeholder="Salasana"
                required
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <div className="grid space-y-2">
              <label htmlFor="passwordCheck">Salasana uudelleen</label>
              <Input
                id="passwordCheck"
                placeholder="Salasana uudelleen"
                required
                type="password"
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
              />
            </div>
            <Button variant={"outline"} className=" mx-auto" type="submit">
              Rekisteröidy
            </Button>
          </div>
          <div className="text-center grid gap-5 pt-0">
            <Link className="text-sm underline" href="/kirjaudu">
              Onko sinulla jo tili? Kirjaudu
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
