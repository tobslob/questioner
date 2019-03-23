/* eslint-disable no-console */
import Joi from 'joi';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './db';

const validatePost = (post) => {
    const schema = Joi.object().keys({
        location: Joi.string().trim().required(),
        topic: Joi.string().trim().required(),
        body: Joi.string().trim().required(),
        happeningOn: Joi.date().required(),
        Tags: Joi.array().items(Joi.string().trim()).required(),
        meetupImage: Joi.string()
    });
    return Joi.validate(post, schema);
};


/**
 * Create A Reflection
 * @param {object} req 
 * @param {object} res
 * @returns {object} reflection object 
 */
exports.post_meetup = async (req, res) => {
    const {
        error
    } = validatePost(req.body);
    if (error) return res.status(422).json({
        message: error.details[0].message
    });

    if (!req.file) return res.status(422).json('Please upload a file');
    const text = `INSERT INTO 
    meetups(id, topic, location, body, happeningOn, Tags, meetupImage, createdOn) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
    returning *`;
    const values = [
        uuidv4(),
        req.body.topic,
        req.body.location,
        req.body.body,
        req.body.happeningOn,
        req.body.Tags,
        req.file.path,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
            message: 'meetup created successfully',
            meetups: rows[0],
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/v1/meetup/' + rows[0].id
            }
        });
    } catch (err) {
        return res.status(400).json({
            error: console.error(err)});
    }
};


/**
   * Get All meetup
   * @param {object} req 
   * @param {object} res 
   * @returns {object} meetups array
   */
exports.get_all_meetup = async (req, res) => {
    const findAllQuery = 'SELECT * FROM meetups';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).json({
            message: 'meetup retrieve successfully',
            meetups: { rows, rowCount }
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};


/**
   * Get A meetup
   * @param {object} req 
   * @param {object} res
   * @returns {object} meetup object
   */
exports.get_meetup = async (req, res) => {
    const text = 'SELECT * FROM meetups WHERE id = $1';
    try {
        const { rows } = await db.query(text, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).json({'message': 'meetup not found'});
        }
        return res.status(200).json({
            message: `meetup with id:${rows[0].id} retrieve successfully`,
            meetups: rows[0]
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};


/**
   * Update A meetup
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated meetup
   */
exports.patch_meetup = async (req, res) => {
    const findOneQuery = 'SELECT * FROM meetups WHERE id=$1';
    const updateOneQuery =`UPDATE meetups
      SET topic=$1, location=$2, body=$3, happeningOn=$4, Tags=$5, meetupImage=$6, createdOn=$7
      WHERE id=$8 returning *`;
    try {
        const { rows } = await db.query(findOneQuery, [req.params.id]);
        if(!rows[0]) {
            return res.status(404).json({'message': 'meetup not found'});
        }
        const values = [
            req.body.topic,
            req.body.location,
            req.body.body,
            req.body.happeningOn,
            req.body.Tags,
            req.file.path,
            moment(new Date()),
            req.params.id
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json(response.rows[0]);
    } catch(err) {
        return res.status(400).send(err);
    }
};


/**
   * Delete A meetup
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
exports.delete_meetup = async (req, res) => {
    const deleteQuery = 'DELETE FROM meetups WHERE id=$1 returning *';
    try {
        const { rows } = await db.query(deleteQuery, [req.params.id]);
        if(!rows[0]) {
            return res.status(404).send({'message': 'meetup not found'});
        }
        return res.status(200).send({ 'message': 'deleted' });
    } catch(error) {
        return res.status(400).send(error);
    }
};