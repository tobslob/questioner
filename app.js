import core from './modules/core';

const express = require('express');

const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));

app.use(core);

module.exports = app;
