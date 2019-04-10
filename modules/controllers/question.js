/* eslint-disable no-console */
import Joi from 'joi';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './config/db';


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
 * Create A questionq
 * @param {object} req 
 * @param {object} res
 * @returns {object} question object 
 */
exports.post_question = async (req, res) => {
    const { error } = validateQuest(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    const text = `INSERT INTO 
    questions(id, title, meetupId, votes, body, createdOn) 
    VALUES($1, $2, $3, $4, $5, $6) 
    returning *`;
    const values = [
        uuidv4(),
        req.body.title,
        req.params.meetupId,
        0,
        req.body.body,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
            message: 'question created successfully',
            questions: rows[0]
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
              
};


/**
   * Get All question
   * @param {object} req 
   * @param {object} res 
   * @returns {object} questions array
   */
exports.get_all_questions = async (req, res) =>{
    const findAllQuery = 'SELECT * FROM questions';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).json({
            message: 'questions retrieve successfully',
            questions: { rows, rowCount }
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};


/**
   * Get A question
   * @param {object} req 
   * @param {object} res
   * @returns {object} queston object
   */
exports.get_question = async (req, res) => {
    const text = 'SELECT * FROM questions WHERE id = $1';
    try {
        const { rows } = await db.query(text, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).json({'message': 'question not found'});
        }
        return res.status(200).json({
            message: `question with id:${rows[0].id} retrieve successfully`,
            meetups: rows[0]
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};


/**
   * UpVote A question
   * @param {object} req 
   * @param {object} res
   * @returns {object} queston object
   */
exports.upvote_question = async (req, res) => {
    const text = 'UPDATE questions SET votes = votes + 1 WHERE id = $1 returning meetupId, title, body, votes';
    const questionId = req.params.questionId;
    try {
        const { rows } = await db.query(text, [questionId]);
        if (!rows[0]) {
            return res.status(404).json({
                status: 404,
                error: `No Question Record Found with id: ${questionId}`,
            });
        }
        return res.status(201).json({
            message: 'vote successful',
            votes: rows
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
};


/**
   * DownVote A question
   * @param {object} req 
   * @param {object} res
   * @returns {object} queston object
   */
exports.downvote_question = async (req, res) => {
    const text = 'UPDATE questions SET votes = votes - 1 WHERE id = $1 returning meetupId, title, body, votes';
    const questionId = req.params.questionId;
    try {
        const { rows } = await db.query(text, [questionId]);
        if (!rows[0]) {
            return res.status(404).json({
                status: 404,
                error: `No Question Record Found with id: ${questionId}`,
            });
        }
        return res.status(201).json({
            message: 'vote successful',
            votes: rows
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
};
