//! 1) going with disk storage
import multer from "multer";
import AppError from "../utils/app-error-util.js";

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); //! the first arg is null, which will be returned in case of error otherwise file will be saved inside the folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const myFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Filetype not allowed. Allowed types are ${allowedTypes.join(", ")}`,
        400,
      ),
      false,
    );
  }
};

const upload = multer({
  storage: myStorage,
  fileFilter: myFileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB in bytes
  },
});

export default upload;
