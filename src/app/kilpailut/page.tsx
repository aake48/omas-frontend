import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import Competitions from "./Competitions";
import JoinClub from "./liitySeuraan/JoinClub";

export default function page() {
  return (
    <main className="flex flex-col min-h-screen items-center p-10">
      <div className="flex flex-col">
        <div className="text-center mb-2">
          <h1 className="text-3xl">Tulevat kilpailut</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"outline"} className="hover:bg-slate-100">
            <Link href="/kilpailut/liitySeuraan">Liity seuraan</Link>
          </Button>
          <Button variant={"outline"} className="hover:bg-slate-100">
            <Link href="/kilpailut/lisaaKilpailu">Lisää kilpailu</Link>
          </Button>
        </div>
      </div>
      <div className="my-2">
        <Competitions />
      </div>
    </main>
  );
}
