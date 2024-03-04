import { Schema, model } from "mongoose";

const EncuestaSchema = new Schema({
  encuestaUno: {
    direccion: {
      partido: String,
      provincia: String,
      barrio: String,
    },
  },
  estado: String,
  apellido: String,
});

export default model("Encuesta", EncuestaSchema, "Encuesta");
