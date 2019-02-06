import express from 'express';
import bodyparser from 'body-parser';
import Joi from 'joi';
import meetupdb from '../db/meetupdb';

const question = express();

question.use(bodyparser.urlencoded({ extended: false }));
question.use(bodyparser.json());

/**
 * @param {} quest
 * Validate question function
 */
const validateQuest = (quest) => {
    const schema = Joi.object().keys({
        title: Joi.string().trim().required(),
        body: Joi.string().trim().required(),
    });
    return Joi.validate(quest, schema);
};


/**
 * users api to create question/comment
 */
question.post('/v1/create-question', (req, res) => {
    const { error } = validateQuest(req.body);

    const id = meetupdb.questions.length + 1;
    const createdOn = Date();
    const createdBy = 1002;
    const votes = 0;
    if (error) return res.status(422).json({ message: error.details[0].message });
    const quest = {
        id,
        createdOn,
        createdBy,
        votes,
        title: req.body.title,
        body: req.body.body,
    };
    return res.status(200).send(quest);
});


/**
 * upvote question api
 */
question.get('/v1/upvote-question/:id', (req, res) => {
    // eslint-disable-next-line radix
    const requestId = parseInt(req.params.id);
    const getQuestion = meetupdb.questions;

    const specQuestion = getQuestion.find(specific => specific.id === requestId);

    // eslint-disable-next-line no-plusplus
    const upVote = () => specQuestion.votes++;

    if (!specQuestion) return res.status(404).json({ message: 'Invalid' });
    upVote();
    return res.status(200).json({ message: 'success' });
});


/**
 * downvote question api
 */
question.get('/v1/downvote-question/:id', (req, res) => {
    // eslint-disable-next-line radix
    const requestId = parseInt(req.params.id);
    const getQuestion = meetupdb.questions;

    const specQuestion = getQuestion.find(specific => specific.id === requestId);

    // eslint-disable-next-line no-plusplus
    const downVote = () => specQuestion.votes--;

    if (!specQuestion) return res.status(404).json({ message: 'Invalid' });
    downVote();
    return res.status(200).json({ message: 'success' });
});


module.exports = question;
