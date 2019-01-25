import express from 'express';
import bodyparser from 'body-parser';
import Joi from 'joi';
import ImageJoi from 'joi-image-extension';
import meetupdb from '../db/db';

const meetup = express();

const ImgJoi = Joi.extend(ImageJoi);

meetup.use(bodyparser.urlencoded({ extended: false }));
meetup.use(bodyparser.json());


/*
 *api to create meetup
*/
meetup.post('/v1/create-meetup', (req, res) => {
  const schema = Joi.object().keys({
    id: meetupdb.meetuppost.length + 1,
    createdOn: Joi.date().required(),
    location: Joi.string().trim().required(),
    images: ImgJoi.image().allowTypes(['png', 'bmp']),
    topic: Joi.string().trim().required(),
    body: Joi.string().trim().required(),
    happeningOn: Joi.date().required(),
    Tags: Joi.array().items(Joi.string().trim()).required(),
  });

  const data = Joi.validate(
    req.body, schema, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(result);
    },
  );
  meetupdb.meetuppost.push(data);
});


/*
*api to get all meetup post
*/
meetup.get('/v1/get-all-meetup', (req, res) => {
  const result = meetupdb.meetuppost;
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send('an error occur!');
  }
});

module.exports = meetup;
