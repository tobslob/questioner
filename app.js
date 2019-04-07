/* eslint-disable no-console */
import 'idempotent-babel-polyfill';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import coreRouter from './modules/router/core';
import meetupRouter from './modules/router/meetup';
import questionRouter from './modules/router/question';
import rsvpRouter from './modules/router/rsvp';
import userRouter from './modules/router/user';
import bodyparser from 'body-parser';

const app = express();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) =>{ 
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if( req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({ message: 'success' });
    }
    next();
});

// routes to handle CRUD request
app.use(coreRouter);
app.use('/api/v1/meetup', meetupRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/rsvps', rsvpRouter);
app.use('/api/v1/user', userRouter);

// handling 404 route request
app.use((req, res) =>{
    return res.status(400).json({
        error: {
            message: 'NO SUCH ROUTE, MIGHT BE AVAILABLE IN FUTURE'
        }
    });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`listening to server on 127.0.0.1:${port}`);
});


module.exports = app;
