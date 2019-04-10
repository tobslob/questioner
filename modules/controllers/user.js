/* eslint-disable no-console */
import Joi from 'joi';
import Helper from './config/Helper';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './config/db';
import dotenv from 'dotenv';

dotenv.config();


/**
 *Validator params
 *@param {object} user
 * @param {object} post validator
 */
const validateUser = (user) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        otherName: Joi.string().trim().required(),
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(8).max(20).trim().required(),
        phoneNumber: Joi.string().trim().required(),
        userName: Joi.string().trim().required(),
        isAdmin: Joi.string().trim()
    });
    return Joi.validate(user, schema);
};

/**
 * Create A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.post_user = async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    const hashPassword = Helper.hashPassword(req.body.password);
    
    const text = `INSERT INTO 
    users(id, firstName, lastName, otherName, email, phoneNumber, userName, isAdmin, password, createdOn) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    returning *`;
    const values = [
        uuidv4(),
        req.body.firstName,
        req.body.lastName,
        req.body.otherName,
        req.body.email,
        req.body.phoneNumber,
        req.body.userName,
        req.body.isAdmin,
        hashPassword,
        moment(new Date())
    ];
    try {
        const { rows } = await db.query(text, values);
        const token = Helper.generateToken(rows[0].id);
        return res.status(201).send({
            message: 'user created successfully',
            users: rows[0],
            token: token
        });
    } catch (err) {
        if (error.routine === '_bt_check_unique') {
            return res.status(400).json({
                message: 'Email already exist'
            });
        }
        return res.status(400).json({
            message: 'an error occur'
        });
    }  
};

/**
 * Login A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.login_router = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'invalid value'
        });
    }
    if (!Helper.isValidEmail(req.body.email)) {
        return res.status(400).json({
            message: 'invalid email'
        });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
        const { rows } = await db.query(text, [req.body.email]);
        if (!rows[0]) {
            return res.status(401).json({ 'message': 'Authentication failed' });
        }

        if (!Helper.comparePassword(rows[0].password, req.body.password)) {
            return res.status(401).json({ 'message': 'Authentication failed' });
        }
        const token = Helper.generateToken(rows[0].id);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(400).send(console.error(error));
    }
};

/**
 * GET all user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.get_users = async (req, res) => {
    const findAllQuery = 'SELECT * FROM users';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).json({
            message: 'users retrieve successfully',
            users: { rows, rowCount }
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};

/**
 * GET A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.get_user = async (req, res) => {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
        const { rows } = await db.query(text, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).json({message: 'user not found'});
        }
        return res.status(200).json({
            message: `users with id:${rows[0].id} retrieve successfully`,
            user: rows[0]
        });
    } catch(error) {
        return res.status(400).send(error);
    }
};

/**
 * PATCH A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.patch_user = async (req, res) => {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery =`UPDATE users
      SET firstName=$1, lastName=$2, otherName=$3, phoneNumber=$4, password=$5
      WHERE id=$6 returning *`;
    
    const hashPassword = Helper.hashPassword(req.body.password);
    try {
        const { rows } = await db.query(findOneQuery, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).json({ 'message': 'user not found' });
        }
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.otherName,
            req.body.phoneNumber,
            hashPassword,
            req.params.id
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json(response.rows[0]);
    } catch (err) {
        return res.status(400).send({
            error: console.log(err)
        });
    }
        
 
};

/**
 * DELETE A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.delete_user = async (req, res) => {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
        const { rows } = await db.query(deleteQuery, [req.params.id]);
        if(!rows[0]) {
            return res.status(404).send({'message': 'useer not found'});
        }
        return res.status(200).send({ 'message': 'deleted' });
    } catch(error) {
        return res.status(400).send(error);
    }
};
