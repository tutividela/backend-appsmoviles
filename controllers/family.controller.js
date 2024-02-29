import FamilyModel from '../models/family.js';
import { guardarImagen, borrarImagen } from '../repositories/family.repository.js';
import pkg from 'exifr';
import { categories } from '../utils/types.js';

const { parse } = pkg;

const getAllFamilies = async (req, res) => {
    const category = req.headers.category;
    try {
        const families = await FamilyModel.find({}, category)
        res.status(200).json(families)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneFamily = async (req, res) => {
    let family;
    const familyId = req.params.familyId;
    const category = req.header.category;
    try{
        family = await FamilyModel.findOne({ familyId: familyId }, category)
        if(family == null){
            res.status(404).json({ message: 'Cannot find family' });
            return;
        }
        res.status(200).json(family);
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

const saveOneFamilyPicture = async (req, res) => {
    const file = req.file;
    const familyId = req.params.familyId;
    const category = req.body.category;
    const successMessage = 'Picture from '+category+' saved successfully';
    const errorMessage = 'Error uploading image';
    const exifTotal = await parse(file.path);
    const latitude = exifTotal?.latitude? exifTotal.latitude : null;
    const longitude = exifTotal?.longitude ? exifTotal.longitude : null;

    const imagenData = {familyId: familyId, category: category, file: file, latitude: latitude, longitude: longitude};

    if (!categories[category]){
        res.status(400).json({ message: errorMessage });
        return;
    }
    try{
        await guardarImagen(imagenData);
        res.status(200).json({ message: successMessage });
    }catch(err){
        res.status(500).json({message: err.message});
    }

}

const removeOneFamilyPicture = async (req, res) => {
    const {familyId, category, photoId} = req.params;
    const successMessage = 'Picture from '+category+' deleted successfully';
    const errorMessage = 'Error deleting image';

    if (!categories[category]) {
        res.status(400).json({ message: errorMessage });
    }
    try{
        await borrarImagen({familyId: familyId, category: category, photoId: photoId})
        res.status(200).json({ message: successMessage });
    } catch(err){
        res.status(500).json({message: err.message})
    }               

}

export default {getAllFamilies, getOneFamily, saveOneFamilyPicture, removeOneFamilyPicture}