/* eslint-disable no-console */
import Joi from 'joi';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './config/db';

/**
 *Validator params
 * @param {} post
 */
const validatePost = (rsvp) => {
    const schema = Joi.object().keys({
        response: Joi.string().trim().insensitive().valid('yes', 'no', 'maybe')
    });
    return Joi.validate(rsvp, schema);
};

/**
   * POST rsvp
   * @param {object} req 
   * @param {object} res 
   * @returns {object} rsvp
   */
exports.post_rsvp = async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });

    const text = `INSERT INTO
    rsvps(id, meetupId, userId, response, date)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const values = [
        uuidv4(),
        req.params.meetupId,
        req.params.userId,
        req.body.response,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
            message: 'rsvp registered successfully',
            rsvp: rows[0]
        });
    } catch (error) {
        return res.status(400).json({
            message: console.log(error)
        });
    }
};

/**
   * Get All RSVP
   * @param {object} req 
   * @param {object} res 
   * @returns {object} RSVP Object
   */
exports.get_all_rsvp = async (req, res) => {
    const findAllQuery = 'SELECT * FROM rsvps';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).json({
            message: 'rsvp retrieve successfully',
            rsvps: { rows, rowCount }
        });
    } catch(error) {
        return res.status(400).send(error);
    }  
};


/**
   * Get A rsvp
   * @param {object} req 
   * @param {object} res 
   */
exports.get_rsvp = async (req, res) => {
    const findOneQuery = 'SELECT * FROM rsvps where id=$1';

    try {
        const { rows } = await db.query(findOneQuery, [req.params.id]);
        if (!rows[0]) {
            res.status(404).send({message: 'Rsvp not found'});
        }
        return res.status(200).json({
            message: 'rsvp retrieve successfully',
            rsvp: rows
        });
    } catch(error) {
        return res.status(400).send(error);
    }   
};

/**
   * DELETE A RSVP
   * @param {object} req 
   * @param {object} res 
   * @returns {object} RSVP
   */
exports.delete_rsvp = async (req, res) => {
    const deleteQuery = 'DELETE FROM rsvps WHERE id=$1 returning *';
    try {
        const { rows } = await db.query(deleteQuery, [req.params.id]);
        if(!rows[0]) {
            return res.status(404).send({'message': 'rsvp not found'});
        }
        return res.status(200).send({ 'message': 'deleted' });
    } catch(error) {
        return res.status(400).send(error);
    }
};
