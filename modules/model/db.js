/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.TEST
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * create Database Tables
 */
const createTables = () => {
    const meetupTable = `CREATE TABLE IF NOT EXISTS
        meetups(
            id UUID PRIMARY KEY,
            topic VARCHAR(128) NOT NULL,
            location VARCHAR(128) NOT NULL,
            body TEXT NOT NULL,
            happeningOn TIMESTAMPTZ NOT NULL,
            Tags TEXT[] NOT NULL,
            meetupImage bytea,
            createdOn TIMESTAMPTZ DEFAULT Now()
        )`;
    pool.query(meetupTable)
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const questionTable = `CREATE TABLE IF NOT EXISTS
        questions(
            id UUID PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            meetupId UUID,
            votes INT,
            body TEXT NOT NULL,
            createdOn TIMESTAMPTZ
        )`;
    pool.query(questionTable)
        .catch((err) => {
            console.log(err);
            pool.end();
        });
     
    const rsvpTable = `CREATE TABLE IF NOT EXISTS 
    rsvps(
        id UUID PRIMARY KEY,
        meetupId UUID UNIQUE,
        userId UUID,
        response VARCHAR(128) NOT NULL,
        date TIMESTAMPTZ DEFAULT Now()
        )`;
    pool.query(rsvpTable)
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const userTable = `CREATE TABLE IF NOT EXISTS 
        users(
            id UUID PRIMARY KEY,
            userImage bytea,
            firstName VARCHAR(128) NOT NULL,
            lastName VARCHAR(128) NOT NULL,
            otherName VARCHAR(128) NOT NULL,
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL,
            userName VARCHAR(128) UNIQUE NOT NULL,
            phoneNumber VARCHAR(128) NOT NULL,
            isAdmin VARCHAR(128) NOT NULL,
            createdOn TIMESTAMPTZ DEFAULT Now()
        )`;
    pool.query(userTable)
        .catch((err) => {
            console.log(err);
            pool.end();
        });
    const alterQuestion = `ALTER TABLE questions
        ADD CONSTRAINT fk_questions_meetups FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE`;
    pool.query(alterQuestion)
        .catch((err) => {
            console.log(err);
            pool.end();
        });
        
    const alterRsvp = `ALTER TABLE rsvps
        ADD CONSTRAINT fk_rsvps_meetups FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE`;
    pool.query(alterRsvp)
        .catch((err) => {
            console.log(err);
            pool.end();
        });
    
    const alterRsvp1 = `ALTER TABLE rsvps
        ADD CONSTRAINT fk_rsvps_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE`;
    pool.query(alterRsvp1)
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables
};

require('make-runnable');