import { body, param, query, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import User from "../models/Users.models";

// Handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// For routes with username parameter
const validateUsernameParam = [
  param("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username should be a string")
    .trim(),
  handleValidationErrors,
];

// For user model fields in request body
const validateUserBody = () => {
  const validFields = Object.keys(User.schema.paths);
  return validFields.map((field) =>
    body(field)
      .optional()
      .matches(/^(?!\s*$).+/)
      .withMessage(`${field} cannot be an empty string`)
  );
};

// For updateUser route
const validateUpdateUser = [
  ...validateUsernameParam,
  ...validateUserBody(),
  handleValidationErrors,
];

// For listUsers route with sorting
const validateListUsers = [
  query("sortBy")
    .optional()
    .isIn(Object.keys(User.schema.paths))
    .withMessage("Invalid sorting field")
    .trim(),
  handleValidationErrors,
];

export { validateUsernameParam, validateUpdateUser, validateListUsers };
