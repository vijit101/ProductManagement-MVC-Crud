import multer from "multer";

// boiler plate
const StorageConfig = multer.diskStorage({
  destination: (req, file, callbck) => {
    callbck(null, "public/images/"); // null if no errors
  },
  filename: (req, file, callbck) => {
    const fname = Date.now() + "-" + file.originalname;
    callbck(null, fname);
  },
});

// boiler plate

export const uploadfile = multer({ storage: StorageConfig });
