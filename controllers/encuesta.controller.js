const encuestaRepository = require('../repositories/encuesta.repository');
const getEncuestas = async (req, res) => {
    try {
        const encuestas = await encuestaRepository.obtenerEncuestas();
        console.log(encuestas);
        res.status(200).json(encuestas);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {getEncuestas}