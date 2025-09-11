import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { ApiError } from "../utils/api-error";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map(err => {
    if ("param" in err) {
      return { field: err.param, message: err.msg };
    }
    return { field: "unknown", message: err.msg }; // fallback for AlternativeValidationError
  });

  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
