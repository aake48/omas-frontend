import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface AreYouSureProps {
    prompt: string,
    hidden: boolean,
    onClickYes: any
}

const AreYouSure = ({ prompt, hidden, onClickYes }: AreYouSureProps) => {
    return (
        <div hidden={hidden} className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white shadow p-8">
                <h1>
                    {prompt}
                </h1>
                <div className="flex flex-row gap-4 py-4">
                    <Button
                        onClick={onClickYes}
                        variant="outline"
                        size="sm"
                        className="hover:bg-slate-100"
                    >
                        Kyllä
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-slate-100"
                    >
                        Ei
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AreYouSure;