import jwt from 'jsonwebtoken';
import config from '../../config';

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.secret);
        req.userData = decoded;
    } catch(error) {
        return res.status(401).json({
            message:'Auth failed'
        });
    }
    next();
};