"use server"

import axios, { AxiosError } from 'axios';
import * as Q from '../../../lib/APIConstants'
import * as https from 'https';
import * as fs from 'fs';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});


interface ScorePostRequestBody {
  competitionlist: string;
  teamName: string;
  score: number;
  bullseyes: number;
  image? : File;
}

export async function POST(request: NextRequest) {
  const requestBody: ScorePostRequestBody = await request.json();

  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.post(
      Q.addScoreSum,
      {
        competitionName: requestBody.competitionlist,
        teamName: requestBody.teamName,
        scoreList: requestBody.score,
        bullsEyeCount: requestBody.bullseyes,
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "multipart/form-data",
        },
        httpsAgent,
      }
    );
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.status);
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
  }
}