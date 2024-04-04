import { User } from "@/types/commonTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { userLinks } from '@/lib/links';

const UserMenu = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            const user: User = JSON.parse(localStorage.getItem("userInfo")!);
            if (user.roles.includes("ROLE_ADMIN")) setAdminLoggedIn(true);
        }
    }, [])

    let newUserLinks = [...userLinks];
    if (adminLoggedIn) newUserLinks.push(
        {
            text: "Pääkäyttäjä",
            href: "/admin"
        }
    )

    if (!loggedIn) return;

    return (
        <div className="flex gap-4 text-xl items-center flex-col overflow-hidden">
            {newUserLinks.map((link, index) => (
                <Link className="hover:text-zinc-400" key={index} href={link.href}>
                    {link.text}
                </Link>
            ))}
        </div>
    );
};

export default UserMenu;
