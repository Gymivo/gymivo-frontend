export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  code: number;
  name: string;
  message: string;
  details?: FieldError[];
}

/** The single envelope every backend endpoint returns, on success and on failure. */
export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiErrorBody;
}

/** Returned by signup, signin and refresh. Expiry timestamps are ISO-8601 UTC. */
export interface AuthTokens {
  tokenType: "Bearer";
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

/**
 * A backend error (or a synthesized client-side one like network_error).
 * `message` is Persian and safe to render as-is.
 */
export class ApiError extends Error {
  readonly code: number;
  readonly status?: number;
  readonly details?: FieldError[];

  constructor(body: ApiErrorBody, status?: number) {
    super(body.message);
    this.name = body.name ?? "ApiError";
    this.code = body.code;
    this.status = status;
    this.details = body.details;
  }

  /** Returns the Persian message for a specific field on 422 errors, if present. */
  getFieldError(field: string): string | undefined {
    return this.details?.find((d) => d.field === field)?.message;
  }
}
