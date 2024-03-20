"use server"

import * as https from 'https';
import axios from 'axios';
import * as fs from 'fs';

const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});

export async function fetchData(url: string): Promise<any> {
    try {
        const response = await axios.get(url, { httpsAgent });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function postData(url: string, body?: Object): Promise<any> {
    try {
        const response = await axios.post(url,
            { 
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}