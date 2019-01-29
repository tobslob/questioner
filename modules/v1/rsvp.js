import express from 'express';
import bodyparser from 'body-parser';
import Joi from 'joi';
import meetupdb from '../db/db';

const rsvp = express();

rsvp.use(bodyparser.urlencoded({ extended: false }));
rsvp.use(bodyparser.json());


/**
 *  Rsvp endpoint
 */
rsvp.post('/v1/rsvp-meetup/:id', (req, res) => {
  const requestId = req.params.id;
  const data = req.body;
  const Rsvp = meetupdb.rsvp;
  const meetUp = meetupdb.meetuppost;
  const User = meetupdb.user[0];
  const schema = Joi.object().keys({
    response: Joi.string().trim().insensitive().valid('yes', 'no', 'maybe')
      .required(),
  });
  Joi.validate(data, schema, (err, result) => {
    const id = Rsvp.length + 1;
    // eslint-disable-next-line eqeqeq
    const rsvpmeetup = meetUp.filter(specific => specific.id == requestId)[0];
    const meetup = rsvpmeetup.id;
    const Topic = rsvpmeetup.topic;
    const date = rsvpmeetup.happeningOn;
    const user = User.id;

    if (err) {
      res.json({ status: 422, message: 'You can either enter "maybe", "no" and "yes"' });
    }
    res.json({
      status: 200,
      message: `your response has been saved for ${Topic} meetup\n Date: ${date}`,
      data: Object.assign({ id, meetup, user }, result),
    });
  });
});

module.exports = rsvp;
