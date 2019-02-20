import express from 'express';
import Joi from 'joi';
import meetupdb from '../db/db';

const router = express.Router();


/**
 *  Rsvp endpoint
 */
router.post('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const requestId = parseInt(req.params.id);

    const Rsvp = meetupdb.rsvp;
    const meetUp = meetupdb.meetuppost;
    const User = meetupdb.user[0];
    const schema = Joi.object().keys({
        response: Joi.string().trim().insensitive().valid('yes', 'no', 'maybe')
            .required(),
    });
    const result = Joi.validate(req.body, schema);

    const rsvpmeetup = meetUp.find(specific => specific.id === requestId);

    const id = Rsvp.length + 1;
    const meetup = rsvpmeetup.id;
    const Topic = rsvpmeetup.topic;
    const date = rsvpmeetup.happeningOn;
    const user = User.id;

    if (result.error) return res.status(422).json({ message: 'You can either enter "maybe", "no" and "yes"' });

    const RSVP = {
        id,
        meetup,
        Topic,
        date,
        user,
        response: req.body.response,
    };
    return res.status(200).json({
        data: RSVP,
        message: 'RSVP successfully posted'
    });
});


module.exports = router;
