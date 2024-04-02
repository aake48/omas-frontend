import axios, { AxiosError } from 'axios';
import * as Q from '../../../lib/APIConstants'
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { useHTTPSAgent } from '@/lib/get-https-agent';

interface ScorePostRequestBody {
  competitionName: string;
  teamName: string;
  score: number;
  bullseyes: number;
  image?: File;
}


export async function POST(request: NextRequest) {
  const requestBody: ScorePostRequestBody = await request.json();
  const httpsAgent = useHTTPSAgent();

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
    return NextResponse.json({ body: response.data, status: response.status });
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