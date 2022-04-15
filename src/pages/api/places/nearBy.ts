import axios from "axios";
import { readApiKey } from "common/server";
import { Place } from "common/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Cache } from "common/server/cache";

const client = axios.create();

type IntermediatePlacesResponse = {
  results: Place[];
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const lat = req.query["lat"] as string;
    const lng = req.query["lng"] as string;
    const radius = parseInt(req.query["radius"] as string);
    const keyword = req.query["keyword"] as string;
    const zoom = parseInt(req.query["zoom"] as string);

    if (!lat || !lng || !zoom || !radius || !keyword) {
      res.status(400).json("Missing required query parameters.");
      return;
    }

    if (Cache.get(`${lat}-${lng}-${radius}-${keyword}`)) {
      res.status(200).json(Cache.get(`${lat}-${lng}-${radius}-${keyword}`));
      return;
    }

    const key = await readApiKey();

    client
      .post<IntermediatePlacesResponse>(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${key}`
      )
      .then((result) => {
        Cache.set(`${lat}-${lng}-${radius}-${keyword}`, result.data);
        res.status(200).json(result.data);
      })
      .catch((error) => {
        res.status(400).json(error.response.data);
      });
  }
}
