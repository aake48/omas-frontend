'use client';

import { Suspense } from "react";
import Recovery from "./Recovery";

export default function page() {
    return (
        <Suspense>
            <Recovery />
        </Suspense>
    )
}