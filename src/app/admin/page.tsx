'use client';
import { AdminViewType } from "@/types/commonTypes";
import AdminHelper from "./AdminHelper";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const adminFeatures = [
    {
        text: "Käyttäjät",
        type: AdminViewType.Users
    },
    {
        text: "Luo seura",
        type: AdminViewType.CreateClub
    },
    {
        text: "Muut",
        type: AdminViewType.Other
    }
];

export default function page() {
    const [type, setType] = useState(AdminViewType.Other);

    const handleFeatureClick = (type: AdminViewType) => {
        setType(type);
    }

    return (
        <main className="min-h-screen w-full p-4 gap-2">
            <div className="flex flex-row gap-2">
                {adminFeatures.map(feature => (
                    <Button
                        onClick={() => handleFeatureClick(feature.type)}
                        variant="outline"
                        className="hover:bg-slate-100"
                    >
                        {feature.text}
                    </Button>
                ))}
            </div>
            <AdminHelper type={type} />
        </main>
    )
}