export type Result<T> = { data: T } | { error: string };

export const IsError = <T>(result: Result<T>): result is { error: string } => {
  return typeof result === "object" && "error" in result;
};

export const IsUnitializedError = (error: string) => error === "Undefined.";

export interface PostResponse<T> {
  payload: Result<T>;
  request: (data: any) => void;
  loading: boolean;
}

export interface GetResponse<T> {
  payload: Result<T>;
  request: (query?: any) => void;
  loading: boolean;
}
