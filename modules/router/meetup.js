import express from 'express';
import Joi from 'joi';
import Meetup from '../models/meetup';
import mongoose from 'mongoose';
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
 *Validator params
 * @param {} post
 */
const validatePost = (post) => {
    const schema = Joi.object().keys({
        location: Joi.string().trim().required(),
        topic: Joi.string().trim().required(),
        body: Joi.string().trim().required(),
        happeningOn: Joi.date().required(),
        Tags: Joi.array().items(Joi.string().trim()).required(),
        meetupImage: Joi.string()
    });
    return Joi.validate(post, schema);
};


/**
 *api to create meetup
*/
router.post('/', upload.single('meetupImage'),(req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    
    if (!req.file) return res.send('Please upload a file');
    // eslint-disable-next-line no-console
    console.log(req.file);
    const meetup = new Meetup({
        _id: new mongoose.Types.ObjectId(),
        topic: req.body.topic,
        location: req.body.location,
        body: req.body.body,
        happeningOn: req.body.happeningOn,
        Tags: req.body.Tags,
        meetupImage: req.file.path
    });
    meetup
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Created meetup successfully',
                CreatedMeetup: {
                    _id:result._id,
                    topic: result.topic,
                    location: result.location,
                    body: result.body, 
                    happeningOn: result.happeningOn,
                    createdOn: result.createdOn,
                    meetupImage: result.meetupImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/v1/meetup/' + result._id
                    }
                }
            });
        })
        .catch( err => {
            res.status(422).json(err);
        });
});


/*
*api to get all meetup post
*/
router.get('/', (req, res) => {
    Meetup.find()
        .select('_id topic location body happeningOn createdOn Tags meetupImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Meetups: docs.map(doc => {
                    return{
                        _id:doc._id,
                        topic: doc.topic,
                        location: doc.location,
                        body: doc.body,
                        happeningOn: doc.happeningOn,
                        createdOn: doc.createdOn,
                        meetupImage: doc.meetupImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/v1/meetup/' + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


/*
 * api to get specific meetup
 */
router.get('/:id', (req, res) => {
    
    const requestelement = req.params.id;
    Meetup.findById(requestelement)
        .select('_id topic location body happeningOn createdOn Tags meetupImage')
        .exec()
        .then(doc=>{
            res.status(200).json({
                Meetup: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/meetup/' + requestelement
                }
            });
        })
        .catch(err => {
            res.status(500).json({ 
                error: err,
                message: `the meetup with ID:${requestelement} is not found`
            });
        });
});


/*
 * An API endpoint to edit meetup post
 */
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Meetup.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then( ()=> {
            return res.status(200).json({
                message: 'Successfully updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/meetup/' + id
                }
            });
        })
        .catch(err=>{
            return res.status(500).json({
                error: err
            });
        });
});


/*
 *restful api to delete meetup
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Meetup.deleteOne({ _id: id })
        .exec()
        .then(() => {
            return res.status(200).json({
                message: `the meetup with ID:${id} has successfully been deleted`,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/meetup/'
                }
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
