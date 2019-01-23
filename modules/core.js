const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, '../UI')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'sign-in.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'sign-up.html'));
});

app.get('/meetup-post', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'meetup-post.html'));
});

app.get('/meetuppostpage', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'meetuppostpage.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'admin.html'));
});

app.get('/userprofile', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'userprofile.html'));
});

app.get('/password-reset', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI', 'password-reset.html'));
});

app.listen(3000);
