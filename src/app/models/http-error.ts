export type HttpError = {
  code: string;
  message: string;
  details?: string[];
};

export const HttpErrorCode = {
  round: {
    roundNotFound: 'ROUND-0001',
    tableNotFound: 'ROUND-0007',
  },
  table: {
    tableNotFound: 'TABLE-0001',
  },
} as const;
