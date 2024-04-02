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
  competitionName: string;
  teamName: string;
  score: number;
  bullseyes: number;
  image? : File;
}


export async function POST(request: NextRequest) {
  const requestBody: ScorePostRequestBody = await request.json();

  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("No auth header found in request.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.post(
      Q.addScoreSum,
      {
        competitionName: requestBody.competitionName,
        teamName: requestBody.teamName,
        score: requestBody.score,
        bullsEyeCount: requestBody.bullseyes,
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );
    return NextResponse.json({ status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response!.data);
      return NextResponse.json({ message: error.response!.data }, { status: error.status });
    }
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("No auth header found in request.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const response = await axios.get(Q.getUserCompetitions(), {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      httpsAgent,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ message: error.response!.data }, { status: error.status });
    }
  }
}