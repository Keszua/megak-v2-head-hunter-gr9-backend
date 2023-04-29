export interface ClientApiResponse<T> {
  ok: boolean;
  data?: T;
  statusCode: number;
  error?: ErrorResponse;
}

export interface ErrorResponse {
  message: string | string[];
  code?: string;
}
