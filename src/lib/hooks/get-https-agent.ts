import fs from 'fs';
import https from 'https';

export function useHTTPSAgent() {
    const cert = fs.readFileSync('certificates/localhost.pem');

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        ca: cert,
    });

    return httpsAgent;

}
