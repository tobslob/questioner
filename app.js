import http from 'http';
import express from 'express';
import morgan from 'morgan';
import coreRouter from './modules/core';
import meetupRouter from './modules/router/meetup';
import questionRouter from './modules/router/question';
import rsvpRouter from './modules/router/rsvp';


const app = express();

app.use(morgan('combined'));
app.use(coreRouter);
app.use('/api/v1/meetup', meetupRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/rsvp', rsvpRouter);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`listening to server on port ${port}...`);
});

module.exports = app;
