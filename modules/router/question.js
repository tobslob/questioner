import express from 'express';
import Joi from 'joi';
import Question from '../models/question';
import mongoose from 'mongoose';

const router = express.Router();

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
router.post('/', (req, res) => {
    const { error } = validateQuest(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    const questions = new Question({
        _id: new mongoose.Types.ObjectId(), 
        title: req.body.title,
        votes: 0,
        body: req.body.body,
    });
    questions
        .save()
        .then((question) => {
            res.status(200).json({
                message: 'Question successfully posted',
                createdQuestion: {
                    _id: question._id,
                    title: question.title,
                    votes: question.votes,
                    body: question.body,
                    createdOn: question.createdOn
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/question/' + question._id
                }
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            res.status(422).json(err);
        });
});

/**
 * GET question api
 */
router.get('/', (req, res) =>{
    Question.find()
        .select('_id title votes createdOn body')
        .exec()
        .then((results) =>{
            const response = {
                count: results.length,
                questions: results.map(result => {
                    return{
                        _id: result._id,
                        title: result.title,
                        votes: result.votes,
                        createdOn: result.createdOn,
                        body: result.body,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/v1/question/' + result._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch((err) =>{
            res.status(500).json(err);
        });
});

/**
 * Get a single question
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Question.findById(id)
        .select('_id title body votes createdOn')
        .exec()
        .then((result) =>{
            res.status(200).json({
                message: 'successfully retrieved',
                question: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/question/'
                }
            });
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

/**
 * upvote question api
 */
router.patch('/:questionId/upvote', (req, res) => {
    const id = req.params.questionId;
    Question.updateOne({_id: id}, {$inc: { votes: 1}})
        .exec()
        .then(() =>{
            res.status(200).json({
                message: 'upvote successful',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/question/' + id
                }
            });
        })
        .catch((err) => res.status(500).json(err));
});


/**
 * downvote question api
 */
router.patch('/:questionId/downvote', (req, res) => {
    const id = req.params.questionId;
    Question.updateOne({_id: id}, {$inc: { votes: -1}})
        .exec()
        .then(() =>{
            res.status(200).json({
                message: 'downvote successful',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/question/' + id
                }
            });
        })
        .catch((err) => res.status(500).json(err));
});


module.exports = router;
