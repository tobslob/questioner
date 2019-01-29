import core from './modules/core';
import meetup from './modules/v1/meetup';
import question from './modules/v1/question';
import rsvp from './modules/v1/rsvp';

const express = require('express');

const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(core);
app.use(meetup);
app.use(question);
app.use(rsvp);

module.exports = app;
