// import express from 'express';
// import multer from 'multer';
// // import checkAuth from '../middleware/check-auth';
// import userControllers from '../controllers/user';


// const router = express.Router();
// const fileFilter = (req, file, cb) =>{
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
// router.post('/signup', upload.single('userImage'), userControllers.post_user);


// /**
//  * Login router
//  */
// router.post('/login', userControllers.login_router);



// /**
//  * GET user endpoint api
//  */
// router.get('/', userControllers.get_users);


// /**
//  * GET single user endpoint api
//  */
// router.get('/:id', userControllers.get_user);


// /*
//  * An API endpoint to patch user
//  */
// router.patch('/:id', userControllers.patch_user);

// /*
//  * An API endpoint to delete user
//  */
// router.delete('/:id', userControllers.delete_user);

// module.exports = router;