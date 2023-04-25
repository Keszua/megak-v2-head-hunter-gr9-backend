export interface ClientApiResponse<T> {
  ok: boolean;
  data?: T;
  statusCode: number;
  error?: string;
}
