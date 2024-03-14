"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { loginURL } from "@/types/APIConstants";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginURL, {
        username: username,
        password: password,
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
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between my-10 p-5">
      <div className="container shadow-lg p-5 mx-auto max-w-lg">
        <div className="text-center pb-0">
          <h1 className="text-3xl my-2 font-bold">Kirjaudu</h1>
          <p>Syötä sähköpostiosoitteesi ja salasanasi</p>
        </div>
        <div className="grid space-y-4 p-6">
          <Input
            id="username"
            placeholder="Käyttäjätili"
            required
            type="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="grid space-y-2">
            <label htmlFor="password">Salasana</label>
            <Input
              id="password"
              placeholder="Salasana"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant={"outline"}
            className=" mx-auto"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Kirjaudu
          </Button>
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
