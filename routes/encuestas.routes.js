import { Router } from "express";
import encuestaController from "../controllers/encuesta.controller.js";
import { validateIdToken } from "../middlewares/idTokenValidation.middleware.js";

const router = Router();

router.get("/", validateIdToken ,encuestaController.getEncuestas);

export default router;
