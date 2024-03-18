import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export default function SeasonComponent() {
    return (
        <div className="w-full rounded-md shadow-md border mb-8">
            <div className="items-baseline p-4">
                <h1 className="text-2xl">Sarjakilpailukausi</h1>
                <p className="lg:ml-8 text-slate-700 text-sm">
                    6.11.2023 - 3.3.2024
                </p>
            </div>
            <div className="sm:flex items-center p-4">
                <Button
                    variant="outline"
                    className="hover:bg-slate-100 mb-2 sm:mb-0 mr-4"
                >
                    <Link href="#">Sarjakilpailun säännöt</Link>
                </Button>
                <Button variant="outline" className="hover:bg-slate-100">
                    <Link href="/joukkueet">Ilmoita joukkue</Link>
                </Button>
            </div>
        </div>
    );
}