'use server'

import axios from "axios";
import { NextResponse } from "next/server";
import {addScoreSum} from "@/lib/APIConstants";
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
    // return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    return 200;
  } catch (error: any) {
    console.log(error);
    return 500;
  }
}