import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const userSchema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

interface CustomRequest extends Request {
  value?: {
    body: any; // Define the structure of 'body' based on your schema
  };
}

export const validateRequest = (schema: joi.ObjectSchema) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value.body = {};
    }
    req.value.body = result.value; // Assign 'body' property to 'req.value'
    next();
  };
};

