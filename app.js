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

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`listening to server on port ${port}...`);
});

module.exports = app;
