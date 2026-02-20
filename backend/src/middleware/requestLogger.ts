import { Request, Response, NextFunction } from "express";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.printf((info) => String(info.message)),
  transports: [new winston.transports.Console()],
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    const message = `[${req.method}] ${req.originalUrl} - Execution time: ${durationMs.toFixed(1)}ms`;
    logger.info(message);
  });

  next();
};
