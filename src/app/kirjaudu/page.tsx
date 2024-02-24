
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between my-10 p-5">
            <div className="container shadow-lg p-5 mx-auto max-w-lg">
                <div className="text-center pb-0">
                    <Image
                        alt="Logo"
                        className="mx-auto"
                        height="120"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "120/120",
                            objectFit: "cover",
                        }}
                        width="120"
                    />
                    <h1 className="text-3xl my-2 font-bold">Kirjaudu</h1>
                    <p>
                        Syötä sähköpostiosoitteesi ja salasanasi
                    </p>
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
                        <label htmlFor="password">Salasana</label>
                        <Input
                            id="password"
                            placeholder="Salasana"
                            required
                            type="password"
                        />
                    </div>
                    <Button variant={"outline"} className=" mx-auto" type="submit">
                        Kirjaudu
                    </Button>
                </div>
                <div className="text-center pt-0">
                    <Link className="text-sm underline" href="#">
                        Unohditko salasanasi?
                    </Link>
                </div>
            </div>
        </main>
    );
}
