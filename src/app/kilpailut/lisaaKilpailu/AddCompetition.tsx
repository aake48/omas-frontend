"use client";

import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { addCompetitionURL } from "../../../lib/APIConstants";
import { PostCompetition } from "@/types/commonTypes";
import axios from "axios";
import { useState } from "react";

export default function AddCompetition() {
  type CompetitionType = "rifle" | "pistol";
  const competitionTypes = ["rifle", "pistol"];

  const [competitionName, setCompetitionName] = useState("");
  const [competitionType, setCompetitionType] =
    useState<CompetitionType>("rifle");

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const competition: PostCompetition = {
      competitionName: competitionName,
      competitionType: competitionType,
    };

    try {
      const response = await axios.post(addCompetitionURL, competition, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center p-5 rounded-lg shadow-lg container mx-auto">
      <form></form>
      <h1 className="text-2xl my-8">Kilpailun luominen</h1>
      <p className="my-2">Kilpailun nimi</p>
      <Input
        id="competitionName"
        required={true}
        placeholder={"Kilpailun nimi"}
        type={"text"}
        onChange={(e) => setCompetitionName(e.target.value)}
      />
      <Dropdown
        options={competitionTypes}
        id={"competitionType"}
        onChange={(e) => {
          setCompetitionType(e.target.value as CompetitionType);
        }}
        required={true}
      ></Dropdown>
      <Button
        variant={"outline"}
        className="my-4 mx-auto"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Luo kilpailu
      </Button>
    </div>
  );
}
