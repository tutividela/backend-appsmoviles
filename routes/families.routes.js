import { Router } from "express";
import familyController from "../controllers/family.controller.js";
import { upload } from "../utils/multer.js";
import { validateUploadFile } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", familyController.getAllFamilies);
router.get("/:familyId", familyController.getOneFamily);
router.post(
  "/:familyId",
  upload.single("image"),
  validateUploadFile,
  familyController.saveOneFamilyPicture
);
router.delete(
  "/:familyId/:category/:photoId",
  familyController.removeOneFamilyPicture
);

export default router;
