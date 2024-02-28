import { LoginButton } from "./ui/LoginButton";
import React from "react";
import Link from "next/link";
import { headerLinks } from "../../../lib/links";

const Header: React.FC = () => {
    return (
        <header className="w-full flex items-center border-b-2 border-slate-400 h-24">
            <div className="mx-20 flex justify-between w-full">
                <Link className=" text-3xl" href="/">
                    OMAS
                </Link>
                <nav className=" flex gap-5 items-center">
                    {headerLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </nav>
                <LoginButton />
            </div>
        </header>
    );
};

export default Header;
