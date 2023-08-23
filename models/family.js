  
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

module.exports = mongoose.model('Family', FamilySchema, 'families');