import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import Competitions from "./Competitions";
import JoinClub from "./liitySeuraan/JoinClub";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-row ">
        <Button variant={"outline"} className="mr-10">
          <Link href="/kilpailut/liitySeuraan">Liity seuraan</Link>
        </Button>
        <h1 className="text-2xl">Tulevat kilpailut</h1>
        <Button variant={"outline"} className="ml-10">
          <Link href="/kilpailut/lisaaKilpailu">Lisää kilpailu</Link>
        </Button>
      </div>
      <div className="my-2">
        <Competitions />
      </div>
    </main>
  );
}
