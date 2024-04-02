import * as https from 'https';
import axios from 'axios';
import * as fs from 'fs';
import { NextResponse } from 'next/server';

const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});

export default async function fetchData(url: string): Promise<any> {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw Error('Virhe haettaessa tietoja palvelimelta');
    }
}