import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  details?: string[];
}

export const createHttpError = (
  message: string,
  statusCode: number,
  details?: string[],
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(err.details ? { details: err.details } : {}),
    },
  });
};
