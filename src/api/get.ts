"use server";

import * as https from "https";
import axios from "axios";
import * as fs from "fs";

const cert = fs.readFileSync("certificates/localhost.pem");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ca: cert,
});

export default async function fetchData(
  url: string,
  token?: string
): Promise<any> {
  const headers = token
    ? {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    : {
        "Content-Type": "application/json",
      };
  try {
    const response = await axios.get(url, {
      headers: headers,
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw Error("Virhe haettaessa tietoja palvelimelta");
  }
}
