import axios from 'axios'
import https from 'https'
export default async function fetchData(url: string): Promise<any> {
    try {
        console.log(url)
        const response = await axios(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
        });

        //if (!response.ok) {
        //    throw new Error('HTTP error! status: ' + response.status + ' ' + response.statusText);
        //}

        //return await response.json();
        return await response.data
    } catch (error) {
        console.error('Error:', error);
        throw Error('Virhe haettaessa tietoja palvelimelta');
    }
}