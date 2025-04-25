// utils/errorHandler.ts
export interface ApiError {
  data?: {
    message?: string;
  };
}

export function getErrorMessage(error: unknown): string {
  // If error has a response object (e.g., an Axios error)
  const apiError = error as ApiError;
  if (apiError?.data?.message) {
    return apiError.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  // If error is something else, handle it gracefully
  return String(error) || "An unexpected error occurred.";
}
