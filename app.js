import core from './modules/core';
import meetup from './modules/v1/meetup';
import question from './modules/v1/question';

const express = require('express');

const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(core);
app.use(meetup);
app.use(question);

module.exports = app;
