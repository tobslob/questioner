import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req, res, next) => {
    // try {
    //     const token = req.headers.authorization.split(' ')[1];
    //     const decoded = jwt.verify(token, process.env.JWT_KEY);
    //     req.userData = decoded;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({
    //         message: 'Auth failed'
    //     });
    // }

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();

};