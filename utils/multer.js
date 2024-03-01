// // // Start Multer config // // //
import multer, { diskStorage } from 'multer';
import { mkdirSync } from 'fs';

const storage = diskStorage({
    destination: function (req, file, cb) {
        mkdirSync('images/'+req.params.familyId+'/', { recursive: true })
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

export const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024*1024*10 } })
// // // End Multer config // // //