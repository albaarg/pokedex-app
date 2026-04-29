import { AxiosError, AxiosResponse } from 'axios';
import {
  AppError,
  ErrorCodes,
  parseApiError,
  getErrorMessage,
  isRetryableError,
} from '../errors';

describe('AppError', () => {
  it('creates an AppError instance correctly', () => {
    const error = new AppError('Test error', ErrorCodes.VALIDATION_ERROR, 400);
    expect(error.message).toBe('Test error');
    expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR);
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('AppError');
  });

  it('determines if error is retryable', () => {
    const networkError = new AppError('Network', ErrorCodes.NETWORK_ERROR);
    expect(networkError.isRetryable).toBe(true);

    const timeoutError = new AppError('Timeout', ErrorCodes.TIMEOUT_ERROR);
    expect(timeoutError.isRetryable).toBe(true);

    const serverError = new AppError('Server', ErrorCodes.SERVER_ERROR, 500);
    expect(serverError.isRetryable).toBe(true);

    const validationError = new AppError('Invalid', ErrorCodes.VALIDATION_ERROR, 400);
    expect(validationError.isRetryable).toBe(false);
  });
});

describe('parseApiError', () => {
  it('returns the same AppError if passed an AppError', () => {
    const originalError = new AppError('Test', ErrorCodes.NOT_FOUND);
    const parsedError = parseApiError(originalError);
    expect(parsedError).toBe(originalError);
  });

  it('handles standard Error objects', () => {
    const error = new Error('Standard error');
    const parsedError = parseApiError(error);
    expect(parsedError.message).toBe('Standard error');
    expect(parsedError.code).toBe(ErrorCodes.UNKNOWN_ERROR);
  });

  it('handles strings or unknown objects', () => {
    const parsedError = parseApiError('Just a string');
    expect(parsedError.code).toBe(ErrorCodes.UNKNOWN_ERROR);
    expect(parsedError.message).toBe('An unexpected error occurred.');
  });

  describe('AxiosError handling', () => {
    const createAxiosError = (status?: number, data?: any, code?: string) => {
      const error = new AxiosError('Axios Error');
      if (status) {
        error.response = {
          status,
          data,
          statusText: '',
          headers: {},
          config: {} as any,
        } as AxiosResponse;
      } else {
        error.code = code;
      }
      return error;
    };

    it('handles timeout network errors', () => {
      const error = createAxiosError(undefined, undefined, 'ECONNABORTED');
      const parsedError = parseApiError(error);
      expect(parsedError.code).toBe(ErrorCodes.TIMEOUT_ERROR);
      expect(parsedError.isRetryable).toBe(true);
    });

    it('handles 401 Unauthorized', () => {
      const error = createAxiosError(401, { message: 'Custom unauth' });
      const parsedError = parseApiError(error);
      expect(parsedError.code).toBe(ErrorCodes.UNAUTHORIZED);
      expect(parsedError.message).toBe('Custom unauth');
    });

    it('handles 404 Not Found', () => {
      const error = createAxiosError(404);
      const parsedError = parseApiError(error);
      expect(parsedError.code).toBe(ErrorCodes.NOT_FOUND);
    });

    it('handles 400 Validation Error', () => {
      const error = createAxiosError(400, {
        errors: { field1: ['is required'] },
      });
      const parsedError = parseApiError(error);
      expect(parsedError.code).toBe(ErrorCodes.VALIDATION_ERROR);
      expect(parsedError.message).toContain('field1: is required');
    });

    it('handles 500 Server Error', () => {
      const error = createAxiosError(500);
      const parsedError = parseApiError(error);
      expect(parsedError.code).toBe(ErrorCodes.SERVER_ERROR);
      expect(parsedError.isRetryable).toBe(true);
    });
  });
});

describe('utility functions', () => {
  it('getErrorMessage returns the correct message', () => {
    const error = new Error('Test message');
    expect(getErrorMessage(error)).toBe('Test message');
  });

  it('isRetryableError correctly identifies retryable errors', () => {
    const error = new AxiosError();
    error.code = 'ECONNABORTED'; // Timeout
    expect(isRetryableError(error)).toBe(true);
  });
});
