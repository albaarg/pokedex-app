import { AxiosError } from "axios";

export const ErrorCodes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export class AppError extends Error {
  code: ErrorCode;
  statusCode?: number;
  isRetryable: boolean;
  originalError?: Error;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode?: number,
    originalError?: Error,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.isRetryable = this.determineRetryable(code, statusCode);
  }

  private determineRetryable(code: ErrorCode, statusCode?: number): boolean {
    if (
      code === ErrorCodes.NETWORK_ERROR ||
      code === ErrorCodes.TIMEOUT_ERROR
    ) {
      return true;
    }
    if (statusCode && statusCode >= 500) {
      return true;
    }
    return false;
  }
}

type ApiErrorResponse = {
  message?: string;
  error?: string | { code: string; message: string };
  errors?: Record<string, string[]>;
};

export const parseApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const response = error.response;
    const data = response?.data as ApiErrorResponse | undefined;

    // Network error (no response)
    if (!response) {
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        return new AppError(
          "Request timed out. Please try again.",
          ErrorCodes.TIMEOUT_ERROR,
          undefined,
          error,
        );
      }
      return new AppError(
        "Unable to connect. Please check your internet connection.",
        ErrorCodes.NETWORK_ERROR,
        undefined,
        error,
      );
    }

    const statusCode = response.status;
    const serverMessage =
      data?.message ||
      (typeof data?.error === "object" ? data?.error?.message : data?.error);

    // Unauthorized
    if (statusCode === 401) {
      return new AppError(
        serverMessage || "Authentication required.",
        ErrorCodes.UNAUTHORIZED,
        statusCode,
        error,
      );
    }

    // Not found
    if (statusCode === 404) {
      return new AppError(
        serverMessage || "The requested resource was not found.",
        ErrorCodes.NOT_FOUND,
        statusCode,
        error,
      );
    }

    // Validation error
    if (statusCode === 400 || statusCode === 422) {
      const validationMessage =
        formatValidationErrors(data?.errors) || serverMessage;
      return new AppError(
        validationMessage || "Invalid request. Please check your input.",
        ErrorCodes.VALIDATION_ERROR,
        statusCode,
        error,
      );
    }

    // Server error
    if (statusCode >= 500) {
      return new AppError(
        "Something went wrong on our end. Please try again later.",
        ErrorCodes.SERVER_ERROR,
        statusCode,
        error,
      );
    }

    // Other errors
    return new AppError(
      serverMessage || "An unexpected error occurred.",
      ErrorCodes.UNKNOWN_ERROR,
      statusCode,
      error,
    );
  }

  // Generic error
  if (error instanceof Error) {
    return new AppError(
      error.message,
      ErrorCodes.UNKNOWN_ERROR,
      undefined,
      error,
    );
  }

  return new AppError(
    "An unexpected error occurred.",
    ErrorCodes.UNKNOWN_ERROR,
    undefined,
    undefined,
  );
};

const formatValidationErrors = (
  errors?: Record<string, string[]>,
): string | undefined => {
  if (!errors) return undefined;

  const messages = Object.entries(errors)
    .map(([field, fieldErrors]) => `${field}: ${fieldErrors.join(", ")}`)
    .join(". ");

  return messages || undefined;
};

export const getErrorMessage = (error: unknown): string => {
  const appError = parseApiError(error);
  return appError.message;
};

export const isRetryableError = (error: unknown): boolean => {
  const appError = parseApiError(error);
  return appError.isRetryable;
};
