import express from 'express';
import bodyparser from 'body-parser';
import Joi from 'joi';
import meetupdb from '../db/db';

const rsvp = express();

rsvp.use(bodyparser.urlencoded({ extended: false }));
rsvp.use(bodyparser.json());

/**
 *  Rsvp endpoin
 */

module.exports = rsvp;
