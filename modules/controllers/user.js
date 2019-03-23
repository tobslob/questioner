// import Joi from 'joi';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import config from '../../config';
// import pg from 'pg';

// const configuration = {
//     user: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'questiondb',
//     password: 'Kazeem27',
// };

// const pool = new pg.Pool(configuration);

// pool.on('connect', () => {
//     // eslint-disable-next-line no-console
//     console.log('connected');
// });


// /**
//  *Validator params
//  * @param {} post
//  */
// const validateUser = (user) => {
//     const schema = Joi.object().keys({
//         firstName: Joi.string().trim().required(),
//         lastName: Joi.string().trim().required(),
//         otherName: Joi.string().trim().required(),
//         email: Joi.string().email().trim().required(),
//         password: Joi.string().alphanum().min(8).max(10).trim().required(),
//         phoneNumber: Joi.string().trim().required(),
//         userName: Joi.string().trim().required()
//     });
//     return Joi.validate(user, schema);
// };

// exports.post_user = (req, res) => {
//     const {error} = validateUser(req.body);
//     if (error) return res.status(422).json({ message: error.details[0].message });
//     if (!req.file) return res.send('Please upload a file');
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             res.status(500).json({
//                 message: 'retype password',
//                 error: err
//             });
//         } else {
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 otherName: req.body.otherName,
//                 email: req.body.email,
//                 phoneNumber: req.body.phoneNumber,
//                 userName: req.body.userName,
//                 password: hash,
//                 userImage: req.file.path,
//             });
//             user.save()
//                 .then((result) => {
//                     res.status(201).json({
//                         message: 'User created',
//                         User: {
//                             userImage: result.userImage,
//                             firstname: result.firstName,
//                             lastname: result.lastName,
//                             othername: result.otherName,
//                             email: result.email,
//                             phoneNumber: result.phoneNumber,
//                             username: result.username,
//                             password: result.password,
//                             createdOn: result.createdOn,
//                             isAdmin: result.isAdmin,
//                             request: {
//                                 type: 'GET',
//                                 url: 'http://localhost:3000/api/v1/user/' + result._id
//                             }
//                         }
//                     });
//                 })
//                 .catch((err) => {
//                     res.status(422).json(err);
//                 }); 
//         }
//     });

    
// };


// exports.login_router = (req, res) => {
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(401).json({
//                     message: 'Authentication failed!'
//                 });
//             }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                 if (err) {
//                     return res.status(401).json({
//                         message: 'Incorrect logins'
//                     });
//                 }
//                 if (result) {
//                     const token = jwt.sign({
//                         email: user[0].email,
//                         userId: user[0]._id
//                     }, config.secret, 
//                     {
//                         expiresIn: '1h'
//                     });
//                     return res.status(200).json({
//                         message: 'Authentication successful',
//                         token: token
//                     });
//                 }
//                 res.status(401).json({
//                     mesaage: 'Authentication failed!'
//                 });
//             });
//         })
//         .catch((err) => {
//             res.status(422).json({
//                 error: err
//             });
//         });
// };


// exports.get_users = (req, res) => {
//     User.find()
//         .exec()
//         .then((result) => {
//             const response = {
//                 count: result.length,
//                 user: result.map(result => {
//                     return {
//                         _id: result._id,
//                         firstName: result.firstName,
//                         lastName: result.lastName,
//                         otherName: result.otherName,
//                         email: result.email,
//                         phoneNumber: result.phoneNumber,
//                         userName: result.userName,
//                         createdOn: result.createdOn,
//                         isAdmin: result.isAdmin,
//                         userImage: result.userImage,
//                         password: result.password,
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/api/v1/user/' + result._id
//                         }
//                     };
//                 })

//             };
//             res.status(200).json(response); 
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: 'an error occur',
//                 error: err
//             });
//         });
// };


// exports.get_user = (req, res) => {
//     const id = req.params.id;
//     User.findById(id)
//         .exec()
//         .then(doc=>{
//             res.status(200).json({
//                 Meetup: doc,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/api/v1/user'
//                 }
//             });
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: 'an error occur',
//                 error: err
//             });
//         });
// };


// exports.patch_user = (req, res) => {
//     const id = req.params.id;
//     const updateOps = {};
//     for (const ops of req.body) {
//         if (ops.propName == 'password') {
//             bcrypt.hash(ops.value, 10, (err, hash) => {
//                 if (err) {
//                     res.status(500).json({
//                         message: 'retype password',
//                         error: err
//                     });
//                 }
//                 else {
//                     updateOps[ops.propName] = hash;
//                     User.updateOne({ _id: id }, { $set: updateOps })
//                         .exec()
//                         .then( ()=> {
//                             return res.status(200).json({
//                                 message: 'Successfully updated',
//                                 request: {
//                                     type: 'GET',
//                                     url: 'http://localhost:3000/api/v1/user/' + id
//                                 }
//                             });
//                         })
//                         .catch(err=>{
//                             return res.status(500).json({
//                                 error: err
//                             });
//                         });
//                 }
//             });
//         } else {
//             updateOps[ops.propName] = ops.value;
//             User.updateOne({ _id: id }, { $set: updateOps })
//                 .exec()
//                 .then( ()=> {
//                     return res.status(200).json({
//                         message: 'Successfully updated',
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/api/v1/user/' + id
//                         }
//                     });
//                 })
//                 .catch(err=>{
//                     return res.status(500).json({
//                         error: err
//                     });
//                 });
//         }
//     }
    
// };


// exports.delete_user = (req, res) => {
//     const id = req.params.id;
//     User.deleteOne({ _id: id })
//         .exec()
//         .then(() => {
//             return res.status(200).json({
//                 message: `the user with ID:${id} has successfully been deleted`,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/api/v1/user'
//                 }
//             });
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 error: err
//             });
//         });
// };
