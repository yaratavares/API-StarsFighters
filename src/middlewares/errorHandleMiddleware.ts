import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
};

export function unauthorizedError() {
  return { type: "unauthorized" };
}

export function conflictError() {
  return { type: "conflict" };
}

export function notFoundError() {
  return { type: "not_found" };
}

export default function errorHandleMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type) {
    return res.sendStatus(serviceErrorToStatusCode[err.type]);
  }

  res.sendStatus(500);
}
