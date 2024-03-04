import { categories } from "../utils/types.js";
import Family from "../models/family.js";
import { unlink } from "fs";

const guardarImagen = async (imagenData) => {
  return await Family.findOne({ familyId: imagenData.familyId }).then(
    (family) => {
      switch (imagenData.category) {
        case categories.PreCC_croquisE1:
          family.PreCC_croquisE1.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PreCC_delanteCasa:
          family.PreCC_delanteCasa.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PreCC_bano:
          family.PreCC_bano.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PreCC_contratoAsignacion:
          family.PreCC_contratoAsignacion.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PreCC_fichaInspeccionPozos:
          family.PreCC_fichaInspeccionPozos.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PostCC_modulo:
          family.PostCC_modulo.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PostCC_familiaDentro:
          family.PostCC_familiaDentro.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PostCC_higienizacion:
          family.PostCC_higienizacion.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PostCC_cartaDonacion:
          family.PostCC_cartaDonacion.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
        case categories.PostCC_cartaCesionImagen:
          family.PostCC_cartaCesionImagen.push({
            imageName: imagenData.file.filename,
            latitude: imagenData.latitude,
            longitude: imagenData.longitude,
          });
          break;
      }
      family.save();
    }
  );
};

const borrarImagen = async (imagenData) => {
  let image;
  return await Family.findOne({ familyId: imagenData.familyId }).then(
    async (family) => {
      switch (imagenData.category) {
        case categories.PreCC_croquisE1:
          image = family.PreCC_croquisE1.id(imagenData.photoId);
          break;
        case categories.PreCC_delanteCasa:
          image = family.PreCC_delanteCasa.id(imagenData.photoId);
          break;
        case categories.PreCC_bano:
          image = family.PreCC_bano.id(imagenData.photoId);
          break;
        case categories.PreCC_contratoAsignacion:
          image = family.PreCC_contratoAsignacion.id(imagenData.photoId);
          break;
        case categories.PreCC_fichaInspeccionPozos:
          image = family.PreCC_fichaInspeccionPozos.id(imagenData.photoId);
          break;
        case categories.PostCC_modulo:
          image = family.PostCC_modulo.id(imagenData.photoId);
          break;
        case categories.PostCC_familiaDentro:
          image = family.PostCC_familiaDentro.id(imagenData.photoId);
          break;
        case categories.PostCC_higienizacion:
          image = family.PostCC_higienizacion.id(imagenData.photoId);
          break;
        case categories.PostCC_cartaDonacion:
          image = family.PostCC_cartaDonacion.id(imagenData.photoId);
          break;
        case categories.PostCC_cartaCesionImagen:
          image = family.PostCC_cartaCesionImagen.id(imagenData.photoId);
          break;
      }
      image.deleteOne();
      await family.save();

      unlink(
        "./images/" + imagenData.familyId + "/" + image.imageName,
        function(err) {
          if (err) throw err;
          console.log("Imagen eliminada de filesystem");
        }
      );
    }
  );
};

export { guardarImagen, borrarImagen };
