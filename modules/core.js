import express from 'express';
import path from 'path';

const core = express();


core.use(express.static(path.join(__dirname, '../UI')));

core.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'index.html'));
});

core.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'sign-in.html'));
});

core.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'sign-up.html'));
});

core.get('/meetup-post', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'meetup-post.html'));
});

core.get('/meetuppostpage', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'meetuppostpage.html'));
});

core.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'admin.html'));
});

core.get('/userprofile', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'userprofile.html'));
});

core.get('/password-reset', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'password-reset.html'));
});


module.exports = core;
