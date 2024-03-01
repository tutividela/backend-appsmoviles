import { Router } from 'express';
import encuestaController from '../controllers/encuesta.controller.js';

const router = Router();

router.get('/', encuestaController.getEncuestas);

export default router;