import React from "react";
import Link from "next/link";
import { footerLinks } from "@/lib/links";

const Footer: React.FC = () => {
    return (
        <footer className="w-full flex items-center py-10 border-t-2 border-slate-400">
            <div className="mx-20 flex justify-between w-full">
                <Link className=" text-3xl" href="/">
                    OMAS
                </Link>
                <nav className=" grid gap-5 items-center">
                    {footerLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
