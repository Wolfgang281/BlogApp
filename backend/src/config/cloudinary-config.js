import { v2 } from "cloudinary";

import { ENV_VAR } from "./index.js";

v2.config({
  api_key: ENV_VAR.CLOUDINARY_API_KEY,
  cloud_name: ENV_VAR.CLOUDINARY_CLOUD_NAME,
  api_secret: ENV_VAR.CLOUDINARY_API_SECRET,
});

export default v2;

//! steps to use cloudinary
//? 1) install and setup the config (v2)
//? 2) go to utils and create a file uploader function
