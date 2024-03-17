"use server"

import axios from 'axios';
import * as Q from '../../../lib/APIConstants'
import * as https from 'https';
import * as fs from 'fs';
import { NextResponse } from 'next/server';


const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});

interface ScorePostRequest {
  body: {
    competitionlist: string;
    teamName: string;
    score: number;
    bullseyes: number;
  }
}

export async function POST(request: ScorePostRequest) {

  // TODO: Add token

  try {
    const response = await axios.post(
      Q.addScore,
      {
        competitionName: request.body.competitionlist,
        teamName: request.body.teamName,
        scoreList: [request.body.score, request.body.bullseyes]
      },
      {
        headers: {
          Authorization: `Bearer ${("token")}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error adding score" }, { status: 500 });
  }
}