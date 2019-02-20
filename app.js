import http from 'http';
import express from 'express';
import morgan from 'morgan';
import coreRouter from './modules/core';
import meetupRouter from './modules/router/meetup';
import questionRouter from './modules/router/question';
import rsvpRouter from './modules/router/rsvp';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://tobslob:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-tubzx.mongodb.net:27017,cluster0-shard-00-01-tubzx.mongodb.net:27017,cluster0-shard-00-02-tubzx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useMongoClient: true
});
app.use(morgan('dev'));
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
app.use('/api/v1/rsvp', rsvpRouter);


app.use((req, res) =>{
    return res.status(404).json({
        error: {
            message: 'BAD REQUEST'
        }
    });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`listening to server on 127.0.0.1:${port}`);
});

module.exports = app;
