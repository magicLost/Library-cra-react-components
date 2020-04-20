export type RESPONSE_STATUS = "SUCCESS" | "FAIL" | "ERROR";

export interface IJsonResponseError {
  message: string;
  stack?: string;
  name?: string;
}

export interface IJsonResponse<T> {
  status: RESPONSE_STATUS;
  data: T;
  error: IJsonResponseError;
}
