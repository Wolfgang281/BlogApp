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

//! for update, all fields are optional (user may update only title, or only image, etc.)
//! but at least one field must be present — otherwise why call the route at all
export const updateBlogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().trim().min(10).messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters",
  }),

  category: Joi.string()
    .valid("technology", "science", "games", "it", "food", "travel", "fashion")
    .messages({
      "any.only": "Invalid category selected",
      "string.empty": "Category cannot be empty",
    }),
})
  .min(1) //! at least one field required
  .messages({
    "object.min":
      "Provide at least one field to update (title, description, or category)",
  });
