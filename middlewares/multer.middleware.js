import multer from "multer";

export function validateUploadFile(req, res, next) {
  const uploadFileErrorHandler = function (error, req, res, next) {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido una foto" });
    }
    if (error) {
      next(error);
    }else {
      next();
    }
  };
  uploadFileErrorHandler(req.fileValidationError, req, res, next);
}
