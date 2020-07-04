import { Request, Response, NextFunction } from "express";

export class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export function errorMiddleware(
  err: HttpException,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response {
  return res.status(err.status || 500).send(err.message);
}
