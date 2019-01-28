import express from 'express';
import bodyparser from 'body-parser';
import Joi from 'joi';
import meetupdb from '../db/db';

const question = express();

question.use(bodyparser.urlencoded({ extended: false }));
question.use(bodyparser.json());


/*
 * users api to create question/comment
 */
question.post('/v1/create-question', (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    title: Joi.string().trim().required(),
    body: Joi.string().trim().required(),
  });
  Joi.validate(req.body, schema, (err, result) => {
    const newquest = meetupdb.questions;
    const id = meetupdb.questions.length + 1;
    const createdOn = Date();
    const createdBy = 1002;
    const votes = 0;
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data,
      });
    }
    res.json({
      status: 'success',
      message: 'User created successfully',
      data: Object.assign({
        id, createdOn, createdBy, votes,
      },
      result),
    });
    newquest.push(data);
  });
});

module.exports = question;
