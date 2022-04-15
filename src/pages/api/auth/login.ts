import axios from "axios";
import { LoginRequest, User } from "common/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestLoginEndpoint } from "common/utilities";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

type LoginResponse = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const request = req.body as LoginRequest;

    if (!request) {
      res.status(400).json("Missing required query parameters.");
      return;
    }

    client
      .post<LoginResponse>(RequestLoginEndpoint, request)
      .then((result) => {
        res.status(200).json(result.data);
      })
      .catch((error) => {
        res.status(400).json(error.response.data);
      });
  }
}
