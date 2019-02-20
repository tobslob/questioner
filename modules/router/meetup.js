import express from 'express';
import Joi from 'joi';
import meetupdb from '../db/db';

const router = express.Router();

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
    });
    return Joi.validate(post, schema);
};


/**
 *api to create meetup
*/
router.post('/', (req, res) => {
    const { error } = validatePost(req.body);
    const id = meetupdb.meetuppost.length + 1;
    const createdOn = new Date();
    if (error) return res.status(422).json({ message: error.details[0].message });

    const post = {
        id,
        createdOn,
        topic: req.body.topic,
        images: req.body.images,
        location: req.body.location,
        body: req.body.body,
        happeningOn: req.body.happeningOn,
        Tags: req.body.Tags,
    };
    meetupdb.meetuppost.push(post);
    return res.status(201).json({
        data: post,
        message: 'meetup successfully posted'
    });
});


/*
*api to get all meetup post
*/
router.get('/', (req, res) => {
    const result = meetupdb.meetuppost;
    if (!result) return res.status(422).send('an error occur!');

    return res.status(200).json({
        data: result,
        message: 'success'
    });
});


/*
 * api to get specific meetup
 */
router.get('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const requestelement = parseInt(req.params.id);
    const specMeetup = meetupdb.meetuppost;

    const specmeetup = specMeetup.find(specific => specific.id === requestelement);
    if (!specmeetup) return res.status(404).send('no meetup id match');

    return res.status(200).json({
        data: specmeetup,
        message: 'success'
    });
});


/*
 * An API endpoint to edit meetup post
 */
router.patch('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const requestelement = parseInt(req.params.id);
    const specMeetup = meetupdb.meetuppost;

    const specmeetup = specMeetup.find(specific => specific.id === requestelement);
    if (!specmeetup) res.status(404).send('no meetup id match');

    const { error } = validatePost(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });

    specmeetup.topic = req.body.topic;
    specmeetup.images = req.body.images;
    specmeetup.location = req.body.location;
    specmeetup.body = req.body.body;
    specmeetup.happeningOn = req.body.happeningOn;
    specmeetup.Tags = req.body.Tags;
    return res.json({
        data: specmeetup,
        message: 'success'
    });
});


/*
 *restful api to delete meetup
 */
router.delete('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const deleteId = parseInt(req.params.id);
    const specMeetup = meetupdb.meetuppost;

    const specmeetup = specMeetup.find(specific => specific.id === deleteId);
    if (!specmeetup) return res.status(404).send('no meetup id match');

    const index = specMeetup.indexOf(specmeetup);
    specMeetup.splice(index, 1);
    return res.status(200).json(`meetup with an id: ${deleteId} has been deleted`);
});


module.exports = router;
