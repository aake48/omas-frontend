import React from "react";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between my-10 p-5">
            <div className="container shadow-lg p-5 mx-auto max-w-lg">
                <div className="text-center pb-0">
                    <h1 className="text-3xl my-2 font-bold">Rekisteröidy</h1>
                    <p>Syötä sähköpostiosoitteesi ja salasanasi</p>
                </div>
                <div className="grid space-y-4 p-6">
                    <div className="grid space-y-2">
                        <label htmlFor="email">Sähköposti</label>
                        <Input
                            id="email"
                            placeholder="Sähköposti"
                            required
                            type="email"
                        />
                    </div>
                    <div className="grid space-y-2">
                        <label htmlFor="email">Käyttäjätunnus</label>
                        <Input
                            id="email"
                            placeholder="Käyttäjätunnus"
                            required
                            type="email"
                        />
                    </div>
                    <div className="grid space-y-2">
                        <label htmlFor="password">Salasana</label>
                        <Input
                            id="passwordCheck"
                            placeholder="Salasana"
                            required
                            type="password"
                        />
                    </div>
                    <div className="grid space-y-2">
                        <label htmlFor="password">Salasana uudelleen</label>
                        <Input
                            id="passwordCheck"
                            placeholder="Salasana uudelleen"
                            required
                            type="password"
                        />
                    </div>
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
        </main>
    );
}
