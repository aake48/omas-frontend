'use client';
import { LoginButton } from "./ui/LoginButton";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { headerLinks } from "@/lib/links";
import { User } from "@/types/commonTypes";

const Header: React.FC = () => {
    const [menuHidden, setMenuHidden] = useState("hidden");
    const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    const handleMenuOnClick = (state: boolean) => {
        !state ? setMenuHidden("block") : setMenuHidden("hidden");
    }

    useEffect(() => {
      const checkLogin = () => {
        const token = localStorage.getItem("token");
          if (token) {
            let user: User = JSON.parse(localStorage.getItem("userInfo")!);
            if (user.roles.includes("ROLE_ADMIN")) setAdminLoggedIn(true);
            setUser(user);
          }
      };
      checkLogin();
      window.addEventListener("localStorageChange", checkLogin);
      return () => {
        window.removeEventListener("localStorageChange", checkLogin);
      };
    }, []);

    let newHeaderLinks = [...headerLinks];
    if (adminLoggedIn) {
        newHeaderLinks.push({
            href: "/admin",
            text: "Pääkäyttäjänäkymä"
        });
    }

    return (
        <header>
            <div className="flex w-full items-center border-b-2 border-slate-400 h-24 overflow-hidden">
                <div className="mx-3 sm:mx-5 flex justify-between w-full">
                    <div onClick={() => handleMenuOnClick(false)} className="flex gap-5 items-center sm:hidden cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    <Link className="text-3xl hidden sm:flex sm:items-center" href="/">
                        OMAS
                    </Link>
                    <nav className="hidden sm:flex sm:gap-2 md:gap-5 items-center">
                        {newHeaderLinks.map((link, index) => (
                            <Link key={index} href={link.href}>
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <LoginButton user={user!} />
                </div>
            </div>
            <div
                onClick={() => handleMenuOnClick(true)}
                className={`${menuHidden} sm:hidden z-50 fixed top-0 left-0 w-full min-h-screen p-3 pt-6 bg-white overflow-hidden`}
            >
                <div className="flex gap-5 cursor-pointer h-24 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <nav className="flex gap-8 text-3xl items-center flex-col overflow-hidden">
                    <Link className="text-3xl" href="/">
                        Etusivu
                    </Link>
                    {newHeaderLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;