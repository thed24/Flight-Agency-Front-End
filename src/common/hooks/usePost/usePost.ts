import axios, { AxiosResponse, AxiosError } from "axios";
import { Result, PostResponse } from "common/hooks";
import { useState } from "react";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

export function usePost<I, O>(url: string): PostResponse<O> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Result<O>>({ error: "Undefined." });

  const request = (payload: I) => {
    setLoading(true);

    httpClient
      .post(url, payload)
      .then((response: AxiosResponse<O>) => {
        setData({ data: response.data });
      })
      .catch((error: AxiosError) => {
        setData({ error: error.response?.data });
      })
      .then(() => {
        setLoading(false);
      });
  };

  return { loading, request, payload: data };
}
