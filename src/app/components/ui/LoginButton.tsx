"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export function LoginButton({}) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(token ? true : false);
    };
    checkLogin();
    window.addEventListener("localStorageChange", checkLogin);
    return () => {
      window.removeEventListener("localStorageChange", checkLogin);
    };
  }, []);

  return loggedIn ? (
    <Link
      className="flex gap-2 text-lg items-center border py-1 px-2 border-slate-400 rounded-lg"
      href="/logout"
    >
      Kirjaudu ulos
    </Link>
  ) : (
    <Link
      className="flex gap-2 text-lg items-center border py-1 px-2 border-slate-400 rounded-lg"
      href="/kirjaudu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
      Kirjaudu
    </Link>
  );
}
