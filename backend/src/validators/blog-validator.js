import Joi from "joi";

export const addBlogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().min(10).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "any.required": "Description is required",
  }),

  category: Joi.string()
    .valid("technology", "science", "games", "it", "food", "travel", "fashion")
    .required()
    .messages({
      "any.only": "Invalid category selected",
      "string.empty": "Category is required",
      "any.required": "Category is required",
    }),
});
