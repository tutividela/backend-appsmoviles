import { Router } from 'express';
const router = Router();
import familyController from '../controllers/family.controller.js';
import { upload } from '../utils/multer.js';

router.get('/', familyController.getAllFamilies);
router.get('/:familyId', familyController.getOneFamily);
router.post('/:familyId', upload.single('image'), familyController.saveOneFamilyPicture);
router.delete('/:familyId/:category/:photoId', familyController.removeOneFamilyPicture);

export default router