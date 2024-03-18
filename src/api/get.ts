import * as https from 'https';
import * as fs from 'fs';
import axios from 'axios';
import * as QUERY from '@/types/APIConstants';

const cert = fs.readFileSync('certificates/localhost.pem');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});

export default async function fetchData(url: string): Promise<any> {
    try {
        const response = await axios.get(url, { httpsAgent });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}