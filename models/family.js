  
const mongoose = require('mongoose')

const FamilySchema = new mongoose.Schema({
  
  familyId: String,

  // Censo Construccion
  PreCC_croquisE1: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PreCC_delanteCasa: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PreCC_bano: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PreCC_contratoAsignacion: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PreCC_fichaInspeccionPozos: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],

  PostCC_modulo: [{
    path: String,
    latitude: Number,
    longitude: Number,
  }],
  PostCC_familiaDentro: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PostCC_higienizacion: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PostCC_cartaDonacion: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],
  PostCC_cartaCesionImagen: [{
    imageName: String,
    latitude: Number,
    longitude: Number,
  }],

})

module.exports = mongoose.model('Family', FamilySchema, 'families')

/*Fotos Pre CC:
- Croquis encuesta 1 (vivienda, terreno y obstáculos constructivos).
- Foto familia delante de la casa.
- Baño actual. (obligatoria)
·  Inodoro
·  Pozo/balde
- Contrato de asignación firmado.
- Ficha inspección de pozos (incluye croquis con pozo y obstáculos
constructivos)
Post CC:
- Módulo Sanitario por dentro
- Familia dentro del MS terminado
- Niños/as y adultos cepillándose los dientes/lavándose las manos dentro del MS
- Foto carta de donación del MS
- Foto carta cesión de imagen*/