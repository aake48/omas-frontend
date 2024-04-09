"use client";
import { User } from "@/types/commonTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface LoginProps {
  user: User,
  loggedIn: boolean,
  onClick: any
}

export function LoginButton({ user, loggedIn, onClick }: LoginProps) {
  return loggedIn ? (
    <div>
      <Link
        className="flex gap-2 text-lg items-center border py-1 px-2 border-slate-400 hover:bg-slate-100 rounded-lg"
        href="#"
        onClick={onClick}
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
        {user.username}
      </Link>
    </div>
  ) : (
    <Link
      className="flex gap-2 text-lg items-center border py-1 px-2 border-slate-400 hover:bg-slate-100 rounded-lg"
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
