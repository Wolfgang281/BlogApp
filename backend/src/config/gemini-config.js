import { GoogleGenAI } from "@google/genai";

import { ENV_VAR } from "./index.js";

let ai = new GoogleGenAI({ apiKey: ENV_VAR.GEMINI_API_KEY });

export default ai;
