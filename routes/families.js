const express = require('express');
const router = express.Router();
require('../utils/multer');
const familyController = require('../controllers/family.controller');
const { upload } = require('../utils/multer');

router.get('/', familyController.getAllFamilies);
router.get('/:familyId', familyController.getOneFamily);
router.post('/:familyId', upload.single('image'), familyController.saveOneFamilyPicture);
router.delete('/:familyId/:category/:photoId', familyController.removeOneFamilyPicture);

module.exports = router