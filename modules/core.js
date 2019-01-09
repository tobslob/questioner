const bodyParser = require('body-parser');
const express = require('express');
const meetupdb = require('./db/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;

// get a specific meetup post
let result;
app.post('/api/v1/meetup-post', (req, res) => {
  for (let i = 0; i < meetupdb.meetuppost.length; i = +1) {
    if (!meetupdb.meetuppost[i].title) {
      return res.status(400).send({
        status: '400',
        message: 'Please input the title for the particular meetup...',
      });
    } if (meetupdb.meetuppost[i].title) {
      app.get('/api/v1/meetup-post', (request, response) => {
        response.status(200).send({
          status: 200,
          message: 'meetup retrieved successfully',
        });
      });
    }
  }
  return result;
});

// get all meetup record
app.get('/api/v1/all-meetup', (req, res) => {
  const allMeetup = meetupdb.meetuppost;
  res.status(200).send({
    status: 200,
    message: 'meetup database retrieved successfully',
    allMeetup,
  });
});
