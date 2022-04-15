import axios from "axios";
import { readApiKey } from "common/server";
import { Address } from "common/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Cache } from "common/server/cache";

const client = axios.create();

type IntermediateReverseGeocodeResponse = {
  results: Address[];
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const lat = req.query["lat"] as string;
    const lng = req.query["lng"] as string;

    if (!lat || !lng) {
      res.status(400).json("Missing required query parameters.");
      return;
    }

    if (Cache.get(`${lat}-${lng}`)) {
      res.status(200).json(Cache.get(`${lat}-${lng}`));
      return;
    }

    const key = await readApiKey();

    client
      .post<IntermediateReverseGeocodeResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
      )
      .then((result) => {
        Cache.set(`${lat}-${lng}`, result.data);
        res.status(200).json(result.data);
      })
      .catch((error) => {
        res.status(400).json(error.response.data);
      });
  }
}
