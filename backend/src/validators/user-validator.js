import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().required(),
});
