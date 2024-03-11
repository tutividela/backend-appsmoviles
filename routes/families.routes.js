import { Router } from "express";
import familyController from "../controllers/family.controller.js";
import { upload } from "../utils/multer.js";
import { validateUploadFile } from "../middlewares/multer.middleware.js";
import { validateIdToken } from "../middlewares/idTokenValidation.middleware.js";

const router = Router();

router.get("/", validateIdToken ,familyController.getAllFamilies);
router.get("/:familyId", validateIdToken, familyController.getOneFamily);
router.post(
  "/:familyId",
  validateIdToken,
  upload.single("image"),
  validateUploadFile,
  familyController.saveOneFamilyPicture
);
router.delete(
  "/:familyId/:category/:photoId",
  validateIdToken,
  familyController.removeOneFamilyPicture
);

export default router;
