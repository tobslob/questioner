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

exports.upvote_question = async (req, res) => {
    const text = `INSERT INTO 
    votes(id, questionId, userId, no_votes, createdOn) 
    VALUES($1, $2, $3, $4, $5) 
    returning *`;
    const values = [
        uuidv4(),
        req.params.questionId,
        req.params.userId,
        0,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
            message: 'vote successful',
            votes: rows[0],
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/v1/upvote/' + rows[0].id 
            }
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
};


exports.downvote_question = async (req, res) => {


    // the logics here looks a bit confusing 
    // the below will inset a non existing row
    const text = `INSERT INTO 
    votes(id, questionId, userId, no_votes, createdOn) 
    VALUES($1, $2, $3, $4, $5) 
    returning *`;
    //total--; you don't have any feld or var for total
    // while the below is meant to update i, so something is wrong here 
    // please show me what you have for the client or  web 
    // i think i have break the UI
    // the UI is not working as it should, i will fix that.
    // SHoarry to cut you

    // I believe you want to upvote an existing question. So parse the id os suct question 
    // via request req.params.questionId, then use as where clause for your UPDATE Query on updateing
    // However, if the approach is to store user detail then you only need to insert and dont need  the update query below
    // Hence you can either get vote count from querying total row count. some functions like count() will work in 
    // most sql. Otherwise you can have another table that store counts only 
    // do your research on them.
    // Fix your UI and let me know when you have 
    //Alright I will fix it, and implement the statement.
    //I will let you know, Thank you a lot!

    const votes =`UPDATE votes
    SET no_votes = '+total+'
      returning *`;
    const values = [
        uuidv4(),
        req.params.questionId,
        req.params.userId,
        votes,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
            message: 'vote successfully',
            votes: rows[0],
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/v1/downvote/' + rows[0].id 
            }
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
};
