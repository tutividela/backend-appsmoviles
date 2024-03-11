import { obtenerEncuestas } from "../repositories/encuesta.repository.js";

const getEncuestas = async (req, res, next) => {
  try {
    const encuestas = await obtenerEncuestas();

    res.status(200).json(encuestas);
  } catch (err) {
    next(err);
  }
};

export default { getEncuestas };
