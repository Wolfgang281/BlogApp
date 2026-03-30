import fs from "node:fs";
import v2 from "../config/cloudinary-config.js";

export const uploadToCloudinary = async (path, next) => {
  try {
    if (!path) return;
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

export const deleteFromCloudinary = async (publicId, next) => {
  try {
    if (!publicId) return;
    return await v2.uploader.destroy(publicId);
  } catch (error) {
    next(error);
  }
};
