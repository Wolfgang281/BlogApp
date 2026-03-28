//! 1) going with disk storage
import multer from "multer";

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); //! the first arg is null, which will be returned in case of error otherwise file will be saved inside the folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const upload = multer({ storage: myStorage });

export default upload;
