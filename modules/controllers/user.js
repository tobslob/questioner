/* eslint-disable no-console */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './db';
import dotenv from 'dotenv';

dotenv.config();


/**
 *Validator params
 * @param {*} post validator
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
        isAdmin: Joi.string().trim(),
        userImage: Joi.any().required(),
        createdOn: Joi.date().required()
    });
    return Joi.validate(user, schema);
};

/**
 * Create A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.post_user = (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(422).json({ message: error.details[0].message });
    if (!req.file) return res.send('Please upload a file');
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'retype password',
                error: err
            });
        } else {
            const text = `INSERT INTO 
    users(id, firstName, lastName, otherName, email, phoneNumber, userName, isAdmin, password, userImage, createdOn) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
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
                hash,
                req.file.path,
                moment(new Date())
            ];
            try {
                const { rows } = await db.query(text, values);
                const token = jwt.sign({
                    email: rows[0].email,
                    userId: rows[0].id
                }, process.env.SECRET,
                {
                    expiresIn: '24h'
                });
                return res.status(201).json({
                    message: 'user created successfully',
                    users: rows[0],
                    token: token,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/v1/user/' + rows[0].id
                    }
                });
            } catch (err) {
                return res.status(400).json({
                    message: 'an error occur',
                    error: console.error(err)
                });
            }
        }
    });
    return res;
};

/**
 * Login A user
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */
exports.login_router = async (req, res) => {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
        const { rows } = await db.query(text, [req.body.email]);
        if (!rows[0]) {
            return res.status(401).json({ 'message': 'Authentication failed1' });
        }
        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication failed2'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: rows[0].email,
                    userId: rows[0].id
                }, process.env.SECRET,
                {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    message: 'Authentication successful',
                    token: token
                });
            }
        });
    } catch (error) {
        return res.status(401).send(console.error(error));
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
            return res.status(404).json({'message': 'user not found'});
        }
        return res.status(200).json({
            message: `users with id:${rows[0].id} retrieve successfully`,
            meetups: rows[0]
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
    if (!req.file) return res.send('Please upload a file');
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery =`UPDATE users
      SET firstName=$1, lastName=$2, otherName=$3, phoneNumber=$4, password=$5, userImage=$6
      WHERE id=$7 returning *`;
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'retype password',
                error: err
            });
        } else {
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
                    hash,
                    req.file.path,
                    req.params.id
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).json(response.rows[0]);
            } catch (err) {
                return res.status(400).send({
                    error: console.log(err)
                });
            }
        }
    });
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
