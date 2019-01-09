/* app.js */

const bodyParser = require('body-parser');
const express = require('express');
const meetupdb = require('./db/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get a specific meetup record
app.get('/api/v1/meetup-record', (req, res) => {
  const specificMeetup = meetupdb.meetupPost[1];

  res.status(200).send({
    status: 200,
    message: 'meetup database retrieved successfully',
    specificMeetup,
  });
});

module.exports = app;
