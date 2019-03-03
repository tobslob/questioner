import http from 'http';
import express from 'express';
import morgan from 'morgan';
import coreRouter from './modules/core';
import meetupRouter from './modules/router/meetup';
import questionRouter from './modules/router/question';
import rsvpRouter from './modules/router/rsvp';
import userRouter from './modules/router/user';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';


const app = express();
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const DB_URI = 'mongodb://tobslob:Kazeem27$@cluster0-shard-00-00-tubzx.mongodb.net:27017,cluster0-shard-00-01-tubzx.mongodb.net:27017,cluster0-shard-00-02-tubzx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

const connect = () => {
    return new Promise((resolve, reject) => {
        if(process.env.NODE_ENV === 'test') {
            mockgoose.prepareStorage()
                .then(() => {
                    mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true})
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                });
        } else {
            mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true})
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                });
        }
    });
};

const close = () => {
    return mongoose.disconnect();
};

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
app.use('/api/v1/rsvp', rsvpRouter);
app.use('/api/v1/user', userRouter);


app.use((req, res) =>{
    return res.status(400).json({
        error: {
            message: 'NO SUCH ROUTE, MIGHT BE AVAILABLE IN FUTURE'
        }
    });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

connect().then(
    server.listen(port, () => {
        /* eslint-disable no-console */
        console.log(`listening to server on 127.0.0.1:${port}`);
    })
);

module.exports = {app, connect, close};
