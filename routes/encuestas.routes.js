const express = require('express');
const router = express.Router();
const encuestaController = require('../controllers/encuesta.controller');

router.get('/', encuestaController.getEncuestas);

module.exports = router;