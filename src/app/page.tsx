"use client";

import React from "react";
import { CompetitionResponse } from "@/types/commonTypes";
import useUserInfo from "@/lib/hooks/get-user.info";
import HomePageWrapper from "./components/HomePageWrapper";

export type competitionListProps = {
  competitions: CompetitionResponse[];
};

export default function Home() {
  const { token } = useUserInfo();
  const tokenString = typeof token === "string" ? token : "";

  return <HomePageWrapper token={tokenString} />;
}
