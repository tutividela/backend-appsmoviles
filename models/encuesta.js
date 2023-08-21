const mongoose = require('mongoose');

const EncuestaSchema = new mongoose.Schema({
    encuestaUno: {
        direccion: {
            partido: String,
            provincia: String,
            barrio: String,
        }
    },
    estado: String,
    apellido: String,
});

module.exports = mongoose.model('Encuesta', EncuestaSchema, 'Encuesta');