'use server';
import * as https from 'https';
import * as fs from 'fs';
import axios from 'axios';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  key: fs.readFileSync('certificates/localhost-key.pem'),
  cert: fs.readFileSync('certificates/localhost.pem')
});

export default async function fetchData(url: string, data?: Object, headers?: Object): Promise<any> {
    let jsonData;
    if (data === undefined) {
        jsonData = "";
    } else {
        jsonData = JSON.stringify(data);
    }

    let headers2 = {};
    if (!headers) {
        headers2 = {}
    }

    try {
        const response = await axios.get(url, {
            httpsAgent,
            data: jsonData,
            headers: headers2
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}