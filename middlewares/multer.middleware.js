import multer from "multer";

export function validateUploadFile(req, res, next) {
  const uploadFileErrorHandler = function (error, req, res, next) {
    if (error instanceof multer.MulterError) {
      console.log("Error en Multer:", error);
      res.status(500).json({ message: "Error en la subida de la foto" });
    } else if (error) {
      res.status(500).json({ message: "Error desconocido: ", error });
    }else{
        next();
    }
  };
  console.log("sali");
  uploadFileErrorHandler(req.fileValidationError, req, res, next);
}
