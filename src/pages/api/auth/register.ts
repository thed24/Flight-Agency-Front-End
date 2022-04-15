import axios from "axios";
import { RegisterRequest, User } from "common/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestRegisterEndpoint } from "common/utilities";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

type RegisterResponse = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const request = req.body as RegisterRequest;

    if (!request) {
      res.status(400).json("Missing required query parameters.");
      return;
    }

    client
      .post<RegisterResponse>(RequestRegisterEndpoint, request)
      .then((result) => {
        res.status(200).json(result.data);
      })
      .catch((error) => {
        res.status(400).json(error.response.data);
      });
  }
}
