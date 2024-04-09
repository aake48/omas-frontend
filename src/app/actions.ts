'use server'

import axios from "axios";

import {addScoreSum, addTeamMemberURL} from "@/lib/APIConstants";
import * as https from 'https';
import * as fs from 'fs';

const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});
export async function sendScore(token: string, formData: FormData) {
    console.log("server: ",formData);

  if (token == null) {
    console.error("No auth header found in request.");
    return 500;
  }
  try {
    const response = await axios.post(
      addScoreSum,
      {
        competitionName: formData.get("competitionName")?.toString(),
        teamName: formData.get("teamName")?.toString(),
        score: formData.get("score"),
        bullsEyeCount: formData.get("bullseyes"),
      },
      {
        headers: {
          Authorization:"Bearer " + token,
          "Content-Type": "application/json",
        },
        httpsAgent
      }
    );

    // uploadImage(token, formData.get("image") as File, formData.get("competitionName")?.toString() as string);

    return 200;
  } catch (error: any) {
    console.log(error);
    return 500;
  }
}

// upload image
// POST api/file/upload/
// Authorization: required
// Content-Type: multipart/form-data
// Requires competitionId field and file field for the image. Currently only accepts one image at a time.

export async function uploadImage(token: string, file: File, competitionId: string) {
  if (token == null) {
    console.error("No auth header found in request.");
    // return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await axios.post(
      "https://localhost:8080/api/file/upload/",
      {
        competitionId: competitionId,
        file: file,
      },
      {
        headers: {
          Authorization:"Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        httpsAgent
      }
    );

    return 200;
  } catch (error: any) {
    console.log(error);
    return 500;
  }

}

export async function joinTeam(token: string, teamName: string, competitionName: string) {

  const trimmedTeamName = teamName.trim();

  if (token == null) {
    return { message: "Virheellinen käyttäjä", status: 400 }
  }
  try {
      const response = await axios.post(
        addTeamMemberURL,
        { teamName: trimmedTeamName, competitionName: competitionName },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          httpsAgent,
        }
      );
      return {body: "Joukkueesen liittyminen onnistui", status: 200 };
      
  } catch (error: any) {
      console.error(error);
      return { message: "Virhe joukkueeseen liittymisessä", status: 500 }
  }
}