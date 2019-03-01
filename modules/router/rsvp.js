import express from 'express';
import Joi from 'joi';
import Rsvp from '../models/rsvp';
import mongoose from 'mongoose';

const router = express.Router();


/**
 *Validator params
 * @param {} post
 */
const validatePost = (rsvp) => {
    const schema = Joi.object().keys({
        meetup: Joi.string().trim().required(),
        response: Joi.string().trim().insensitive().valid('yes', 'no', 'maybe')
    });
    return Joi.validate(rsvp, schema);
};


/**
 *  Rsvp endpoint
 */
router.post('/', (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    
    const rsvp = new Rsvp({
        _id: new mongoose.Types.ObjectId(),
        meetup: req.body.meetup,
        response: req.body.response,
    });
    rsvp
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Created rsvp successfully',
                createdRsvp: {
                    _id:result._id,
                    meetup: result.meetup,
                    response: result.response,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/v1/rsvp/' + result._id
                    }
                }
            });
        })
        .catch( err => {
            return res.status(422).json(err);
        });
});


/**
 * GET all rsvp api endpoint
 */
router.get('/', (req, res) =>{
    Rsvp.find()
        .populate('meetup','topic')
        .exec()
        .then((results) => {
            const response = {
                count: results.length,
                Rsvp: results.map(result => {
                    return {
                        _id:result._id,
                        meetup: result.meetup,
                        response: result.response,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/v1/rsvp/' + result._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


/**
 * GET single rsvp
 */
router.get('/:id', (req, res) =>{
    const id = req.params.id;
    Rsvp.findById(id)
        .populate('meetup')
        .exec()
        .then((result) => {
            const response = {
                Rsvp: {
                    _id:result._id,
                    meetup: result.meetup,
                    response: result.response,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/v1/rsvp/' + result._id
                    }
                }
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


/*
 *restful api to delete rsvp
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Rsvp.deleteOne({ _id: id })
        .exec()
        .then(() => {
            return res.status(200).json({
                message: `the rsvp with ID:${id} has successfully been deleted`,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/rsvp/'
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
