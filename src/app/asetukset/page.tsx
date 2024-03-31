'use client';
import Settings from "./Settings";

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2 gap-8">
            <Settings />
        </main>
    );
}