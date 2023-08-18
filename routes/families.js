const express = require('express')
const router = express.Router()
const Family = require('../models/family')
const fs = require('fs')
const https = require('https')
const exifr = require('exifr') 

const categories = [ 
    'PreCC_croquisE1' , 
    'PreCC_delanteCasa', 
    'PreCC_bano',
    'PreCC_contratoAsignacion',
    'PreCC_fichaInspeccionPozos',
    'PostCC_modulo',
    'PostCC_familiaDentro',
    'PostCC_higienizacion',
    'PostCC_cartaDonacion',
    'PostCC_cartaCesionImagen'
]

// // // Start Multer config // // //
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync('images/'+req.params.familyId+'/', { recursive: true })
        cb(null, 'images/'+req.params.familyId)
    },
    filename: function (req, file, cb) {
        cb(null, req.params.familyId + '-' + Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024*1024*10 } })
// // // End Multer config // // //

async function getFamily (req, res, next){
    let family
    try{
        family = await Family.findOne({ familyId: req.params.familyId }, req.headers.category)
        if(Family == null){
            return res.status(404).json({ message: 'Cannot find family' })
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.family = family
    next()
}


// Add family to database if it was never added before
async function createFamilyIfNotRegistered(req, res, next){
    
    // Check if family id exists in main backend
    https_options = {
        hostname: 'modulo-backoffice.herokuapp.com',
        path: '/families/obtain-resumed-family/'+req.params.familyId,
        method: 'GET',
        headers: {
            'Authorization': req.headers.authorization
        }
    }
    
    https.get(https_options, (resp) => {
        
        // Start constructing data from request
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk
        })

        resp.on('end', () => {
            
            // Check if family id exists in main backend observing the status code
            if(resp.statusCode < 200 || resp.statusCode >= 300){
                // If data is null, the family id does not exist in the main backend
                return res.status(404).json({ message: 'Error obtaining data from backend' })
            } else {
                // If data is not null, the family id exists in the main backend
                // Next step is to check if the family id exists in the database
                Family.findOne({ familyId: req.params.familyId }, async (err, family) => {
                    if(err){
                        return res.status(500).json({ message: err.message })
                    } else if(family == null){
                        // If family id does not exist in the database, create it
                        console.log("Family doesnt exist, I will create it")
                        const family = new Family({
                            familyId: req.params.familyId,
                        })
                        try {
                            const newFamily = await family.save()
                            console.log("Family saved")
                            next()
                        } catch (error) {
                            return res.status(500).json({ message: error.message })
                        }
                    } else {
                        // If family id exists in the database, do nothing
                        console.log('Family exists in database')
                        next()
                    }
                })
            }
        })
    })
    
}
    

