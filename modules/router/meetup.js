import express from 'express';
import checkAuth from '../middleware/check-auth';
import meetupControllers from '../controllers/meetup';
import multer from 'multer';

const router = express.Router();

const fileFilter = (req, file, cb) =>{
    // reject a file
    if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg or .png files are accepted'), true);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
    }
});
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


/**
 *api to create meetup
*/
router.post('/', checkAuth, upload.single('meetupImage'), meetupControllers.post_meetup);

/*
*api to get all meetup post
*/
router.get('/', checkAuth, meetupControllers.get_all_meetup);


/*
 * api to get specific meetup
 */
router.get('/:id', checkAuth, meetupControllers.get_meetup);


/*
 * An API endpoint to edit meetup post
 */
router.patch('/:id', checkAuth, upload.single('meetupImage'), meetupControllers.patch_meetup);


/*
 *restful api to delete meetup
 */
router.delete('/:id', checkAuth, meetupControllers.delete_meetup);

module.exports = router;
