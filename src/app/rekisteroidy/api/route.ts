import { NextResponse } from 'next/server';
import * as https from 'https';
import * as fs from 'fs';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    key: fs.readFileSync('certificates/localhost-key.pem'),
    cert: fs.readFileSync('certificates/localhost.pem')
  });

export async function POST(request: Request) {
    try {
        const response = await axios.post(`${url + "api"}`, {
            httpsAgent,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(request),
        });
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}