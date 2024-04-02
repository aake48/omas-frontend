"use server"

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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.post(
      Q.addScoreSum,
      {
        competitionName: requestBody.competitionName,
        // teamName: requestBody.teamName,
        teamName: "Poliisi_seura",
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