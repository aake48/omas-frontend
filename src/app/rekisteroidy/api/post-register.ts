import * as https from 'https';
import axios from 'axios';
import * as fs from 'fs';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    key: fs.readFileSync('certificates/localhost-key.pem'),
    cert: fs.readFileSync('certificates/localhost.pem')
  });

export const postRegister = async (values: Object) => {

   axios.post('/rekisteroidy/api', {
    httpsAgent,
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(values),
   })
};