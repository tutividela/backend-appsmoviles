import Encuesta from '../models/encuesta.js';

export const obtenerEncuestas = async () => {
    return await Encuesta.find({});
}