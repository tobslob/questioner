/* app.js */
const bodyParser = require('body-parser');
const express = require('express');
const meetupDb = require('./db/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
