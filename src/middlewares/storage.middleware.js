import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cho phép cả single và multiple
export const uploadMiddleware = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "files", maxCount: 10 }
]);