// Getting all
router.get('/', async (req, res) => {

    // Verify if category is one of the valid categories
    // If headers.category is empty, then all categories are returned
    // If headers.category is not empty, then only the category is returned
    try {
        const families = await Family.find({}, req.headers.category)
        res.status(200).json(families)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get one family
router.get('/:familyId', getFamily,  (req, res) => {
    res.status(200).json(res.family)
})

// Get an image
/*router.get('/:familyId/:imageName', jwtAuthCheck, (req, res) => {
    var path = require('path');
    try {
        let resolvedPath = path.resolve('images/'+req.params.familyId+'/'+req.params.imageName)
        if(fs.existsSync(resolvedPath)){
            res.sendFile(resolvedPath)
        } else {
            res.status(404).json({ message: 'Incorrect path' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})*/


// Add one image
router.post('/:familyId', upload.single('image'), async (req, res) => {
    
    console.log(req.file)
    // Image was uploaded from upload.single('image')

    // We wait for the image to be saved in the database
    await new Promise(resolve => setTimeout(resolve, 5000));

    let exifTotal = await exifr.parse(req.file.path)
    console.log('Exif vale: '+JSON.stringify(exifTotal))
    if(!(exifTotal.latitude != null && exifTotal.longitude != null)){
        latitude = null
        longitude = null
    } else {
        latitude = exifTotal.latitude
        longitude = exifTotal.longitude
    }

    /*let {latitude, longitude} = await exifr.gps(req.file.path)*/
    console.log('Latitud vale: ' + latitude + ' Longitud vale: ' + longitude)

    // Now we have to update mongodb family with that new image
    try{
        const family = await Family.findOne({ familyId: req.params.familyId }).populate('family').exec().then(family => {

            switch (req.body.category) {
                case 'PreCC_croquisE1': family.PreCC_croquisE1.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PreCC_delanteCasa': family.PreCC_delanteCasa.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PreCC_bano': family.PreCC_bano.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PreCC_contratoAsignacion': family.PreCC_contratoAsignacion.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PreCC_fichaInspeccionPozos': family.PreCC_fichaInspeccionPozos.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PostCC_modulo': family.PostCC_modulo.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PostCC_familiaDentro': family.PostCC_familiaDentro.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PostCC_higienizacion': family.PostCC_higienizacion.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PostCC_cartaDonacion': family.PostCC_cartaDonacion.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                case 'PostCC_cartaCesionImagen': family.PostCC_cartaCesionImagen.push({imageName: req.file.filename, latitude: latitude, longitude: longitude}); break ;
                default: res.status(400).json({ message: 'Error uploading image' }); break ;
            }
        family.save()
        console.log('Guardo los cambios')
        res.status(200).json({ message: 'Picture from '+req.body.category+' saved successfully' })
        })

    }catch(err){
        res.status(500).json({message: err.message})
    }

})

// Updating one
/*router.patch('/:id', getFamily, async (req, res) => {
    if(req.body.name != null){
        res.family.name = req.body.name
    }
    if (req.body.subscribedToChannel != null){
        res.family.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedFamily = await res.family.save()
        res.json(updatedFamily)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})*/

// Deleting one picture from a family
router.delete('/:familyId/:category/:photoId', async (req, res) => {
    
    // Data is received in the parameters
    // We have to delete it from the database
    console.log('familyId vale: '+req.params.familyId)
    console.log('Category vale: '+req.params.category)
    console.log('photoId vale: '+req.params.photoId)

    let image

    try{
        const family = await Family.findOne({ familyId: req.params.familyId }).populate('family').exec().then(family => {
            
            // I need to delete the family from mongo and then from the filesystem
            switch (req.params.category) {
                case 'PreCC_croquisE1': image = family.PreCC_croquisE1.id(req.params.photoId); break ;
                case 'PreCC_delanteCasa': image = family.PreCC_delanteCasa.id(req.params.photoId); break ;
                case 'PreCC_bano': image = family.PreCC_bano.id(req.params.photoId); break ;
                case 'PreCC_contratoAsignacion': image = family.PreCC_contratoAsignacion.id(req.params.photoId); break ;
                case 'PreCC_fichaInspeccionPozos': image = family.PreCC_fichaInspeccionPozos.id(req.params.photoId); break ;
                case 'PostCC_modulo': image = family.PostCC_modulo.id(req.params.photoId); break ;
                case 'PostCC_familiaDentro': image = family.PostCC_familiaDentro.id(req.params.photoId); break ;
                case 'PostCC_higienizacion': image = family.PostCC_higienizacion.id(req.params.photoId); break ;
                case 'PostCC_cartaDonacion': image = family.PostCC_cartaDonacion.id(req.params.photoId); break ;
                case 'PostCC_cartaCesionImagen': image = family.PostCC_cartaCesionImagen.id(req.params.photoId); break ;
                default: res.status(400).json({ message: 'Error deleting image' }); break ;
            }
            image.remove()
            family.save()
            console.log('Image vale: '+image)

            console.log('Imagen eliminada de mongo')
        
            fs.unlink('./images/'+req.params.familyId+'/'+image.imageName, (err) => {
                if (err) throw err;
                console.log('Imagen eliminada de filesystem');
            });
            res.status(200).json({ message: 'Picture from '+req.params.category+' deleted successfully' })
        })
    } catch(err){
        res.status(500).json({message: err.message})
    }               

})

module.exports = router