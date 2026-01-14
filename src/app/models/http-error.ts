export type HttpError = {
  code: string;
  message: string;
  details?: string[];
};

export const HttpErrorCode = {
  RoundNotFound: 'ROUND-0001',
} as const;
