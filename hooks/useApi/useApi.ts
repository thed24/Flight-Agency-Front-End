import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

export interface Result<T> {
  data?: T;
  error?: string;
}

export function Match<T>(either: Result<T>): T | string {
  if (either.error) {
    return either.error;
  } else if (either.data) {
    return either.data;
  }

  return "Error, no data";
}

export function useApi<T>(url: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Result<T>>({ error: "Undefined." });

  const request = () => {
    httpClient
      .get(url)
      .then((response: AxiosResponse<T>) => {
        setData({ data: response.data });
        setLoading(false);
      })
      .catch((error) => {
        setData({ error });
        setLoading(false);
      });
  };

  return { loading, request, data };
}

export default useApi;
