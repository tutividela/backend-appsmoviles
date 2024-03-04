import FamilyModel from "../models/family.js";
import {
  guardarImagen,
  borrarImagen,
} from "../repositories/family.repository.js";
import exifr from "exifr";
import { categories } from "../utils/types.js";
const { parse } = exifr;

const getAllFamilies = async (req, res) => {
  try {
    const category = req.headers.category;
    const families = await FamilyModel.find({}, category);

    return res.status(200).json(families);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneFamily = async (req, res) => {
  try {
    let family;
    const familyId = req.params.familyId;
    const category = req.header.category;

    family = await FamilyModel.findOne({ familyId: familyId }, category);
    if (family == null) {
      return res.status(404).json({ message: "Familia no encontrada" });
    }
    return res.status(200).json(family);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const saveOneFamilyPicture = async (req, res) => {
  const file = req.file;
  const familyId = req.params.familyId;
  const category = req.body.category;
  const exifTotal = await parse(file.path);
  const latitude = exifTotal?.latitude ? exifTotal.latitude : null;
  const longitude = exifTotal?.longitude ? exifTotal.longitude : null;
  const imagenData = {
    familyId: familyId,
    category: category,
    file: file,
    latitude: latitude,
    longitude: longitude,
  };
  const errorMessage = 'Error uploading image';

  if (!categories[category]) {
    return res.status(400).json({ message: errorMessage });
  }
  try {
    await guardarImagen(imagenData);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeOneFamilyPicture = async (req, res) => {
  const { familyId, category, photoId } = req.params;
  const errorMessage = "Error deleting image";

  if (!categories[category]) {
    res.status(400).json({ message: errorMessage });
  }
  try {
    await borrarImagen({
      familyId: familyId,
      category: category,
      photoId: photoId,
    });
    
    return res.status(204);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default {
  getAllFamilies,
  getOneFamily,
  saveOneFamilyPicture,
  removeOneFamilyPicture,
};
