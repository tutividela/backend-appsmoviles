import { Router } from 'express';
const router = Router();
import encuestaController from '../controllers/encuesta.controller.js';

router.get('/', encuestaController.getEncuestas);

export default router;