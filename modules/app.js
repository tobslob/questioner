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


// get all meetup record
app.get('/api/v1/all-meetup-record', (req, res) => {
  const allMeetup = meetupdb.meetuppost;

  res.status(200).send({
    status: 200,
    message: 'meetup database retrieved successfully',
    allMeetup,
  });
});


// create a meetup record
app.post('/api/v1/create-meetup', (req, res) => {
  if (!req.body.createdOn || !req.body.happeningOn) {
    return res.status(404).send({
      status: '400',
      message: 'an error occur, please check the created date or meetup date and try again...',
    });
  } if (!req.body.location) {
    return res.status(404).send({
      status: '400',
      message: 'an error occur, please check the location and try again...',
    });
  } if (!req.body.topic) {
    return res.status(404).send({
      status: '400',
      message: 'an error occur, please check the location and try again...',
    });
  } if (!req.body.Tags) {
    return res.status(404).send({
      status: '400',
      message: 'an error occur, please check the tags and try again...',
    });
  }
  const CreateAMeetupRecord = {
    id: meetupdb.default.meetuppost.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    Tags: req.body.Tags,
  };
  meetupdb.meetupPost.push(CreateAMeetupRecord);

  return res.status(200).send({
    status: '200',
    message: 'successfully added meetup record',
    meetupdb,
  });
});


// A question record
app.post('/api/v1/create-question', (req, res) => {
  if (!req.body.createdOn) {
    return res.status(400).send({
      status: '400',
      message: 'an error occur, please check the created date or meetup date and try again...',
    });
  } if (!req.body.createdBy) {
    return res.status(400).send({
      status: 'error 400',
      message: 'an error occur, incorrect user',
    });
  } if (!req.body.meetup) {
    return res.status(400).send({
      status: '400',
      message: 'an error occur, please check and try again...',
    });
  } if (!req.body.title) {
    return res.status(400).send({
      status: '400',
      message: 'an error occur, please check the title and try again...',
    });
  } if (!req.body.body) {
    return res.status(400).send({
      status: '400',
      message: 'an error occur, please check the question body and try again...',
    });
  } if (!req.body.votes) {
    return res.status(404).send({
      status: '400',
      message: 'an error occur, please check and try again...',
    });
  }
  const CreateAQuestionRecord = {
    id: meetupdb.default.questions.length + 1,
    createdOn: req.body.createdOn,
    createdBy: req.body.createdBy,
    meetup: req.body.meetup,
    title: req.body.title,
    body: req.body.body,
    votes: req.body.votes,
  };
  meetupdb.default.questions.push(CreateAQuestionRecord);

  return res.status(200).send({
    status: 'success 200',
    message: 'successfully added question record',
    meetupdb,
  });
});


// upvote or downvote a question
app.get('/api/v1/upvoteordownvote', (req, res) => {
  const title = meetupdb.meetuppost[1].topic;
  const { body } = meetupdb.meetuppost[1].body;

  let totalVotes = 0;
  const upvote = 1;
  const downvote = -1;
  function votes(n) {
    if (n === 1) {
      totalVotes += upvote;
    } else {
      totalVotes += downvote;
    }
  }
  votes(1);
  votes(1);
  votes(1);
  votes(-1);

  res.status(200).send({
    status: 200,
    message: 'meetup database retrieved successfully',
    title,
    body,
    totalVotes,
  });
});


// Rsvp for a meetup
app.post('/api/v1/rsvp-meetup', (req, res) => {
  if (!req.body.status) {
    return res.status(400).send({
      status: '400',
      message: 'an error occur, it either be yes, no or maybe',
    });
  }

  const Rsvp = {
    id: meetupdb.default.meetuppost[0].id,
    topic: meetupdb.meetuppost[0].topic,
    status: req.body.status,
    user: req.body.user,

  };
  meetupdb.default.rsvp.push(Rsvp);
  const { rsvp } = meetupdb.rsvp;

  return res.status(200).send({
    status: '200',
    message: 'successfully added',
    rsvp,
  });
});

module.exports = app;
