import axios from 'axios';

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
            data: jsonData,
            headers: headers2
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}