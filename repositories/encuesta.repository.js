const Encuesta = require('../models/encuesta');
const obtenerEncuestas = async () => {
    return await Encuesta.find({});
}

module.exports={obtenerEncuestas}