import fs from "node:fs";
import v2 from "../config/cloudinary-config.js";

export const uploadToCloudinary = async (path) => {
  try {
    return await v2.uploader.upload(path, {
      resource_type: "image",
      folder: "blogApp",
    });
  } catch (error) {
    next(error);
  } finally {
    fs.unlinkSync(path);
  }
};

export const deleteFromCloudinary = async (path) => {
  v2.uploader.destroy();
  try {
  } catch (error) {
    next(error);
  }
};
