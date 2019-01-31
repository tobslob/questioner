import http from 'http';
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

const server = http.createServer();

server.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('server started...');
});

module.exports = app;
