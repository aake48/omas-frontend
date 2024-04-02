import { footerLinks } from "@/lib/links";
import Link from "next/link";
import React from "react";

const userLinks = [
    {
        text: "Asetukset",
        href: "/asetukset"
    },
];

const UserMenu = () => {
    return (
        <footer className="w-full flex items-center py-10 border-t-2 border-slate-400">
            <div className="mx-20 flex justify-between w-full">
                <nav className=" grid gap-5 items-center">
                    {userLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default UserMenu;
