
"use client"

import { User } from "@/types/commonTypes";
import { useEffect, useState } from "react";

const useAdminLoggedIn = () => {
const [adminLogin, setAdminLogin] = useState(false);

    const checkAdminLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                let user: User = JSON.parse(localStorage.getItem("userInfo")!);
                if (user.roles.includes("ROLE_ADMIN")) {
                    setAdminLogin(true);
                }
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkAdminLogin();
    }, [])

    return adminLogin;
}

export default useAdminLoggedIn;