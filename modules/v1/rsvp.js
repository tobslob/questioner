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

  if (result.error) return res.json({ status: 422, message: 'You can either enter "maybe", "no" and "yes"' });

  const RSVP = {
    id,
    meetup,
    Topic,
    date,
    user,
    response: req.body.response,
  };
  return res.status(200).send(RSVP);
});


module.exports = rsvp;
