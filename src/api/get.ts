import * as https from 'https';
import axios from 'axios';
import * as fs from 'fs';

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
        console.error(error);
        throw new Error('Error fetching data.');
    }
}