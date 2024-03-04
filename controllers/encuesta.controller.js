import { obtenerEncuestas } from "../repositories/encuesta.repository.js";

const getEncuestas = async (req, res) => {
  try {
    const encuestas = await obtenerEncuestas();
    console.log(encuestas);
    res.status(200).json(encuestas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getEncuestas };
