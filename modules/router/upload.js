// import express from 'express';
// import checkAuth from '../middleware/check-auth';
// import userControllers from '../controllers/user';


// const router = express.Router();


// import multer from 'multer';

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true);
//     } else {
//         cb(new Error('Only .jpeg or .png files are accepted'), true);
//     }
// };
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
//     }
// });
// const upload = multer({
//     storage: storage,
//     limits:{
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


// /**
//  * user endpoint api
//  */
// router.post('/userImage', checkAuth, upload.single('userImage'), userControllers.post_userImage);

// /**
//  * user endpoint api
//  */
// router.post('/meetupImage',  checkAuth, upload.single('userImage'), userControllers.post_meetupImage);