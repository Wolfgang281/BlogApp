import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/index.js";

export const generateJWT = (id) => {
  return jwt.sign({ id }, ENV_VAR.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
